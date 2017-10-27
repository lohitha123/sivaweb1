import { Component, OnInit, OnDestroy, Input, ViewChild, Output } from '@angular/core';
import { SelectItem, Message } from '../components/common/api';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { POUCostVarianceService } from './pou_cost_variance-service.service'
import { VM_POU_COSTVARIANCE_BY_SPECIALTY } from '../../app/Entities/VM_POU_COSTVARIANCE_BY_SPECIALTY';
import { VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE } from '../../app/Entities/VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE';
import { VM_POU_COSTVARIANCE_BY_SURGEON } from '../../app/Entities/VM_POU_COSTVARIANCE_BY_SURGEON';
import { VM_POU_COSTVARIANCE_SURGEON_HDR_DATA } from '../../app/Entities/VM_POU_COSTVARIANCE_SURGEON_HDR_DATA';
import { VM_POU_COSTVARIANCE_ITEMGROUPS } from '../../app/Entities/VM_POU_COSTVARIANCE_ITEMGROUPS';
import { VM_POU_COSTVARIANCE_ITEMGROUP_HDR_DETAILS } from '../../app/Entities/VM_POU_COSTVARIANCE_ITEMGROUP_HDR_DETAILS';
import { Router } from '@angular/router';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { DataTable } from '../components/datatable/datatable';
import { TokenEntry_Enum, StatusType, EnumApps, BusinessType, YesNo_Enum, MailPriority } from '../Shared/AtParEnums';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { Tab } from '../../app/components/tabcomponent/tab';
import { saveAs } from 'file-saver';
import { MinusSignToParens } from '../components/custompipes/minus-sign-to-parens.pipe';

declare var module: {
    id: string;
}

@Component({

    templateUrl: 'pou_cost_variance_report.component.html',
    providers: [AtParConstants, AtParCommonService, POUCostVarianceService]
})

export class CostVarianceComponent {

    /*Varaiable declaration*/
    @ViewChild(DataTable) dataTableComponent: DataTable;
    lstSltRnge: any = [];
    lstSltHQM: any = [];
    lstVarianceType: any = [];
    growlMessage: Message[] = [];
    selectedVarianceType: string;
    selectedSltRnge: string = 'Y1';
    selectedSltRngeLbl: string = '';
    selectedSltHQM: string;
    SltVariancDiagRnge: string;
    recordsPerPageSize: number;
    deviceTokenEntry: string[] = [];
    lstCostVarianceBySplt: VM_POU_COSTVARIANCE_BY_SPECIALTY[] = [];
    lstCostVarianceByDiagnsis: VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE[] = [];
    lstCostVariaceByPhy: VM_POU_COSTVARIANCE_BY_SURGEON[] = [];
    lstCostVarianceSurHdrData: VM_POU_COSTVARIANCE_SURGEON_HDR_DATA[] = [];
    lstCostVarianceItemGroups: VM_POU_COSTVARIANCE_ITEMGROUPS[] = [];
    lstCostVarianceItemHdrDtls: VM_POU_COSTVARIANCE_ITEMGROUP_HDR_DETAILS[] = [];
    lstChartData: any;
    msgs: Message[] = [];
    pop: boolean = false;
    showGrid: boolean = false;
    lstLength: string = "";
    lstICDLength: string = "";
    lstPhyvarianceLength: string = "";
    ddltyear: string;
    strHalfyear: string;
    strQuarter: string;
    strMonth: string;
    tdExports: boolean = false;
    isMailDialog: boolean = false;
    toMailAddr: string = '';
    statusCode: number = -1;
    ipAddress: string;
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    isPostback: boolean = false;
    lblResultCount: number = 0;
    VariancebyICDTab: boolean = false;
    VariancebySpecialityTab: boolean = false;
    VariancebyPhyTab: boolean = false;
    activeTab: string;
    gvVarianceSpelty: boolean = false;
    gvVarianceICD: boolean = false;
    public DynamicDignsis = new VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE();
    SltVariancDiagHQM: string;
    VarnceSpecialityCode: string;
    VarnceSpecialityDescription: string;
    VarianceDiagCode: string;
    VarianceDiagDesc: string;
    SltVariancPhyHQM: string;
    VariancebyPhydyTab: boolean = false;
    SpendbyItemCateTab: boolean = false;
    lstAny: any[] = [];
    lstItemData: any[] = [];
    PhyIds: string = "";
    DynamicPhysloop: string = "";
    NoOfProcedures: number = 0;
    data: any;
    blnselectedVarianceType: boolean = false;
    ChartColor: string = "";
    SupplyDetailsTab: boolean = false;
    Fifthtabtble: boolean = false;
    DynamicShow: boolean = false;
    lstAny5th: any[] = [];
    tabs: any;
    SupplyDetlslngth: number = 0;
    lstYear: any[] = [];
    lblPhyvariance: string = ""; 
    lblPhyvarianceDesc: string = ""; 
    showHalfyrlbl: boolean = false;
    Hlfqtrmnthlbl: string = '';
    Hlfqtrmnthlbltxt: string = '';
    showSpendByItmTab: boolean = true;
    sumOfNoOfProceduers: number = 0;
    sumOfTotalSpend: number = 0;
    sumOfTotalVariance: number = 0;
    totalDiag_Proceduers: number = 0;
    totalDiag_Spend: number = 0;
    totalDiag_Variance: number = 0;
    totalDiag_AnnualSpend: number = 0;
    variancePercent: number = 0;
    diag_variancePercent: number = 0;
    /**
     * Constructor
     * @param leftBarAnimationservice
     * @param router
     * @param POUCostVarianceService
     * @param httpService
     * @param spinnerService
     * @param atParConstant
     * @param commonService
     */
    constructor(private leftBarAnimationservice: LeftBarAnimationService,
        private router: Router,
        private PouCstvarianceService: POUCostVarianceService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private commonService: AtParCommonService) {

    }



    async ngOnInit() {
        this.tdExports = false;
        this.VariancebyICDTab = false;
        this.VariancebySpecialityTab = true;
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        this.lstYear = [];
        this.lstYear.push({ label: "Select Year", value: "Select Year" });
        for (var year = 1940; year <= 2020; year++) {
            this.lstYear.push({
                label: '' + year + '',
                value: '' + year + ''
            });
        }
        this.selectedVarianceType = "Select Value";
        this.lstSltRnge.push({ label: 'Select Value', value: 'Y1' }, { label: 'Yearly', value: 'Y' }, { label: 'Half Yearly', value: 'HY' }, { label: 'Quartely', value: 'Q' }, { label: 'Monthly', value: 'M' });
        this.lstVarianceType.push({ label: 'Select Diagnosis', value: 'Select Value' }, { label: 'Out Patient', value: 'CPT' }, { label: 'In Patient', value: 'ICD' }, { label: 'Procedure', value: 'Procedure' });
        this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' });

    }

    /**
   redirecting to home when click on breadcrumbs
   */
    homeurl() {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    }

    async Yearsbind() {
        /**
       * To clear the all lists
       */
        this.lstCostVarianceBySplt = [];
        this.lstCostVarianceByDiagnsis = [];
        this.lstCostVariaceByPhy = [];

        this.gvVarianceSpelty = false;
        this.lstLength = "0";
        this.lstSltHQM = [];
        this.pop = false;
        this.tdExports = false;
        this.selectedSltHQM = "";
        this.SltVariancDiagHQM = "";
        this.SltVariancPhyHQM = "";
        this.gvVarianceICD = false;
        this.SupplyDetlslngth = 0;
        this.lstAny = [];
        try {

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
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    async ClearData() {
        this.lstCostVarianceBySplt = [];
        this.lstCostVarianceByDiagnsis = [];
        this.lstCostVariaceByPhy = [];
        this.SupplyDetlslngth = 0;
        this.lstAny = [];
        this.tdExports = false;
        this.gvVarianceSpelty = false;
        this.lstLength = "0";
    }
    async btn_GetVarianceBySplt() {
        this.lstCostVariaceByPhy = [];
        this.lstCostVarianceBySplt = [];
        this.lstCostVariaceByPhy = [];
        this.lstCostVarianceByDiagnsis = [];
        this.lstCostVarianceItemGroups = [];
        this.lstAny = [];
        this.lstCostVarianceItemHdrDtls = [];
        this.SupplyDetlslngth = 0;
        this.spinnerService.start();
        if (this.dataTableComponent != null) {
            this.dataTableComponent.reset();
        }
        this.growlMessage = [];
        this.pop = false;
        this.gvVarianceSpelty = false;
        this.tdExports = false;
        try {
            if (this.selectedSltRnge == "HY" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                this.growlMessage = [];
                this.spinnerService.stop();
                this.pop = false;
                this.tdExports = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Half Year" });
                return;
            }
            else if (this.selectedSltRnge == "Q" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Quarter" });
                this.spinnerService.stop();
                this.pop = false;
                this.tdExports = false;
                return;
            }
            else if (this.selectedSltRnge == "M" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Month' });
                this.spinnerService.stop();
                this.pop = false;
                return;
            }
            else if (this.selectedSltRnge == "Select Value" || this.selectedSltRnge == undefined || this.selectedSltRnge == "" || this.selectedSltRnge == "Y1") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Range" });
                this.spinnerService.stop();
                this.pop = false;
                return;
            }
            else if (this.ddltyear == undefined || this.ddltyear == "" || this.ddltyear == "Select Year") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Year" });
                this.spinnerService.stop();
                this.pop = false;
                return;
            } else if (this.selectedVarianceType == "" || this.selectedVarianceType == undefined || this.selectedVarianceType == "Select Value" || this.blnselectedVarianceType == true) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select the one of the option" });
                this.spinnerService.stop();
                this.pop = false;
                return;
            } else {
                this.strHalfyear = "0";
                this.strMonth = "0"
                this.strQuarter = "0";
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
                        this.Hlfqtrmnthlbltxt = "Quarter";
                        if (this.selectedSltHQM == "1") {
                            this.Hlfqtrmnthlbl = "Q1(Jan-March)";
                        }
                        else if (this.selectedSltHQM == "2") {
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
                        this.Hlfqtrmnthlbltxt = "Month";
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
                if (this.selectedVarianceType == "Procedure") {
                    this.VarianceDiagCode = "PROCEDURE_CODE";
                    this.VarianceDiagDesc = "PROCEDURE_DESCRIPTION";
                    this.lblPhyvariance = "Procedure Code";
                    this.lblPhyvarianceDesc = "Procedure Description";
                } else if (this.selectedVarianceType == "CPT") {
                    this.VarianceDiagCode = "CPT_CODE";
                    this.VarianceDiagDesc = "CPT_DESCR";
                    this.lblPhyvariance = "Out Patient Code";
                    this.lblPhyvarianceDesc = "Out Patient Description";
                } else {
                    this.VarianceDiagCode = "ICD_CODE";
                    this.VarianceDiagDesc = "ICD_DESCR";
                    this.lblPhyvariance = "In Patient Code";
                    this.lblPhyvarianceDesc = "In Patient Description";
                }

                await this.PouCstvarianceService.Getcostvarianceanalysisspecialitydata(this.VarianceDiagCode, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_SPECIALTY>;
                    //sessionStorage.setItem('_DS', JSON.stringify(data.DataList));

                    if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                        this.pop = false;
                        return;
                    }
                    if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                        this.pop = false;
                        return;
                    }
                    if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                        this.pop = false;
                        return;
                    }
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstCostVarianceBySplt = data.DataList;                            
                            if (this.lstCostVarianceBySplt != null && this.lstCostVarianceBySplt.length > 0) {
                                sessionStorage.setItem('SesCostVarianceSplty', JSON.stringify(data.DataList));
                                this.gvVarianceSpelty = true;
                                this.showGrid = true;
                                this.tdExports = true;
                                this.spinnerService.stop();
                                this.lstLength = this.lstCostVarianceBySplt.length + " Record(s) found";
                                this.activeTab = "Variance by Speciality";
                                this.sumOfNoOfProceduers = asEnumerable(this.lstCostVarianceBySplt).Sum(m => m.NO_OF_PROCEDURES);                                
                                this.sumOfTotalSpend = asEnumerable(this.lstCostVarianceBySplt).Sum(m => m.TOTAL_SPEND);                                
                                this.sumOfTotalVariance = asEnumerable(this.lstCostVarianceBySplt).Sum(m => m.TOTAL_VARIANCE);
                                this.variancePercent = (this.sumOfTotalVariance / this.sumOfTotalSpend) * 100;                                
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                this.pop = false;
                            }

                            if (this.lstCostVarianceBySplt.length <= 0) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                this.pop = false;
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.selectedSltRnge = "";
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.selectedSltRnge = "";
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.selectedSltRnge = "";
                            this.spinnerService.stop();
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

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Excel');
            //if (html != '' && html != null) {
            //    var a = document.createElement('a');
            //    var data_type = 'data:application/vnd.ms-excel';
            //    html = html.replace(/ /g, '%20');
            //    a.href = data_type + ', ' + html;
            //    a.download = 'POUCostVarianceAnalysis.xls';
            //    a.click();
            //}
            let blob = new Blob([html], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "POUCostVarianceAnalysis.xls");

        } catch (ex) {
            this.displayCatchException(ex);
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
                var newwindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                newwindow.document.write('<html><head><title>' + 'Point Of Use - Cost Variance Analysis Report' + '</title>');
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
            this.spinnerService.stop();
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
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Mail');
            let toAddr: string = '';
            this.msgs = [];

            if (html != '' && html != null) {
                await this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Cost Variance Analysis Report', JSON.stringify(html), this.toMailAddr, '', 'false', MailPriority.Normal.toString(), '')
                    .catch(this.httpService.handleError)
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

            this.spinnerService.stop();
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
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
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
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
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
                    + "<tr><td colspan=5 align=left><span class=c2><b> Cost Variance Analysis Report </b></span></td><td align=right valign=top>&nbsp;";

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
                    + "<tr><td colspan=3 align=left><span class=c2><b> Cost Variance Analysis Report </b></span></td><td align=right valign=top>&nbsp;";
            }

            if (this.activeTab == "Variance by Speciality") {
                let _DS: VM_POU_COSTVARIANCE_BY_SPECIALTY[] = [];
                _DS = await JSON.parse(sessionStorage.getItem('SesCostVarianceSplty')) as VM_POU_COSTVARIANCE_BY_SPECIALTY[];
                try {
                    htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                        + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                        + "<tr bgcolor=#d3d3d3>"
                        + "<td align=center width=20% nowrap><span class=c3><b>Specialty Code</b></span></td>"
                        + "<td align=center width=15% nowrap><span class=c3><b># Procedures</b></span></td>"
                        + "<td align=center width=15% nowrap><span class=c3><b>Total Spend</b></span></td>"
                        + "<td align=center width=10% nowrap><span class=c3><b>Extended Variance</b></span></td>"
                        + "<td align=center width=10% nowrap><span class=c3><b>%Variance</b></span></td>"
                        + "</tr>"
                        + "<tr bgcolor=#d3d3d3>"
                        + "<td align=center width=20% nowrap><span class=c3><b>Total:</b></span></td>"
                        + "<td align=center width=15% nowrap><span class=c3><b>" + this.sumOfNoOfProceduers.toLocaleString('en-US') + "</b></span></td>"
                        + "<td align=right width=15% nowrap><span class=c3><b>" +this.transform(this.sumOfTotalSpend.toLocaleString('en-US')) + "</b></span></td>"
                        + "<td align=right width=10% nowrap><span class=c3><b>" +this.transform(this.sumOfTotalVariance.toLocaleString('en-US')) + "</b></span></td>"
                        + "<td align=right width=10% nowrap><span class=c3><b>" + this.variancePercent.toFixed(1) + "%"  + "</b></span></td>"
                        + "</tr>";

                    await _DS.forEach(header => {
                        htmlBuilder += "<tr>"
                            + "<td align=left nowrap><span class=c3>" + header.SPECIALTY_CODE + "</span></td>"
                            + "<td align=center nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" +  this.transform(header.TOTAL_SPEND.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" +this.transform(header.TOTAL_VARIANCE.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + header.PERVARIANCE.toFixed(1) + "%" + "</span></td>"
                            + "</tr>";
                    });
                }
                catch (ex) {
                    htmlBuilder = '';
                    this.displayCatchException(ex);
                }
            }
            else if (this.activeTab == "Variance by ICD" || this.activeTab == "Variance by Procedure" || this.activeTab == "Variance by CPT") {
                try {
                    let _DS: VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE[] = [];
                    _DS = await JSON.parse(sessionStorage.getItem('SesCostVarianceICD')) as VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE[];

                    htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                        + "<div style='margin-bottom:20px; width:100%'>"
                        + "<table align=center width=100% style='BORDER-COLLAPSE:collapse; border:none;'>"
                        + "<tr>"
                        + "<td>Range:</td>"
                        + "<td style='font-weight:bold !important'>" + this.selectedSltRngeLbl + "</td>"
                        + "<td>Year:</td>"
                        + "<td style='font-weight:bold !important'>" + this.ddltyear + "</td>"
                        + "<td>Specialty:</td>"
                        + "<td style='font-weight:bold !important'>" + this.VarnceSpecialityDescription + "(" + this.VarnceSpecialityCode + ")" + "</td>";
                       
                    if (this.showHalfyrlbl) {
                        htmlBuilder += "<td>" + this.Hlfqtrmnthlbltxt + "</td>"
                            + "<td style='font-weight:bold !important'>" + this.Hlfqtrmnthlbl + "</td>";
                    }

                    htmlBuilder += "</tr>"
                        + "</table></div>"
                        + "</td></tr>";

                    htmlBuilder += "<tr><td colspan=2> "
                        //+ "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                        //+ "<tr bgcolor=#d3d3d3><td align=center width=10% nowrap><span class=c3><b>" + this.VarnceSpecialityCode + "</b></span></td>"
                        //+ "</tr></table><tr></tr><tr><td colspan=2><br/>"
                        + "<table align=center width=100% border=1 style=" + "" + "BORDER-COLLAPSE:collapse" + "" + ">"
                        + "<tr bgcolor=#d3d3d3>"
                        + "<td align=center width=10% nowrap><span class=c3><b>" + this.selectedVarianceType + " Code</b></span></td>"
                        + "<td align=center width=15% wrap><span class=c3><b>" + this.selectedVarianceType + " Description</b></span></td>"
                        + "<td align=center width=10% nowrap><span class=c3><b># Physicians</b></span></td>"
                        + "<td align=center width=10% nowrap><span class=c3><b># Procedures</b></span></td>"
                        + "<td align=center width=10% nowrap><span class=c3><b>Avg.Min</b></span></td>"
                        + "<td align=center width=10% nowrap><span class=c3><b>Avg.Max</b></span></td>"
                        + "<td align=center width=10% nowrap><span class=c3><b>Extended Variance</b></span></td>"
                        + "<td align=center width=10% nowrap><span class=c3><b>Total Spend</b></span></td>"
                        + "<td align=center width=15% nowrap><span class=c3><b>Total Spend Annualized</b></span></td>"
                        + "<td align=center width=15% nowrap><span class=c3><b>%Variance</b></span></td>"
                        + "</tr>"
                        + "<tr bgcolor=#d3d3d3>"
                        + "<td align=center width=10% nowrap><span class=c3><b>Total:</b></span></td>"
                        + "<td align=center width=15% wrap></td>"
                        + "<td align=center width=10% nowrap></td>"
                        + "<td align=center width=10% nowrap><span class=c3><b>" + this.totalDiag_Proceduers.toLocaleString('en-US') + "</b></span></td>"
                        + "<td align=center width=10% nowrap></td>"
                        + "<td align=center width=10% nowrap></td>"
                        + "<td align=right width=10% nowrap><span class=c3><b>" + this.transform(this.totalDiag_Variance.toLocaleString('en-US')) +"</b></span></td>"
                        + "<td align=right width=10% nowrap><span class=c3><b>" + this.transform(this.totalDiag_Spend.toLocaleString('en-US')) +"</b></span></td>"
                        + "<td align=right width=15% nowrap><span class=c3><b>" + this.transform(this.totalDiag_AnnualSpend.toLocaleString('en-US')) + "</b></span></td>"
                        + "<td align=right width=15% nowrap><span class=c3><b>" + this.diag_variancePercent.toFixed(1)+"%" + "</b></span></td>"
                        + "</tr>";

                    await _DS.forEach(header => {
                        htmlBuilder += "<tr>"
                            + "<td align=left nowrap><span class=c3>" + header.CODE + "</span></td>"
                            + "<td align=left wrap><span class=c3>" + header.DESCRIPTION + "</span></td>"
                            + "<td align=center nowrap><span class=c3>" + header.NO_OF_PHYSICIANS.toLocaleString('en-US') + "</span></td>"
                            + "<td align=center nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + this.transform(header.MIN_USAGE.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + this.transform( header.MAX_USAGE.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_VARIANCE.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_SPEND.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_ANNUAL_SPEND.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + header.PERVARIANCE.toFixed(1)+"%" + "</span></td>"
                            + "</tr>";
                    });
                }
                catch (ex) {
                    htmlBuilder = '';
                    this.displayCatchException(ex);
                }
            }
            else if (this.activeTab == "Physician Variance") {
                try {

                    let _DS: VM_POU_COSTVARIANCE_BY_SURGEON[] = [];
                    _DS = await JSON.parse(sessionStorage.getItem('_DSSurgeon')) as VM_POU_COSTVARIANCE_BY_SURGEON[];

                    htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                        + "<div style='margin-bottom:20px; width:100%'>"
                        + "<table align=center width=100% style='BORDER-COLLAPSE:collapse; margin-bottom:15px; border:none;'>"
                        + "<tr>"
                        + "<td>Range:</td>"
                        + "<td style='font-weight:bold !important'>" + this.selectedSltRngeLbl + "</td>"
                        + "<td>Year:</td>"
                        + "<td style='font-weight:bold !important'>" + this.ddltyear + "</td>"
                        + "<td>Specialty:</td>"
                        + "<td style='font-weight:bold !important'>" + this.VarnceSpecialityDescription + "(" + this.VarnceSpecialityCode + ")" + "</td>";
                    if (this.showHalfyrlbl) {
                        htmlBuilder += "<td>" + this.Hlfqtrmnthlbltxt + "</td>"
                            + "<td style='font-weight:bold !important'>" + this.Hlfqtrmnthlbl + "</td>";
                    }

                    htmlBuilder += "</tr>"
                        + "</table></div>"
                        + "</td></tr>";

                    htmlBuilder += "<tr><td colspan=2>"
                        + "<table style= 'border:1px solid black; border-collapse:collapse;' > <tr><td width='15%' style= 'font-size:12px;font-weight:bold' align= 'center'> No.of Physicians: </td>"
                        + "<td align='center' width='5%'  style='border:black 1px solid;font-size:12px'>" + this.DynamicDignsis.NO_OF_PHYSICIANS + "</td>"
                        + "<td width='15%' style='border:black 1px solid;font-size:12px;font-weight:bold' align='center'>No.of Procedures:</td>"
                        + "<td align='center' width='5%' style='border:black 1px solid;font-size:12px'>" + this.DynamicDignsis.NO_OF_PROCEDURES + "</td>"
                        //+ "<td style='border:black 1px solid'></td><td style='border:black 1px solid'></td><td style='border:black 1px solid'></td></tr><tr>"
                        //+ "<td style='border:black 1px solid;font-size:12px'></td><td style='border:black 1px solid;font-size:12px'></td>"
                        //+ "<td style='border:black 1px solid;font-size:12px'></td><td style='border:black 1px solid;font-size:12px'></td>"
                        + "<td width='5%' style='border:black 1px solid; font-size:12px; font-weight:bold' align='center'>Min Avg</td>"
                        + "<td width='5%' style='border:black 1px solid; font-size:12px; font-weight:bold' align='center'>Max Avg</td>"
                        + "<td width='5%' style='border:black 1px solid; font-size:12px; font-weight:bold' align='center'>Extended Variance</td></tr>"
                        + "<tr class='RepAltDataRecord'><td width='15%' style='border:black 1px solid;font-size:12px; font-weight:bold' align=center>"+this.lblPhyvariance+":</td>"
                        + "<td width='5%' align='left'  style='border:black 1px solid;font-size:12px'>" + this.DynamicDignsis.CODE + "</td>"
                        + "<td align=center style='border:black 1px;solid;font-size:12px'>" + this.lblPhyvarianceDesc + "</td>"
                        + "<td align=left width='5%' style='border:black 1px solid;font-size:12px'>" + this.DynamicDignsis.DESCRIPTION +"</td>"
                        + "<td align=right style='border:black 1px solid;font-size:12px'>" + this.transform(this.DynamicDignsis.MIN_USAGE.toLocaleString('en-US')) + ""
                        + "<td align=right style='border:black 1px solid;font-size:12px;'>" + this.transform( this.DynamicDignsis.MAX_USAGE.toLocaleString('en-US')) + "</td> "
                        + "<td align=right style='border:black 1px solid;font-size:12px;'>" + this.transform(this.DynamicDignsis.TOTAL_VARIANCE.toLocaleString('en-US')) + "</td></tr> "
                        + " </table> </td> </tr> <tr height=20 > </tr> </table> </td> </tr> <tr><td colspan=2 > "


                    htmlBuilder += "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                        + "<tr bgcolor=#d3d3d3>"
                        + "<td align=center width=15% nowrap><span class=c3><b>Physician</b></span></td>"
                        + "<td align=center width=10% wrap><span class=c3><b># Procedures</b></span></td>"
                        + "<td align=center width=15% nowrap><span class=c3><b>Min Procedure Cost</b></span></td>"
                        + "<td align=center width=15% nowrap><span class=c3><b>Max Procedure Cost</b></span></td>"
                        + "<td align=center width=15% nowrap><span class=c3><b>Average Procedure Cost</b></span></td>"
                        + "<td align=center width=15% nowrap><span class=c3><b>Variance From Min Procedure Cost</b></span></td>"
                        + "<td align=center width=15% nowrap><span class=c3><b>Extended Variance</b></span></td>"
                        + "</tr>";

                    await _DS.forEach(header => {
                        htmlBuilder += "<tr>"
                            + "<td align=left nowrap><span class=c3>" + header.PHYSICIAN_NAME + "</span></td>"
                            + "<td align=center nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + this.transform(header.MIN_PROC_COST.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + this.transform( header.MAX_PROC_COST.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + this.transform(header.AVG_PROC_COST.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + this.transform(header.MIN_PROC_VARIANCE.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + this.transform(header.EXTENDED_VARIANCE.toLocaleString('en-US')) + "</span></td>"
                            + "</tr>";
                    });

                }
                catch (ex) {
                    htmlBuilder = '';
                    this.displayCatchException(ex);
                }
            }
            else if (this.activeTab == "Spend by Item Category") {
                let _DS: VM_POU_COSTVARIANCE_BY_SPECIALTY[] = [];

                try {

                    let imgserverPath: string = '';

                    var chartImage = document.getElementById("SpndItemChart") as HTMLCanvasElement;
                    var image = chartImage.toDataURL("image/png");
                    image = image.replace(/^data:image\/(png|jpg);base64,/, "");
                    await this.commonService.saveImage(image, "Spend_by_Item_Category").
                        then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<any>;
                            this.growlMessage = [];
                            switch (data.StatType) {
                                case StatusType.Success: {

                                    break;
                                }
                                case StatusType.Warn: {

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
                    var chartName = 'Spend_by_Item_Category.png';

                    imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';

                    var ChartPath = this.httpService.BaseUrl + '/Uploaded/';

                    let ProductName = "Pref Card Performance Summary";

                    htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                        + "<div style='margin-bottom:20px; width:100%'>"
                        + "<table align=center width=100% style='BORDER-COLLAPSE:collapse; border:none;'>"
                        + "<tr>"
                        + "<td>Range:</td>"
                        + "<td style='font-weight:bold !important'>" + this.selectedSltRngeLbl + "</td>"
                        + "<td>Year:</td>"
                        + "<td style='font-weight:bold !important'>" + this.ddltyear + "</td>"
                        + "<td>Specialty:</td>"
                        + "<td style='font-weight:bold !important'>" + this.VarnceSpecialityDescription + "(" + this.VarnceSpecialityCode + ")" + "</td>";
                    if (this.showHalfyrlbl) {
                        htmlBuilder += "<td>" + this.Hlfqtrmnthlbltxt + "</td>"
                            + "<td style='font-weight:bold !important'>" + this.Hlfqtrmnthlbl + "</td>";
                    }

                    htmlBuilder += "</tr>"
                        + "</table></div>"
                        + "</td></tr>";

                    htmlBuilder += "<tr><td> "
                        + "<div><div><table style=" + "" + "BORDER-COLLAPSE:collapse; padding-top:15px;" + "" + " border=1>"
                        + "<tr>"
                        + "<td width=100% align=center colspan= '4' nowrap>"
                        + "<span class=c3><b>" + this.lblPhyvariance + ":" + this.DynamicDignsis.CODE +"</b>(" + this.DynamicDignsis.DESCRIPTION +")"+ "</span></td>"
                        + "</tr>"
                        + "<tr>"
                        + " <td width=20% align='center'><span class=c3><b>No.of Procedures:</b></span></td >"
                        + "<td width=80% align='center' colspan= '3' align=right><span class=c3> " + this.DynamicDignsis.NO_OF_PROCEDURES + "</span></td>"
                        + "</tr>"
                        + "<tr> "
                        + "<td rowspan='2' width=25% align=center><span class=c3><b> Cost Per Case </b></span></td >"
                        + "<td width=25% align=center><span class=c3><b> Avg Min </b></span></td >"
                        + "<td width=25% align=center><span class=c3><b> Avg Max </b></span></td >"
                        + "<td width=25% align=center><span class=c3><b> Total Spend </b></span></td >"
                        + "</tr>"
                        + "<tr>"
                        //+ " <td></td>"
                        + "<td align='right'><span class=c3>" + this.transform(this.DynamicDignsis.MIN_USAGE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align='right'><span class=c3>" + this.transform(this.DynamicDignsis.MAX_USAGE.toLocaleString('en-US')) + "</span></td> "
                        + "<td align='right'><span class=c3>" + this.transform(this.DynamicDignsis.TOTAL_ANNUAL_SPEND.toLocaleString('en-US')) + "</span></td></tr> "
                        + "</tr>"
                        + "<tr>"
                        + "<td width=25% align=center><span class=c3><b>  Item Group </b></span></td >"
                        + "<td width=25% align=center><span class=c3><b> Total Spend </b></span></td >"
                        + "<td width=25% align=center><span class=c3><b> Percent </b></span></td >"
                        + "<td width=25% align=center><span class=c3><b> Item Count </b></span></td > "
                        + "</tr>"
                    await this.lstCostVarianceItemHdrDtls.forEach(header => {
                        htmlBuilder += "<tr>"
                            + "<td align=left nowrap><span class=c3>" + header.ITEM_GROUP + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_COST_ITEM_GROUP.toLocaleString('en-US')) + "</span></td>"
                            + "<td align=right nowrap><span class=c3>" + (header.TOTAL_COST_ITEM_GROUP / this.DynamicDignsis.TOTAL_ANNUAL_SPEND).toLocaleString('en-US', { style: 'percent', maximumFractionDigits: 1 }) + "</span></td>"
                            + "<td align=center nowrap><span class=c3>" + header.NO_OF_ITEMS_BY_ITEM_GROUP.toLocaleString('en-US') + "</span></td>"
                            + "</tr>";
                    });

                    htmlBuilder += "</table></td><td>"
                        + "<table><tr><td align=center colspan=9 align=left nowrap>"
                        + "<span class=c3><img src= " + ChartPath + chartName + "  width=225 height=175></span></td></tr></table></td>"


                    htmlBuilder += "<tr></tr><table style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                        + "<tr>"
                        + "<td width='25%' align='center'><span class=c3><b>Group </b></span></td>"
                        + "<td align='center' width= '25%' colspan = " + this.lstCostVarianceSurHdrData.length + " ><span class=c3><b>Total Cost By Group</b></span></td>"
                        + "</tr><tr>"
                        + "<td rowspan='2' width='25%' style= 'font-size:12px'><b>Physician/Total Cases</b></td>"

                    await this.lstCostVariaceByPhy.forEach(header => {
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>" + header.PHYSICIAN_NAME + "</b></span></td>"

                    });

                    htmlBuilder += "</tr>"
                        //+ "<tr><td width='25%' align='center'><span class=c3><b> Group </b></span></td>"
                        + "<tr>"
                    await this.lstCostVariaceByPhy.forEach(header => {
                        htmlBuilder += "<td align=center nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"

                    });
                    + "</tr>"

                    var ex;
                    await this.lstAny.forEach(header => {
                        htmlBuilder += "<tr><td align=left nowrap><span class=c3>" + header.ITEM_GROUP + "</span></td>"
                        this.lstCostVariaceByPhy.forEach(header1 => {
                            ex = header[header1.PHYSICIAN_ID] == null || header[header1.PHYSICIAN_ID] == undefined ? "0" : this.transform(header[header1.PHYSICIAN_ID].toLocaleString('en-US'));
                            htmlBuilder += "<td align=right nowrap><span class=c3>" + ex + "</span></td>"
                        });
                        + "</tr>"
                    });

                    +"</table>";

                }
                catch (ex) {
                    htmlBuilder = '';
                    this.displayCatchException(ex);
                }

            }
            else if (this.activeTab == "Supply Details") {
                try {
                    htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                        + "<div style='margin-bottom:20px; width:100%'>"
                        + "<table align=center width=100% style='BORDER-COLLAPSE:collapse; border:none;'>"
                        + "<tr>"
                        + "<td>Range:</td>"
                        + "<td style='font-weight:bold !important'>" + this.selectedSltRngeLbl + "</td>"
                        + "<td>Year:</td>"
                        + "<td style='font-weight:bold !important'>" + this.ddltyear + "</td>"
                        + "<td>Specialty:</td>"
                        + "<td style='font-weight:bold !important'>" + this.VarnceSpecialityDescription + "(" + this.VarnceSpecialityCode + ")" + "</td>";
                    if (this.showHalfyrlbl) {
                        htmlBuilder += "<td>" + this.Hlfqtrmnthlbltxt + "</td>"
                            + "<td style='font-weight:bold !important'>" + this.Hlfqtrmnthlbl + "</td>";
                    }

                    htmlBuilder += "</tr>"
                        + "</table></div>"
                        + "</td></tr>";

                    htmlBuilder += "<tr><td> "
                        + "<table style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                        + "<tr>"
                        + "<td width='15%' align=center nowrap>"
                        + "<span class=c3><b>" + this.lblPhyvariance+"</b></span></td>"
                        + "<td width='10%' align=left nowrap>"
                        + "<span class=c3>" + this.DynamicDignsis.CODE + "</span></td>"
                        + "<td width='20%' align=left nowrap>"
                        + "<span class=c3><b>" + this.DynamicDignsis.DESCRIPTION + "</b></span></td>"
                        + "<td width='20%' align=center nowrap>"
                        + "<span class=c3>No.of procedures:</span></td>"
                        + "<td width='10%' align=right nowrap>"
                        + "<span class=c3>" + this.DynamicDignsis.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                        + "<td width='15%' align=center nowrap>"
                        + "<span class=c3>No.of Physicians</span></td>"
                        + "<td width='10%' align=center nowrap>"
                        + "<span class=c3>" + this.DynamicDignsis.NO_OF_PHYSICIANS.toLocaleString('en-US') + "</span></td>"
                        + "</tr></table></td>"
                        + "</tr><tr></tr>"

                    htmlBuilder += "<tr height=20 ></td></tr><tr><td colspan=2></td></tr><tr><td><table style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                        + "<tr>"
                        + "<td width='25%' style= 'font-size:12px'> </td>"

                    await this.lstCostVariaceByPhy.forEach(header => {
                        htmlBuilder += "<td align=left nowrap><span class=c3><b>" + header.PHYSICIAN_NAME + "</b></span></td>"

                    });

                    htmlBuilder += "</tr>"
                        + "<tr><td width='25%' align='center'><span class=c3><b> Group </b></span></td>"
                    await this.lstCostVariaceByPhy.forEach(header => {
                        htmlBuilder += "<td align=center nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"

                    });
                    htmlBuilder += "</tr>"

                    var ex;
                    await this.lstAny.forEach(header => {
                        console.log("Property:-" + header.hasOwnProperty("LSTDYNAMIC"));
                        htmlBuilder += "<tr><td align=left colspan = " + (this.lstCostVarianceSurHdrData.length + 1) + " nowrap><span class=c3>" + header.ITEM_GROUP + "</span>"
                        if (header.hasOwnProperty("LSTDYNAMIC")) {
                            if (header.LSTDYNAMIC != null && header.LSTDYNAMIC.length > 0) {
                                htmlBuilder += "<table width=98% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1><tr>"
                                    + "<td align=center nowrap><span class=c3><b> POU Description</b></span></td>"
                                    + "<td align=center nowrap><span class=c3><b> Item#</b></span></td>"
                                    + "<td align=center nowrap><span class=c3><b> MFR Catalog</b></span></td>"
                                    + "<td align=center nowrap><span class=c3><b> Unit Cost</b></span></td>"
                                this.lstCostVariaceByPhy.forEach(header => {
                                    htmlBuilder += "<td align=center wrap><span class=c3><b>" + header.PHYSICIAN_NAME + "</b></span></td>"
                                });
                                htmlBuilder += "</tr>"
                                header.LSTDYNAMIC.forEach(details => {
                                    htmlBuilder += "<tr>"
                                        + "<td align=left wrap><span class=c3>" + details.ITEM_DESCRIPTION + "</span></td>"
                                        + "<td align=left nowrap><span class=c3>" + details.ITEM_ID + "</span></td>"
                                        + "<td align=left nowrap><span class=c3>" + details.MFR_CATALOG_NO + "</span></td>"
                                        + "<td align=right nowrap><span class=c3>" + this.transform(details.UNIT_COST.toLocaleString('en-US')) + "</span></td>"
                                    this.lstCostVariaceByPhy.forEach(header1 => {
                                        ex = details[header1.PHYSICIAN_ID] == null ? "" : details[header1.PHYSICIAN_ID];
                                        htmlBuilder += "<td align=center nowrap><span class=c3>" + ex + "</span></td>"
                                    });
                                    htmlBuilder += "</tr>"
                                });

                                htmlBuilder += "</tr></table></tr>"
                            }
                        }
                        htmlBuilder += "</td></tr>"
                    });
                    htmlBuilder += "</table></td></tr>";

                }
                catch (ex) {
                    htmlBuilder = '';
                    this.displayCatchException(ex);
                }
            }

            htmlBuilder += "</Table>";

            return htmlBuilder;

        }
        catch (ex) {
            htmlBuilder = '';
            return htmlBuilder;
        }
    }
    /**
    * This function is used for filtering data in datatable 
    * @param event
    */
    filterData(event) {
        this.lstCostVarianceBySplt = [];
        this.lstCostVarianceBySplt = new Array<VM_POU_COSTVARIANCE_BY_SPECIALTY>();
        this.lstCostVarianceBySplt = event;
    }


    /**
    * This method is for displaying catch block error messages 
    * @param event
    */
    displayCatchException(ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());
    }


    async onchange(event) {
        if (this.selectedVarianceType == "Select Value") { this.blnselectedVarianceType = true; } else { this.blnselectedVarianceType = false; }

        this.selectedVarianceType = this.selectedVarianceType == "Select Value" ? "ICD" : this.selectedVarianceType;
    }

    async selectedTabIndexChanged(event: any) {
        try {

            if (event != null) {
                this.activeTab = event.title;
            }
            if (this.activeTab == 'Variance by Speciality') {
                this.VariancebyICDTab = false;
                this.gvVarianceICD = false;
                this.VariancebySpecialityTab = true;
                this.VariancebyPhyTab = false;
                this.SpendbyItemCateTab = false;
                this.SupplyDetailsTab = false;
                if (this.lstCostVarianceBySplt.length > 0) { this.gvVarianceSpelty = true; this.tdExports = true; } else { this.gvVarianceSpelty = false; this.tdExports = false; }

            } else if (this.activeTab == "Variance by ICD" || this.activeTab == "Variance by Procedure" || this.activeTab == "Variance by CPT") {
                this.VariancebySpecialityTab = false;
                this.VariancebyICDTab = true;
                this.gvVarianceSpelty = false;
                this.VariancebyPhyTab = false;
                this.SpendbyItemCateTab = false;
                this.SupplyDetailsTab = false;
                if (this.lstCostVarianceByDiagnsis.length > 0) { this.gvVarianceICD = true; this.tdExports = true; } else { this.gvVarianceICD = false; this.tdExports = false; }

            } else if (this.activeTab == 'Physician Variance') {
                this.VariancebyPhyTab = true;
                this.VariancebySpecialityTab = false;
                this.VariancebyICDTab = false;
                this.SpendbyItemCateTab = false;
                this.SupplyDetailsTab = false;
                if (this.lstCostVariaceByPhy.length > 0) { this.pop = true; this.tdExports = true; } else { this.pop = false; this.tdExports = false; }

            } else if (this.activeTab == 'Spend by Item Category') {
                this.VariancebyPhyTab = false;
                this.VariancebySpecialityTab = false;
                this.VariancebyICDTab = false;
                this.SpendbyItemCateTab = true;
                this.SupplyDetailsTab = false;
            } else if (this.activeTab == 'Supply Details') {
                this.VariancebyPhyTab = false;
                this.VariancebySpecialityTab = false;
                this.VariancebyICDTab = false;
                this.SpendbyItemCateTab = true;
                this.SupplyDetailsTab = false;
            } else {
                this.VariancebySpecialityTab = true;
                this.VariancebyPhyTab = false;
                this.VariancebyICDTab = false;
                this.SpendbyItemCateTab = false;
                // alert("Please select first three tab's");
            }
        }
        catch (ex) {
            this.displayCatchException(ex);
        }

    }

    onCaseDetailsClick(Navdd: VM_POU_COSTVARIANCE_BY_SPECIALTY, event) {
        this.ctabs.filter(tab => tab.title == 'Spend by Item Category')[0].active = false;
        this.ctabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
        this.ctabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0].active = true;
        this.ctabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
        this.ctabs.filter(tab => tab.title == 'Supply Details')[0].active = false;
        this.VarnceSpecialityCode = Navdd.SPECIALTY_CODE;
        this.VarnceSpecialityDescription = Navdd.SPECIALTY_DESCRIPTION;
        this.activeTab = "Variance by " + this.selectedVarianceType;
        this.SltVariancDiagRnge = this.selectedSltRnge;
        this.SltVariancDiagHQM = this.selectedSltHQM;
        this.lstCostVariaceByPhy = [];
        this.lstAny = [];
        this.lstItemData = [];
        this.lstCostVarianceSurHdrData = [];
        this.SupplyDetlslngth = 0;
        this.GetCostVarianceDiagnosis();

    }

    btnGetCostVarianceDiagnosis() {
        try {
            this.activeTab = "Variance by " + this.selectedVarianceType;
            if (this.selectedVarianceType == "Procedure") {
                this.VarianceDiagCode = "PROCEDURE_CODE";
                this.VarianceDiagDesc = "PROCEDURE_DESCRIPTION";
            } else if (this.selectedVarianceType == "CPT") {
                this.VarianceDiagCode = "CPT_CODE";
                this.VarianceDiagDesc = "CPT_DESCR";
            } else {
                this.VarianceDiagCode = "ICD_CODE";
                this.VarianceDiagDesc = "ICD_DESCR";
            }

            this.lstCostVarianceBySplt = null;
            this.spinnerService.start();
            if (this.dataTableComponent != null) {
                this.dataTableComponent.reset();
            }
            this.growlMessage = [];
            this.pop = false;
            this.gvVarianceSpelty = false;
            this.tdExports = false;

            if (this.SltVariancDiagRnge == "HY" && (this.SltVariancDiagHQM == undefined || this.SltVariancDiagHQM == "" || this.SltVariancDiagHQM == "Select Value")) {
                this.growlMessage = [];
                this.spinnerService.stop();
                this.pop = false;
                this.tdExports = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Half Year" });
                return;
            }
            else if (this.SltVariancDiagRnge == "Q" && (this.SltVariancDiagHQM == undefined || this.SltVariancDiagHQM == "" || this.SltVariancDiagHQM == "Select Value")) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Quarter" });
                this.spinnerService.stop();
                this.pop = false;
                this.tdExports = false;
                return;
            }
            else if (this.SltVariancDiagRnge == "M" && (this.SltVariancDiagHQM == undefined || this.SltVariancDiagHQM == "" || this.SltVariancDiagHQM == "Select Value")) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Month' });
                this.spinnerService.stop();
                this.pop = false;
                return;
            }
            else if (this.SltVariancDiagRnge == "Select Value" || this.SltVariancDiagRnge == undefined || this.SltVariancDiagRnge == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Range" });
                this.spinnerService.stop();
                this.pop = false;
                return;
            }
            else if (this.ddltyear == undefined || this.ddltyear == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Year" });
                this.spinnerService.stop();
                this.pop = false;
                return;
            }
            else {
                this.strHalfyear = "0";
                this.strMonth = "0"
                this.strQuarter = "0";
                switch (this.selectedSltRnge) {
                    case "HY": {
                        this.strHalfyear = this.SltVariancDiagHQM;
                        break;
                    }
                    case "Q": {
                        this.strQuarter = this.SltVariancDiagHQM;
                        break;
                    }
                    case "M": {
                        this.strMonth = this.SltVariancDiagHQM;
                        break;
                    }
                }
                this.GetCostVarianceDiagnosis();
            }
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    async GetCostVarianceDiagnosis() {
        this.SpendbyItemCateTab = false;
        this.VariancebySpecialityTab = false;
        this.gvVarianceSpelty = false;
        this.gvVarianceICD = false;
        this.SpendbyItemCateTab = false;

        this.spinnerService.start();
        try {
            await this.PouCstvarianceService.GetCostVarianceByDiagnosiscode(this.VarnceSpecialityCode, this.VarianceDiagCode, this.VarianceDiagDesc, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE>;
                sessionStorage.setItem('_DS', JSON.stringify(data.DataList));
                sessionStorage.setItem('SesCostVarianceICD', JSON.stringify(data.DataList));
                this.lstCostVarianceByDiagnsis = data.DataList;
                if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                    this.pop = false;
                    this.VariancebyICDTab = true;

                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                    this.pop = false;
                    this.VariancebyICDTab = true;

                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                    this.pop = false;
                    this.VariancebyICDTab = true;

                    return;
                }
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.lstCostVarianceByDiagnsis = data.DataList;
                        if (this.lstCostVarianceByDiagnsis != null && this.lstCostVarianceByDiagnsis.length > 0) {
                            this.showGrid = true;
                            this.tdExports = true;
                            this.spinnerService.stop();
                            this.gvVarianceICD = true;
                            this.VariancebyICDTab = true;
                            this.lstICDLength = this.lstCostVarianceByDiagnsis.length + " Record(s) found";
                            //this.activeTab = "Variance by ICD";
                            this.activeTab = "Variance by " + this.selectedVarianceType;
                            this.totalDiag_Proceduers = asEnumerable(this.lstCostVarianceByDiagnsis).Sum(m => m.NO_OF_PROCEDURES);
                            this.totalDiag_Variance = asEnumerable(this.lstCostVarianceByDiagnsis).Sum(m => m.TOTAL_VARIANCE);
                            this.totalDiag_Spend = asEnumerable(this.lstCostVarianceByDiagnsis).Sum(m => m.TOTAL_SPEND);
                            this.totalDiag_AnnualSpend = asEnumerable(this.lstCostVarianceByDiagnsis).Sum(m => m.TOTAL_ANNUAL_SPEND);
                            this.diag_variancePercent = (this.totalDiag_Variance / this.totalDiag_Spend) * 100;
                        }
                        else {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                            this.pop = false;
                            this.VariancebyICDTab = true;

                        }

                        if (this.lstCostVarianceByDiagnsis.length <= 0) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                            this.pop = false;
                            this.VariancebyICDTab = true;

                        }
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Warn: {
                        this.SltVariancDiagRnge = "";
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.SltVariancDiagRnge = "";
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.SltVariancDiagRnge = "";
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.displayCatchException(ex);
        }

    }

    async onVarianceByPhyClick() {
        try {
            this.ctabs.filter(tab => tab.title == 'Spend by Item Category')[0].active = true;
            this.ctabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
            this.ctabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0].active = false;
            this.ctabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
            this.ctabs.filter(tab => tab.title == 'Supply Details')[0].active = false;
            this.VariancebySpecialityTab = false;
            this.gvVarianceSpelty = false;
            this.gvVarianceICD = false;
            this.SpendbyItemCateTab = true;
            this.VariancebyICDTab = false
            this.VariancebyPhyTab = false;
            this.activeTab = "Spend by Item Category";
            this.PhyIds = "";
            this.NoOfProcedures = 0;
            this.lstChartData = [];
            //this.lstAny = [];
            //this.SupplyDetlslngth = 0;

            await this.PouCstvarianceService.GetCostvarianceSurgeonHdrData(this.DynamicDignsis.CODE, this.VarnceSpecialityCode, this.VarianceDiagCode, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<VM_POU_COSTVARIANCE_SURGEON_HDR_DATA>;
                this.lstCostVarianceSurHdrData = data.DataList;

                if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                    return;
                }
            });
            //lstCostVariaceByPhy
            for (var i = 0; i < this.lstCostVarianceSurHdrData.length; i++) {
                let physplit = this.lstCostVarianceSurHdrData[i].PHYSICIAN_NAME.split(',')
                if (physplit != null && physplit.length > 1) {
                    this.lstCostVarianceSurHdrData[i].PHYSICIAN_NAME = physplit[0] + ', ' + physplit[1];
                }
                //this.PhyIds = this.PhyIds + this.lstCostVarianceSurHdrData[i].PHYSICIAN_ID;
                this.PhyIds = this.PhyIds + this.lstCostVariaceByPhy[i].PHYSICIAN_ID;
                let physplit1 = this.lstCostVariaceByPhy[i].PHYSICIAN_NAME.split(',')
                if (physplit1 != null && physplit1.length > 1) {
                    this.lstCostVariaceByPhy[i].PHYSICIAN_NAME = physplit1[0] + ', ' + physplit1[1];
                }
                this.NoOfProcedures = this.NoOfProcedures + this.lstCostVarianceSurHdrData[i].TOTAL_NO_OF_CASES_PHYSICIAN;
                if (i != this.lstCostVarianceSurHdrData.length - 1) {
                    this.PhyIds = this.PhyIds + ","
                }
            }
            //this.PhyIds = '';
            if (this.PhyIds == '' || this.PhyIds == null)
            {
                this.showSpendByItmTab = false;
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                return;
            }
            await this.PouCstvarianceService.GetCostVarianceItemGroups(this.VarianceDiagCode, this.VarnceSpecialityCode, this.DynamicDignsis.CODE, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUPS>;
                this.lstCostVarianceItemGroups = data.DataList;
                if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                    return;
                }
            });

            await this.PouCstvarianceService.GetCostvarianceItemHdrDetails(this.VarianceDiagCode, this.VarnceSpecialityCode, this.DynamicDignsis.CODE, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUP_HDR_DETAILS>;
                this.lstCostVarianceItemHdrDtls = data.DataList;
                if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                    return;
                }
            });
           
            await this.PouCstvarianceService.GetCostvarianceSurgeonItemgroupDetails(this.VarianceDiagCode, this.VarnceSpecialityCode, this.DynamicDignsis.CODE, this.PhyIds, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<any>;
                this.lstAny = data.DataDictionary["ItemGroupDetails"]["Table"];      
                     
                if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                    return;
                }
            });



            let label = []
            var data = []
            var backColors = []
            var hoverBackColors = []
            for (var i = 0; i < this.lstCostVarianceItemHdrDtls.length; i++) {
                this.ChartColor = "";

                switch (this.lstCostVarianceItemHdrDtls[i].ITEM_GROUP) {
                    case "Preference Card Item": {
                        this.ChartColor = '#008dfa';
                        break;
                    }
                    case "Surgical Implant": {
                        this.ChartColor = '#ff4717';
                        break;
                    }
                    case "General Surgical Supply": {
                        this.ChartColor = '#ffa630';
                        break;
                    }
                    case "Physician Preference": {
                        this.ChartColor = '#1bb377';
                        break;

                    }
                    default: {
                        this.ChartColor = this.getRandomColor();
                        break;
                    }
                }
                label.push(this.lstCostVarianceItemHdrDtls[i].ITEM_GROUP);
                data.push([Math.round((this.lstCostVarianceItemHdrDtls[i].TOTAL_COST_ITEM_GROUP / this.DynamicDignsis.TOTAL_ANNUAL_SPEND) * 100)]);
                backColors.push(this.ChartColor);
                hoverBackColors.push(this.ChartColor);
            }

            this.lstChartData = {
                labels: label,
                datasets: [
                    {
                        data: data,
                        backgroundColor: backColors,
                        hoverBackgroundColor: hoverBackColors,
                    }]
            };
        }
        catch (ex) {
            this.displayCatchException(ex);
        }

    }

    getRandomColor() {
        try {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    onVarianceByPhyDyClick() {
        this.ctabs.filter(tab => tab.title == 'Spend by Item Category')[0].active = false;
        this.ctabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
        this.ctabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0].active = false;
        this.ctabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
        this.ctabs.filter(tab => tab.title == 'Supply Details')[0].active = true;
        this.activeTab = "Supply Details";
        this.SupplyDetailsTab = true;
        this.VariancebySpecialityTab = false;
        this.gvVarianceSpelty = false;
        this.VariancebyICDTab = false;
        this.SpendbyItemCateTab = false;
        this.Fifthtabtble = true;
        //this.SupplyDetlslngth = 1;
        this.SupplyDetlslngth = this.lstAny.length;  
    }

    async onVarianceByICDClick(Navdd: VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE, event) {
        try {
            this.ctabs.filter(tab => tab.title == 'Spend by Item Category')[0].active = false;
            this.ctabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
            this.ctabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0].active = false;
            this.ctabs.filter(tab => tab.title == 'Physician Variance')[0].active = true;
            this.ctabs.filter(tab => tab.title == 'Supply Details')[0].active = false;
            this.spinnerService.start();
            this.VariancebySpecialityTab = false;
            this.gvVarianceSpelty = false;
            this.VariancebyICDTab = false;
            this.SpendbyItemCateTab = false;

            this.activeTab = "Physician Variance";

            this.DynamicDignsis.CODE = Navdd.CODE;
            this.DynamicDignsis.DESCRIPTION = Navdd.DESCRIPTION;
            this.DynamicDignsis.MAX_USAGE = Navdd.MAX_USAGE;
            this.DynamicDignsis.MIN_USAGE = Navdd.MIN_USAGE;
            this.DynamicDignsis.TOTAL_VARIANCE = Navdd.TOTAL_VARIANCE;
            this.DynamicDignsis.NO_OF_PHYSICIANS = Navdd.NO_OF_PHYSICIANS;
            this.DynamicDignsis.NO_OF_PROCEDURES = Navdd.NO_OF_PROCEDURES;
            this.DynamicDignsis.TOTAL_ANNUAL_SPEND = Navdd.TOTAL_ANNUAL_SPEND;

            this.lstCostVariaceByPhy = [];
            this.lstAny = [];
            //this.SupplyDetlslngth = 0;


            await this.PouCstvarianceService.GetCostVarianceBySurgeon(this.VarianceDiagCode, this.VarnceSpecialityCode, this.DynamicDignsis.CODE, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_SURGEON>;
                sessionStorage.setItem('_DSSurgeon', JSON.stringify(data.DataList));
                this.lstCostVariaceByPhy = data.DataList;
                if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                    this.pop = false;
                    this.VariancebyPhyTab = true;

                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                    this.pop = false;
                    this.VariancebyPhyTab = true;

                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                    this.pop = false;
                    this.VariancebyPhyTab = true;

                    return;
                }
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.lstCostVariaceByPhy = data.DataList;
                        if (this.lstCostVariaceByPhy != null && this.lstCostVariaceByPhy.length > 0) {
                            this.pop = true;
                            this.showGrid = true;
                            this.tdExports = true;
                            this.spinnerService.stop();
                            this.VariancebyPhyTab = true;
                            this.lstPhyvarianceLength = this.lstCostVariaceByPhy.length + " Record(s) found";
                            this.activeTab = "Physician Variance";

                        }
                        else {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                            this.pop = false;
                            this.VariancebyPhyTab = true;

                        }

                        if (this.lstCostVarianceByDiagnsis.length <= 0) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                            this.pop = false;
                            this.VariancebyPhyTab = true;

                        }
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {

                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {

                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    async onSupplyDtlsByItemGrpClick(Navdd: VM_POU_COSTVARIANCE_ITEMGROUPS, event) {
        debugger;
        this.activeTab = "Supply Details";
        let index = this.lstAny.findIndex(x => x.ITEM_GROUP == Navdd.ITEM_GROUP);
        var exists = false;
        this.lstAny5th.forEach(x => {
            if (x.ITEM_GROUP == this.lstAny[index].ITEM_GROUP) exists = true;
        });
        if (exists) {
            this.lstAny5th.splice(this.lstAny[index], 1);
            this.lstAny[index].SHOW_HIDE = false;
        }
        else {

            for (var i = 0; i < this.lstAny5th.length; i++) {
                var find = this.lstAny5th[i].ITEM_GROUP;
                var j = this.lstAny.findIndex(y => y.ITEM_GROUP == find);
                this.lstAny5th.splice(this.lstAny[i], 1);
                this.lstAny[j].SHOW_HIDE = false;
            }
            this.lstAny5th.push(this.lstAny[index]);
            this.lstAny[index].SHOW_HIDE = true;
            this.spinnerService.start();
            await this.PouCstvarianceService.GetCostvarianceSupplyItemData(Navdd.ITEM_GROUP, this.VarianceDiagCode, this.VarnceSpecialityCode, this.DynamicDignsis.CODE, this.PhyIds, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<any>;
                this.lstItemData = data.DataDictionary["DictSupplyItemData"]["Table"];
                this.lstAny[index].LSTDYNAMIC = this.lstItemData;
                //this.SupplyDetlslngth = this.lstItemData.length;
                if (this.lstItemData.length == 0) {                    
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                    return;
                }                
                if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                    return;
                }
                if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                    return;
                } else {
                    this.spinnerService.stop();
                }
            });
        }
    }


    /**
    * This method is for clearing all the variables
    * @param event
    */
    ngOnDestroy() {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstCostVarianceBySplt = null;
        this.lstSltHQM = null;
        this.lstVarianceType = null;
        this.deviceTokenEntry = null;
    }

    ctab: any;
    ctabs: any;
    enableSelectedTab(option: any) {        
        this.ctab = option.tab;
        this.ctabs = option.tabs;
        if (option.tab.title == 'Variance by Speciality') {
            this.activeTab = "Variance by Speciality";
            if (this.selectedSltRnge != "Y1") {
                this.gvVarianceSpelty = true;
                this.showGrid = true;
            }
            if (this.lstCostVarianceBySplt != null && this.lstCostVarianceBySplt.length > 0) {
                this.tdExports = true;
            }
            else {
                this.tdExports = false;
                this.gvVarianceSpelty = false;
            }
        }
        else if (option.tab.title == "Variance by " + this.selectedVarianceType) {
            if (this.lstCostVarianceByDiagnsis != null && this.lstCostVarianceByDiagnsis.length > 0) {
                this.activeTab = "Variance by " + this.selectedVarianceType;
                this.gvVarianceICD = true;
                this.showGrid = true;
                this.tdExports = true;
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0];
                }
                option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
                option.tabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
            }
            else if (this.activeTab === "Variance by Speciality" && this.lstCostVarianceByDiagnsis.length === 0) {

                if (this.lstCostVarianceBySplt != null && this.lstCostVarianceBySplt.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by Speciality";
                this.ctab = option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0];
                option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0].active = false;
                option.tabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
            }
        }
        else if (option.tab.title == 'Physician Variance') {

            if (this.lstCostVariaceByPhy != null && this.lstCostVariaceByPhy.length > 0) {
                this.activeTab = "Physician Variance";
                this.tdExports = true;
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(tab => tab.title == 'Physician Variance')[0];
                }
                option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
                option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0].active = false;
            }
            else if (this.activeTab === "Variance by Speciality" && this.lstCostVariaceByPhy.length === 0) {

                if (this.lstCostVarianceBySplt != null && this.lstCostVarianceBySplt.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by Speciality";
                this.ctab = option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0];
                option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0].active = false;
                option.tabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
            }
            else if (this.activeTab === "Variance by " + this.selectedVarianceType && this.lstCostVariaceByPhy.length === 0) {

                if (this.lstCostVarianceByDiagnsis != null && this.lstCostVarianceByDiagnsis.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by " + this.selectedVarianceType;
                this.ctab = option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0];
                option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
                option.tabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
            }

        }
        else if (option.tab.title == 'Spend by Item Category') {
            if (this.lstAny != null && this.lstCostVarianceItemGroups != null && this.lstCostVarianceItemHdrDtls != null && this.lstAny.length > 0 && this.lstCostVarianceItemGroups.length > 0 && this.lstCostVarianceItemHdrDtls.length > 0) {
                this.activeTab = "Spend by Item Category";
                this.tdExports = true;
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(tab => tab.title == 'Spend by Item Category')[0];
                }
                option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
                option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0].active = false;
                option.tabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
            }
            else if (this.activeTab === "Variance by Speciality" && this.lstCostVarianceItemGroups.length === 0) {

                if (this.lstCostVarianceBySplt != null && this.lstCostVarianceBySplt.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by Speciality";
                this.ctab = option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0];
                option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0].active = false;
                option.tabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
            }
            else if (this.activeTab === "Variance by " + this.selectedVarianceType && this.lstCostVarianceItemGroups.length === 0) {

                if (this.lstCostVarianceByDiagnsis != null && this.lstCostVarianceByDiagnsis.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by " + this.selectedVarianceType;
                this.ctab = option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0];
                option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
                option.tabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
            }
            else if (this.activeTab === "Physician Variance" && this.lstCostVarianceItemGroups.length === 0) {

                if (this.lstCostVariaceByPhy != null && this.lstCostVariaceByPhy.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Physician Variance";
                this.ctab = option.tabs.filter(tab => tab.title == 'Physician Variance')[0];
                option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0] = false;
                option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
            }

        }
        else if (option.tab.title == 'Supply Details') {
            if (this.SupplyDetlslngth > 0 && this.SupplyDetlslngth != null) {
                this.activeTab = "Supply Details";
                this.tdExports = true;
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(tab => tab.title == 'Supply Details')[0];
                }
                option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
                option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0].active = false;
                option.tabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
                option.tabs.filter(tab => tab.title == 'Spend by Item Category')[0].active = false;
            }
            else if (this.activeTab === "Variance by Speciality" && this.SupplyDetlslngth === 0) {

                if (this.lstCostVarianceBySplt != null && this.lstCostVarianceBySplt.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by Speciality";
                this.ctab = option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0];
                option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0].active = false;
                option.tabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
            }
            else if (this.activeTab === "Variance by " + this.selectedVarianceType && this.SupplyDetlslngth === 0) {

                if (this.lstCostVarianceByDiagnsis != null && this.lstCostVarianceByDiagnsis.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by " + this.selectedVarianceType;
                this.ctab = option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0];
                option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
                option.tabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
            }
            else if (this.activeTab === "Physician Variance" && this.SupplyDetlslngth === 0) {

                if (this.lstCostVariaceByPhy != null && this.lstCostVariaceByPhy.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Physician Variance";
                this.ctab = option.tabs.filter(tab => tab.title == 'Physician Variance')[0];
                option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0] = false;
                option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
            }
            else if (this.activeTab === "Spend by Item Category" && this.SupplyDetlslngth === 0) {

                if (this.lstCostVarianceItemGroups != null && this.lstCostVarianceItemGroups.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Spend by Item Category";
                this.ctab = option.tabs.filter(tab => tab.title == 'Spend by Item Category')[0];
                option.tabs.filter(tab => tab.title == "Variance by " + this.selectedVarianceType)[0] = false;
                option.tabs.filter(tab => tab.title == 'Variance by Speciality')[0].active = false;
                option.tabs.filter(tab => tab.title == 'Physician Variance')[0].active = false;
            }
        }
        if (option != null) {
            this.ctab.active = true;
            if (option.tabs != null && this.tabs == null) {
                this.tabs = option.tabs;
            }
        }
    }
    transform(value: any): any {
        return value.charAt(0) == '-' ?
            '($' + value.substring(1, value.length) + ')' :
            '$'+value;
    }
}
