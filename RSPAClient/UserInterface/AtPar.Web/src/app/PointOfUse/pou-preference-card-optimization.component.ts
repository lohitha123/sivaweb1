import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';

import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { PreferenceCardOptimizationServices } from './pou-preference-card-optimization.service';
import { Http, Response } from "@angular/http";
import { VM_POU_PREF_OPT_BY_SPECIALTY } from '../Entities/VM_POU_PREF_OPT_BY_SPECIALTY';
import { VM_POU_PREF_OPT_BY_PROCEDURE } from '../Entities/VM_POU_PREF_OPT_BY_PROCEDURE';
import { VM_POU_PREF_OPT_BY_PHYSICIAN } from '../Entities/VM_POU_PREF_OPT_BY_PHYSICIAN';
import { VM_POU_PREF_OPT_HEADER_DATA } from '../Entities/VM_POU_PREF_OPT_HEADER_DATA';
import { VM_POU_PREF_OPT_BY_PREFERENCE } from '../Entities/VM_POU_PREF_OPT_BY_PREFERENCE';
import { AtParConstants } from '../Shared/AtParConstants';
import { Menus } from '../AtPar/Menus/routepath';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { MinusSignToParens } from '../components/custompipes/minus-sign-to-parens.pipe';

import {
    StatusType,
    TokenEntry_Enum,
    YesNo_Enum,
    DataSet_Type,
    EnumApps,
    MailPriority
} from '../Shared/AtParEnums';
import {
    Message,
    SelectItem
} from '../components/common/api';




//declare var module: {
//    id: string;
//}
@Component({


    //moduleId: module.id,
    templateUrl: 'pou-preference-card-optimization.component.html',

    providers: [
        AtParCommonService,
        AtParConstants,
        PreferenceCardOptimizationServices
    ]

})

@Injectable()
export class PreferenceCardOptimizationComponent {

    breadCrumbMenu: Menus;

    noOfRecords: number = 0;
    lblResultCount: number = 0;
    lblProcRowCount: number = 0;
    lblOptRecsCount: number = 0;
    prefOptBySpecialityRows: number = 0;
    prefOptByProcRows: number = 0;
    prefOptimizeRows: number = 0;
    statusCode: number = -1;

    strUserId: string = '';
    deviceTokenEntry: string[] = [];
    strMaxAllowQty: string = '';
    selectedRange: string = '8';
    selectedYear: string = '';
    selectedHQM: string = '';
    selectedHalfYear: string = '';
    selectedQuarter: string = '';
    selectedMonth: string = '';
    toMailAddr: string = '';
    activeTab: string;
    ipAddress: string;
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    lblSpeciality: string = '';
    lblSpecialityDesc: string = '';
    OptRemoveValue: string = '31';
    OptHoldValue1: string = '31';
    OptHoldValue2: string = '70';
    OptOpenValue: string = '70';
    lblPrefCardName: string = '';
    lblProcedure: string = '';
    lblPhysician: string = '';
    lessImg: string = '';
    addToHoldImg: string = '';
    greaterImg: string = '';
    lblSelectedRange: string = '';
    lblSelectedHQM: string = '';
    strSelectedHQM: string = '';

    lstRange: any[] = [];
    lstYear: any[] = [];
    lstHQM: any[] = [];
    lstMonths: any[] = [];

    selectedDDHQM: boolean = true;
    gvPrefSpeciality: boolean = false;
    tdExports: boolean = false;
    showSpecialityGrid: boolean = false;
    showProcedureGrid: boolean = false;
    //SHOW_PHYSICIAN_GRID: boolean = false;
    showOptimizationGrid: boolean = false;
    isMailDialog: boolean = false;
    isPostback: boolean = false;
    tabSpeciality: boolean = true;
    tabProcedure: boolean = false;
    tabOptimization: boolean = false;
    tabProcedureDisabled: boolean = true;
    tabOptimizationDisabled: boolean = true;
    showDynamictbl: boolean = false;
    showHQMValues: boolean = false;

    msgs: Message[] = [];
    dvPrefOptBySpeciality: VM_POU_PREF_OPT_BY_SPECIALTY[] = [];
    lstSpecialityFilterData: VM_POU_PREF_OPT_BY_SPECIALTY[] = [];
    dvPrefOptByProcedure: VM_POU_PREF_OPT_BY_PROCEDURE[] = [];
    lstProcedureDtls: VM_POU_PREF_OPT_BY_PROCEDURE[] = [];
    lstPhysicianDetails: VM_POU_PREF_OPT_BY_PHYSICIAN[] = [];

    prefOptHeaderDetails: VM_POU_PREF_OPT_HEADER_DATA[] = [];
    prefOptHeaderData: VM_POU_PREF_OPT_HEADER_DATA;
    lstDetails: VM_POU_PREF_OPT_HEADER_DATA[] = [];
    prefOptDetailsData: VM_POU_PREF_OPT_BY_PREFERENCE[] = [];
    tempPrefOptDtlsData: VM_POU_PREF_OPT_BY_PREFERENCE[] = [];

    expandedItems: Array<any> = new Array<any>();

    hdrDtlsParams: any = null;
    ctab: any;
    ctabs: any;
    tabs: any;



    constructor(
        private httpService: HttpService,
        private commonService: AtParCommonService,
        private spinnerService: SpinnerService,
        private prefCardOptService: PreferenceCardOptimizationServices,
        private atParConstant: AtParConstants
    ) {

        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new Menus();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.noOfRecords = parseInt(this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage]);
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        this.spinnerService.stop();
    }


    async ngOnInit() {
       

        this.showSpecialityGrid = false;
        this.showProcedureGrid = false;
        this.showOptimizationGrid = false;

        this.lstRange = [];
        this.lstRange.push({ label: 'Select Value', value: '8' });
        this.lstRange.push({ label: 'Yearly', value: '0' });
        this.lstRange.push({ label: 'Half Yearly', value: '1' });
        this.lstRange.push({ label: 'Quarterly', value: '2' });
        this.lstRange.push({ label: 'Monthly', value: '3' });

        let cYear: number = (new Date()).getFullYear();
        this.lstYear = [];
        this.lstYear.push({ label: "Select Year", value: "Select Year" });
        for (var year = (cYear - 50); year <= cYear; year++) {
            this.lstYear.push({
                label: '' + year + '',
                value: '' + year + ''
            });
        }

        this.lstHQM = [];
        this.lstHQM.push({ label: "Select Value", value: "Select Value" });

        try {

            try {
                this.spinnerService.start();
                this.statusCode = -1;
                this.strUserId = this.deviceTokenEntry[TokenEntry_Enum.UserID];
            } catch (ex) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed to get Parameters' });
                return;
            }
            try {
                this.statusCode = await this.getProfileParamValue();
                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                    return;
                }

            } catch (ex) {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error' });
                return;
            }

            await this.getServerIP();
            await this.getSSLConfigDetails();
            let imgserverPath: string = '';
            //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/assets/images/';
            this.lessImg = imgserverPath + "less.png";
            this.addToHoldImg = imgserverPath + "Addtohold.png";
            this.greaterImg = imgserverPath + "greater.png";

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }


    async onGoClick() {
        try {

            this.spinnerService.start();
            this.statusCode = -1;
            this.msgs = [];

            this.lblResultCount = 0;
            this.dvPrefOptByProcedure = [];
            this.prefOptDetailsData = [];
            this.lblSelectedRange = '';
            this.strSelectedHQM = '';
            this.showHQMValues = false;

            let returnValue: boolean = false;
            this.tdExports = false;
            this.activeTab = 'By Speciality';

            //returnValue = await this.validateFields();
            if (await this.validateFields()) {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });

                await this.getHQMDDValues();

                let selectedRangeIndex = this.lstRange.findIndex(x => x.value == this.selectedRange);
                this.lblSelectedRange = this.lstRange[selectedRangeIndex].label;
                if (this.selectedRange != null && this.selectedRange != '' && this.selectedRange != 'Select Value' && this.selectedRange != '0' && this.selectedRange != '8') {
                    let selectedHQMIndex = this.lstHQM.findIndex(x => x.value == this.selectedHQM);

                    if (this.lblSelectedHQM == "Month") {
                        this.strSelectedHQM = this.lstMonths[selectedHQMIndex].label;
                    }
                    else {
                        this.strSelectedHQM = this.lstHQM[selectedHQMIndex].label;
                    }
                    this.showHQMValues = true;
                }
                else {
                    this.lblSelectedHQM = '';
                }

                await this.bindPrefOptBySummaryGrid();
                //this.tabProcedureDisabled = false;
            }


        } catch (ex) {
            this.clientErrorMsg(ex);
        }

        finally {
            this.spinnerService.stop();
        }
    }

    async getHQMDDValues() {
        if (this.selectedRange != null && this.selectedRange != '' && this.selectedRange != 'Select Value') {

            if (this.selectedRange == '1') {
                this.selectedHalfYear = this.selectedHQM;
                this.lblSelectedHQM = "Half Year:";
            }
            else if (this.selectedRange == '2') {
                this.selectedQuarter = this.selectedHQM;
                this.lblSelectedHQM = "Quarter:";
            }
            else if (this.selectedRange == '3') {
                this.selectedMonth = this.selectedHQM;
                this.lblSelectedHQM = "Month:";
            }
        }

        return true;
    }

    async ddItemIDChanged(event) {
        if (this.selectedRange != null && this.selectedRange != '' && this.selectedRange != 'Select Value') {
            this.lstHQM = [];
            this.lstMonths = [];
            this.selectedHQM = "Select Value";
            this.selectedHalfYear = '';
            this.selectedQuarter = '';
            this.selectedMonth = '';
            this.tdExports = false;

            if (this.activeTab.trim() == 'By Speciality') {
                this.dvPrefOptBySpeciality = [];
                this.showSpecialityGrid = false;
            }
            else if (this.activeTab.trim() == 'By Procedure') {
                this.dvPrefOptByProcedure = [];
                this.showProcedureGrid = false;
            }
            else if (this.activeTab.trim() == 'Optimization') {
                this.prefOptDetailsData = [];
                this.showOptimizationGrid = false;
            }

            if (this.selectedRange == '0') {
                this.selectedDDHQM = false;
            }
            else if (this.selectedRange == '1') {

                this.lstHQM.push({ label: "Select Value", value: "Select Value" });
                this.lstHQM.push({ label: 'First Half(Jan-Jun)', value: '1' });
                this.lstHQM.push({ label: 'Second Half(July-Dec)', value: '2' });
            }
            else if (this.selectedRange == '2') {
                this.lstHQM.push({ label: "Select Value", value: "Select Value" });
                this.lstHQM.push({ label: 'Q1(Jan-Mar)', value: '1' });
                this.lstHQM.push({ label: 'Q2(Apr-Jun)', value: '2' });
                this.lstHQM.push({ label: 'Q3(July-Sep)', value: '3' });
                this.lstHQM.push({ label: 'Q4(Oct-Dec)', value: '4' });
            }
            else if (this.selectedRange == '3') {
                this.lstHQM.push({ label: "Select Value", value: "Select Value" });
                this.lstHQM.push({ label: 'Jan', value: '1' });
                this.lstHQM.push({ label: 'Feb', value: '2' });
                this.lstHQM.push({ label: 'Mar', value: '3' });
                this.lstHQM.push({ label: 'Apr', value: '4' });
                this.lstHQM.push({ label: 'May', value: '5' });
                this.lstHQM.push({ label: 'Jun', value: '6' });
                this.lstHQM.push({ label: 'July', value: '7' });
                this.lstHQM.push({ label: 'Aug', value: '8' });
                this.lstHQM.push({ label: 'Sep', value: '9' });
                this.lstHQM.push({ label: 'Oct', value: '10' });
                this.lstHQM.push({ label: 'Nov', value: '11' });
                this.lstHQM.push({ label: 'Dec', value: '12' });

                this.lstMonths.push({ label: "Select Value", value: "Select Value" });
                this.lstMonths.push({ label: 'January', value: '1' });
                this.lstMonths.push({ label: 'February', value: '2' });
                this.lstMonths.push({ label: 'March', value: '3' });
                this.lstMonths.push({ label: 'April', value: '4' });
                this.lstMonths.push({ label: 'May', value: '5' });
                this.lstMonths.push({ label: 'June', value: '6' });
                this.lstMonths.push({ label: 'July', value: '7' });
                this.lstMonths.push({ label: 'August', value: '8' });
                this.lstMonths.push({ label: 'September', value: '9' });
                this.lstMonths.push({ label: 'October', value: '10' });
                this.lstMonths.push({ label: 'November', value: '11' });
                this.lstMonths.push({ label: 'December', value: '12' });
            }

        }
    }

    async bindPrefOptBySummaryGrid() {
        try {
            this.statusCode = -1;
            this.msgs = [];
            let ds: any[] = [];
            let dvCharges: any[] = [];
            let tempTodate: string = '';
            //let strDeptID: string = this.selectedDept;
            this.lstSpecialityFilterData = null;
            this.lblResultCount = 0;
            this.dvPrefOptBySpeciality = [];

            //await this.prefCardOptService.getPrefOptBySpeciality(2016, 0, 0, 0)
            await this.prefCardOptService.getPrefOptBySpeciality(this.selectedYear, this.selectedHalfYear, this.selectedQuarter, this.selectedMonth)
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_POU_PREF_OPT_BY_SPECIALTY>;
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.tdExports = false;
                        this.showSpecialityGrid = false;
                        this.lblResultCount = 0;
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found for the given search criteria' });
                        return;
                    } else if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.dvPrefOptBySpeciality = data.DataList;

                        if (this.dvPrefOptBySpeciality.length > 0) {

                            this.lblResultCount = this.dvPrefOptBySpeciality.length;

                            if (this.noOfRecords == 0) {
                                this.prefOptBySpecialityRows = this.dvPrefOptBySpeciality.length;
                            } else {
                                this.prefOptBySpecialityRows = this.noOfRecords;
                            }
                            sessionStorage.setItem('_DS', JSON.stringify(data.DataList));
                            this.showSpecialityGrid = true;
                            this.tdExports = true;
                        }

                    }
                    else if (this.statusCode == AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                        this.tdExports = false;
                        this.showSpecialityGrid = false;
                        this.lblResultCount = 0;
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Local DB select failed' });

                        return;
                    } else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                        this.tdExports = false;
                        this.showSpecialityGrid = false;
                        this.lblResultCount = 0;
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Failed to get speciality details' });

                        return;
                    }
                });
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async onSpecilaityItemClick(field: VM_POU_PREF_OPT_BY_SPECIALTY, event: any) {
        try {
            this.activeTab = "By Procedure";
            this.ctabs.filter(tab => tab.title == 'By Speciality')[0].active = false;
            this.ctabs.filter(tab => tab.title == 'By Procedure')[0].active = true;
            this.ctabs.filter(tab => tab.title == 'Optimization')[0].active = false;
            this.spinnerService.start();
            //this.showSpecialityGrid = false;
            //alert("second tab");  

            if (field != null) {
                //alert("" + field.SPECIALTY_CODE);
                this.lblSpeciality = field.SPECIALTY_CODE;
                this.lblSpecialityDesc = field.SPECIALTY_DESCRIPTION;
            }
            await this.bindPrefOptByProceduerGrid();
            //this.activeTab = 'By Procedure';
            //this.tabSpeciality = false;
            //this.tabProcedure = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onPhysicianItemClick(field: VM_POU_PREF_OPT_BY_PHYSICIAN, event: any) {
        //alert("second tab");
        this.activeTab = "Optimization";
        this.ctabs.filter(tab => tab.title == 'Optimization')[0].active = true;
        this.ctabs.filter(tab => tab.title == 'By Speciality')[0].active = false;
        this.ctabs.filter(tab => tab.title == 'By Procedure')[0].active = false;
        this.spinnerService.start();
        //this.activeTab = 'Optimization';
        //this.tabSpeciality = false;
        //this.tabProcedure = false;
        //this.tabOptimization = true;
        try {
            if (field != null) {
                this.lblPrefCardName = field.PREF_LIST_ID;
                this.lblProcedure = field.PROCEDURE_CODE;
                this.lblPhysician = field.PHYSICIAN_NAME;

                //await this.getPrefOptHeaderdetails(field);
                this.hdrDtlsParams = field;
                await this.bindPrefOptimizationGrid(field);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onProcedureGoClick() {
        try {

            this.spinnerService.start();
            this.statusCode = -1;
            this.msgs = [];
            this.prefOptDetailsData = [];

            //this.lblResultCount = 0;

            let returnValue: boolean = false;
            this.tdExports = false;

            returnValue = await this.validateFields();

            if (returnValue) {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });

                await this.getHQMDDValues();
                await this.bindPrefOptByProceduerGrid();
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }

        finally {
            this.spinnerService.stop();
        }
    }

    async onOptimizationGoClick() {
        try {

            this.spinnerService.start();
            this.statusCode = -1;
            this.msgs = [];

            this.lblOptRecsCount = 0;

            let returnValue: boolean = false;
            this.tdExports = false;

            returnValue = await this.validateFields();

            if (returnValue) {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });

                //await this.getHQMDDValues();           
                await this.bindPrefOptimizationGrid(this.hdrDtlsParams);
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }

        finally {
            this.spinnerService.stop();
        }
    }

    async bindPrefOptimizationGrid(field: VM_POU_PREF_OPT_BY_PHYSICIAN) {
        try {
            this.statusCode = -1;
            this.msgs = [];
            this.prefOptDetailsData = [];
            this.tempPrefOptDtlsData = [];
            this.lstDetails = [];
            this.prefOptHeaderData = new VM_POU_PREF_OPT_HEADER_DATA();
            this.showDynamictbl = false;
            this.lblOptRecsCount = 0;

            await this.initDefaultHeaderData();
            //await this.getServerIP();
            //await this.getSSLConfigDetails();
            let imgserverPath: string = '';
            //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/assets/images/';
            let upArrow: string = imgserverPath + "up.png";
            let downArrow: string = imgserverPath + "down.png";
            //await this.prefCardOptService.getPrefOptDetailsData("Ortho", "ORHPART2", "ROBERTJT", "HIPARJ", 2016, 0, 0, 2)
            await this.prefCardOptService.getPrefOptDetailsData(field.SPECIALTY_CODE, field.PROCEDURE_CODE, field.PHYSICIAN_ID, field.PREF_LIST_ID, this.OptRemoveValue, this.OptHoldValue1, this.OptHoldValue2, this.OptOpenValue, this.selectedYear, this.selectedHalfYear, this.selectedQuarter, this.selectedMonth)
                .catch(this.httpService.handleError)
                .then((response: Response) => {
                    let data = response.json() as AtParWebApiResponse<VM_POU_PREF_OPT_BY_PREFERENCE>;
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.tdExports = false;
                        this.showOptimizationGrid = false;
                        //this.lblResultCount = 0;
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                        return;
                    } else if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.tempPrefOptDtlsData = data.DataList;
                        //this.prefOptDetailsData = data.DataList;
                        if (this.tempPrefOptDtlsData.length > 0) {
                            this.lblOptRecsCount = this.tempPrefOptDtlsData.length;

                            for (let i = 0; i <= this.tempPrefOptDtlsData.length - 1; i++) {
                                this.tempPrefOptDtlsData[i].NET_CHANGE_OPEN_QTY = this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY - this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY;
                                this.tempPrefOptDtlsData[i].NET_CHANGE_HOLD_QTY = this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY - this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY;
                                this.tempPrefOptDtlsData[i].NET_CHANGE_OPEN_VALUE = (this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE) - (this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                this.tempPrefOptDtlsData[i].NET_CHANGE_HOLD_VALUE = (this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE) - (this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                this.tempPrefOptDtlsData[i].COLORCODE = ("leftCellBorder" + this.tempPrefOptDtlsData[i].COLORCODE).trim();

                                //this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE += (this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                //this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE += (this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                //this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE += (this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                //this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE += (this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                //this.prefOptHeaderData.CURRENT_OPEN_QTY += this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY;
                                //this.prefOptHeaderData.SUGGESTED_OPEN_QTY += this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY;
                                //this.prefOptHeaderData.CURRENT_HOLD_QTY += this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY;
                                //this.prefOptHeaderData.SUGGESTED_HOLD_QTY += this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY;

                                this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE += (this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE += (this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE += (this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE += (this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                this.prefOptHeaderData.CURRENT_OPEN_QTY += this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY;
                                this.prefOptHeaderData.SUGGESTED_OPEN_QTY += this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY;
                                this.prefOptHeaderData.CURRENT_HOLD_QTY += this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY;
                                this.prefOptHeaderData.SUGGESTED_HOLD_QTY += this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY;
                            }
                            //console.log(this.tempPrefOptDtlsData[1].COLORCODE);
                            //this.tempPrefOptDtlsData.forEach(item => {
                            //    item.NET_CHANGE_OPEN_QTY = item.SUGGESTED_OPEN_QTY - item.CURRENT_OPEN_QTY,
                            //        item.NET_CHANGE_HOLD_QTY = item.SUGGESTED_HOLD_QTY - item.CURRENT_HOLD_QTY,
                            //        item.NET_CHANGE_OPEN_VALUE = (item.SUGGESTED_OPEN_QTY * item.ITEM_PRICE) - (item.CURRENT_OPEN_QTY * item.ITEM_PRICE),
                            //        item.NET_CHANGE_HOLD_VALUE = (item.SUGGESTED_HOLD_QTY * item.ITEM_PRICE) - (item.CURRENT_HOLD_QTY * item.ITEM_PRICE),
                            //        item.COLORCODE = ("leftCellBorder" + item.COLORCODE).trim(),

                            //        this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE += (item.CURRENT_OPEN_QTY * item.ITEM_PRICE),
                            //        this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE += (item.SUGGESTED_OPEN_QTY * item.ITEM_PRICE),
                            //        this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE += (item.CURRENT_HOLD_QTY * item.ITEM_PRICE),
                            //        this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE += (item.SUGGESTED_HOLD_QTY * item.ITEM_PRICE),
                            //        this.prefOptHeaderData.CURRENT_OPEN_QTY += item.CURRENT_OPEN_QTY,
                            //        this.prefOptHeaderData.SUGGESTED_OPEN_QTY += item.SUGGESTED_OPEN_QTY,
                            //        this.prefOptHeaderData.CURRENT_HOLD_QTY += item.CURRENT_HOLD_QTY,
                            //        this.prefOptHeaderData.SUGGESTED_HOLD_QTY += item.SUGGESTED_HOLD_QTY
                            //}); 

                            this.prefOptHeaderData.NET_DIFF_OPEN_QTY = this.prefOptHeaderData.SUGGESTED_OPEN_QTY - this.prefOptHeaderData.CURRENT_OPEN_QTY;
                            this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE = this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE - this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE;
                            this.prefOptHeaderData.NET_DIFF_HOLD_QTY = this.prefOptHeaderData.SUGGESTED_HOLD_QTY - this.prefOptHeaderData.CURRENT_HOLD_QTY;
                            this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE = this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE - this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE;

                            this.prefOptHeaderData.CURRENT_OPEN_HOLD_TOTAL = this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE + this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE;
                            this.prefOptHeaderData.SUGGESTED_OPEN_HOLD_TOTAL = this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE + this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE;
                            this.prefOptHeaderData.NET_DIFF_TOTAL = this.prefOptHeaderData.SUGGESTED_OPEN_HOLD_TOTAL - this.prefOptHeaderData.CURRENT_OPEN_HOLD_TOTAL;

                            this.prefOptHeaderData.NET_DIFF_OPEN_QTY_IMG = (this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE > this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE) ? upArrow : downArrow;
                            this.prefOptHeaderData.NET_DIFF_HOLD_QTY_IMG = (this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE > this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE) ? upArrow : downArrow;
                            this.prefOptHeaderData.NET_DIFF_TOTAL_IMG = (this.prefOptHeaderData.SUGGESTED_OPEN_HOLD_TOTAL > this.prefOptHeaderData.CURRENT_OPEN_HOLD_TOTAL) ? upArrow : downArrow;

                            this.prefOptHeaderData.NET_DIFF_OPEN_QTY = (Math.sign(this.prefOptHeaderData.NET_DIFF_OPEN_QTY) == -1) ? Math.abs(this.prefOptHeaderData.NET_DIFF_OPEN_QTY) : this.prefOptHeaderData.NET_DIFF_OPEN_QTY;
                            this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE = (Math.sign(this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE) == -1) ? Math.abs(this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE) : this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE;
                            this.prefOptHeaderData.NET_DIFF_HOLD_QTY = (Math.sign(this.prefOptHeaderData.NET_DIFF_HOLD_QTY) == -1) ? Math.abs(this.prefOptHeaderData.NET_DIFF_HOLD_QTY) : this.prefOptHeaderData.NET_DIFF_HOLD_QTY;
                            this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE = (Math.sign(this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE) == -1) ? Math.abs(this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE) : this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE;
                            this.prefOptHeaderData.NET_DIFF_TOTAL = (Math.sign(this.prefOptHeaderData.NET_DIFF_TOTAL) == -1) ? Math.abs(this.prefOptHeaderData.NET_DIFF_TOTAL) : this.prefOptHeaderData.NET_DIFF_TOTAL;

                            if (this.noOfRecords == 0) {
                                this.prefOptimizeRows = this.tempPrefOptDtlsData.length;
                            } else {
                                this.prefOptimizeRows = this.noOfRecords;
                            }
                            this.prefOptDetailsData = this.tempPrefOptDtlsData;
                            this.lstDetails[0] = this.prefOptHeaderData;

                            sessionStorage.setItem('_optimizationDS', JSON.stringify(this.prefOptDetailsData));
                            sessionStorage.setItem('_prefOptHdrDataDS', JSON.stringify(this.prefOptHeaderData));
                            this.showDynamictbl = true;
                            this.showOptimizationGrid = true;
                            this.tdExports = true;
                        }
                    }
                    else if (this.statusCode == AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                        this.tdExports = false;
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Local DB select failed' });

                        return;
                    } else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                        this.tdExports = false;
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Failed to get Optimization details' });

                        return;
                    }
                });
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    SetLeftCellBorderColor(x, opt) {
        try {
            if (opt.COLORCODE == 'leftCellBorder1') {
                x.parentNode.parentNode.style.borderLeft = "10px solid black";
            }
            else if (opt.COLORCODE == 'leftCellBorder2') {
                x.parentNode.parentNode.style.borderLeft = "10px solid cornflowerblue";
            }
            else if (opt.COLORCODE == 'leftCellBorder3') {
                x.parentNode.parentNode.style.borderLeft = "10px solid red";
            }
            else if (opt.COLORCODE == 'leftCellBorder4') {
                x.parentNode.parentNode.style.borderLeft = "10px solid green";
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    async initDefaultHeaderData() {
        this.prefOptHeaderData.CURRENT_OPEN_QTY = 0;
        this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE = 0;
        this.prefOptHeaderData.CURRENT_HOLD_QTY = 0;
        this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE = 0;
        this.prefOptHeaderData.SUGGESTED_OPEN_QTY = 0;
        this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE = 0;
        this.prefOptHeaderData.SUGGESTED_HOLD_QTY = 0;
        this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE = 0;
        this.prefOptHeaderData.NET_DIFF_OPEN_QTY = 0;
        this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE = 0;
        this.prefOptHeaderData.NET_DIFF_HOLD_QTY = 0;
        this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE = 0;
        this.prefOptHeaderData.CURRENT_OPEN_HOLD_TOTAL = 0;
        this.prefOptHeaderData.SUGGESTED_OPEN_HOLD_TOTAL = 0;
        this.prefOptHeaderData.NET_DIFF_TOTAL = 0;
    }
    async bindPrefOptByProceduerGrid() {
        try {
            this.statusCode = -1;
            this.msgs = [];

            //let strDeptID: string = this.selectedDept;
            this.lstSpecialityFilterData = null;
            this.dvPrefOptByProcedure = [];
            this.lstProcedureDtls = [];

            //Cardiac
            //await this.prefCardOptService.getPrefOptByProcedure("Ortho", 2016, 0, 0, 0)
            await this.prefCardOptService.getPrefOptByProcedure(this.lblSpeciality, this.selectedYear, this.selectedHalfYear, this.selectedQuarter, this.selectedMonth)
                .catch(this.httpService.handleError)
                .then((response: Response) => {
                    let data = response.json() as AtParWebApiResponse<VM_POU_PREF_OPT_BY_PROCEDURE>;
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.tdExports = false;
                        this.showProcedureGrid = false;
                        this.lblProcRowCount = 0;
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                        return;
                    } else if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.dvPrefOptByProcedure = data.DataList;
                        //this.dvPrefOptByProcedure.forEach(x => x.ISSHOW = false);
                        if (this.dvPrefOptByProcedure.length > 0) {
                            this.lblProcRowCount = this.dvPrefOptByProcedure.length;

                            if (this.noOfRecords == 0) {
                                this.prefOptByProcRows = this.dvPrefOptByProcedure.length;
                            } else {
                                this.prefOptByProcRows = this.noOfRecords;
                            }
                        }

                    }
                    else if (this.statusCode == AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                        this.tdExports = false;
                        this.showProcedureGrid = false;
                        this.lblProcRowCount = 0;
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Local DB select failed' });

                        return;
                    } else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                        this.tdExports = false;
                        this.showProcedureGrid = false;
                        this.lblProcRowCount = 0;
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Failed to get procedure details' });

                        return;
                    }
                });

            if (this.dvPrefOptByProcedure.length > 0) {
                sessionStorage.setItem('_procDS', JSON.stringify(this.dvPrefOptByProcedure));
                this.showProcedureGrid = true;
                this.tdExports = true;
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async onProcedureItemClick(rowData: VM_POU_PREF_OPT_BY_PROCEDURE, event: any) {
        this.msgs = [];
        this.lstPhysicianDetails = [];
        //this.SHOW_PHYSICIAN_GRID = false;
        this.dvPrefOptByProcedure = JSON.parse(sessionStorage.getItem('_procDS')) as VM_POU_PREF_OPT_BY_PROCEDURE[];
        let index1 = this.dvPrefOptByProcedure.findIndex(x => x.SPECIALTY_CODE == rowData.SPECIALTY_CODE && x.PROCEDURE_CODE == rowData.PROCEDURE_CODE && x.EFFICIENCY_PERCENTAGE == rowData.EFFICIENCY_PERCENTAGE && x.NO_OF_PROCEDURES == rowData.NO_OF_PROCEDURES && x.NO_OF_PREF_LISTS == rowData.NO_OF_PREF_LISTS);
        var exists = false;
        let expandedRowIndex: number = -1;

        try {
            if (rowData != null) {
                this.expandedItems.forEach(m => {
                    //if (m == this.dvPrefOptByProcedure[index1]) exists = true;
                    if (m.SPECIALTY_CODE == this.dvPrefOptByProcedure[index1].SPECIALTY_CODE && m.PROCEDURE_CODE == this.dvPrefOptByProcedure[index1].PROCEDURE_CODE
                        && m.EFFICIENCY_PERCENTAGE == this.dvPrefOptByProcedure[index1].EFFICIENCY_PERCENTAGE && m.NO_OF_PROCEDURES == this.dvPrefOptByProcedure[index1].NO_OF_PROCEDURES
                        && m.NO_OF_PREF_LISTS == this.dvPrefOptByProcedure[index1].NO_OF_PREF_LISTS) {
                        exists = true;
                        expandedRowIndex = this.expandedItems.indexOf(m);
                    }
                });

                if (exists && expandedRowIndex !== -1) {
                    //this.expandedItems.pop(this.dvPrefOptByProcedure[index1]);
                    this.expandedItems.splice(expandedRowIndex, 1);
                }
                else {
                    await this.getPhysicianDetails(rowData, index1);
                    this.expandedItems.push(this.dvPrefOptByProcedure[index1]);
                }

            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async getPhysicianDetails(rowData: VM_POU_PREF_OPT_BY_PROCEDURE, index1: number) {
        await this.prefCardOptService.getPrefOptByPhysician(rowData.SPECIALTY_CODE, rowData.PROCEDURE_CODE, this.selectedYear, this.selectedHalfYear, this.selectedQuarter, this.selectedMonth)
            .catch(this.httpService.handleError)
            .then((response: Response) => {
                let data = response.json() as AtParWebApiResponse<VM_POU_PREF_OPT_BY_PHYSICIAN>;
                this.statusCode = data.StatusCode;
                if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    return;
                } else if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                    this.lstPhysicianDetails = data.DataList;
                    if (this.lstPhysicianDetails.length > 0) {
                        this.dvPrefOptByProcedure[index1].PHYSICIAN_DETAILS = this.lstPhysicianDetails;
                        this.dvPrefOptByProcedure[index1].SHOW_PHYSICIAN_GRID = true;
                        sessionStorage.setItem('_procDS', JSON.stringify(this.dvPrefOptByProcedure));
                    }
                }
                else if (this.statusCode == AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                    //this.SHOW_PHYSICIAN_GRID = false;
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Local DB select failed' });

                    return;
                } else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Failed to get physician details' });
                    //this.SHOW_PHYSICIAN_GRID = false;
                    return;
                }
            });
    }
    async enableSelectedTab(event: any) {
        try {
            this.ctab = event.tab;
            this.ctabs = event.tabs;
            //if (this.isPostback) {
            //    this.spinnerService.start();
            //if (event != null) {
            //    this.activeTab = event.title;
            //}
            //this.lblResultCount = 0;
            this.msgs = [];
            //if (this.activeTab.trim() == 'By Speciality') {
            if (event.tab.title == 'By Speciality') {
                this.activeTab = "By Speciality";
                //this.tabSpeciality = true;
                //this.tabProcedure = false;

                if (this.dvPrefOptBySpeciality != null && this.dvPrefOptBySpeciality.length > 0) {
                    this.showSpecialityGrid = true;
                    this.tdExports = true;
                }
                else {
                    this.showSpecialityGrid = false;
                    this.tdExports = false;
                }

                //if (await this.validateFields()) {
                //    //await this.bindPrefOptBySummaryGrid();                       
                //}
                //else {
                //    this.showSpecialityGrid = false;
                //    this.tdExports = false;
                //}
            }
            else if (event.tab.title == 'By Procedure') {

                if (this.dvPrefOptByProcedure != null && this.dvPrefOptByProcedure.length > 0) {
                    this.activeTab = "By Procedure";
                    this.showProcedureGrid = true;
                    this.tdExports = true;
                    if (event.tabs != null) {
                        this.ctab = event.tabs.filter(tab => tab.title == 'By Procedure')[0];
                    }
                    event.tabs.filter(tab => tab.title == 'By Speciality')[0].active = false;
                    event.tabs.filter(tab => tab.title == 'Optimization')[0].active = false;
                }
                else {
                    this.activeTab = "By Speciality";
                    if (this.dvPrefOptBySpeciality != null && this.dvPrefOptBySpeciality.length > 0) {
                        this.showSpecialityGrid = true;
                        this.tdExports = true;
                        if (event.tabs != null) {
                            this.ctab = event.tabs.filter(tab => tab.title == 'By Speciality')[0];
                        }
                        event.tabs.filter(tab => tab.title == 'By Procedure')[0].active = false;
                        event.tabs.filter(tab => tab.title == 'Optimization')[0].active = false;
                    }
                    else {
                        this.showSpecialityGrid = false;
                        this.tdExports = false;
                    }

                }

            }
            else if (event.tab.title == 'Optimization') {

                if (this.prefOptDetailsData != null && this.prefOptDetailsData.length > 0) {
                    this.activeTab = "Optimization";
                    this.showOptimizationGrid = true;
                    this.tdExports = true;
                    if (event.tabs != null) {
                        this.ctab = event.tabs.filter(tab => tab.title == 'Optimization')[0];
                    }
                    event.tabs.filter(tab => tab.title == 'By Speciality')[0].active = false;
                    event.tabs.filter(tab => tab.title == 'By Procedure')[0].active = false;
                }
                else if (this.activeTab == "By Procedure" && this.prefOptDetailsData.length == 0) {
                    if (this.dvPrefOptByProcedure != null && this.dvPrefOptByProcedure.length > 0) {
                        this.activeTab = "By Procedure";
                        this.tdExports = true;
                        if (event.tabs != null) {
                            this.ctab = event.tabs.filter(tab => tab.title == 'By Procedure')[0];
                        }
                        event.tabs.filter(tab => tab.title == 'By Speciality')[0].active = false;
                        event.tabs.filter(tab => tab.title == 'Optimization')[0].active = false;
                    }
                }
                else if (this.activeTab == "By Speciality" && this.prefOptDetailsData.length == 0) {
                    this.activeTab = "By Speciality";
                    if (this.dvPrefOptBySpeciality != null && this.dvPrefOptBySpeciality.length > 0) {
                        this.showSpecialityGrid = true;
                        this.tdExports = true;

                        this.ctab = event.tabs.filter(tab => tab.title == 'By Speciality')[0];
                        event.tabs.filter(tab => tab.title == 'By Procedure')[0].active = false;
                        event.tabs.filter(tab => tab.title == 'Optimization')[0].active = false;
                    }
                    else {
                        this.showOptimizationGrid = false;
                        this.tdExports = false;
                    }
                }

            }
            if (event != null) {
                //this.ctab.active = true;                
                this.ctab = event.tabs.filter(tab => tab.title == this.activeTab)[0];
                this.ctab.active = true;
                if (event.tabs != null && this.tabs == null) {
                    this.tabs = event.tabs;
                }
            }
            //} else {
            //    this.isPostback = true;
            //}

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async validateFields() {
        try {
            this.msgs = [];
            if (this.selectedRange == null || this.selectedRange.toString() == '' || this.selectedRange == '8' || this.selectedYear == null || this.selectedYear.toString() == '' || this.selectedYear == 'Select Year') {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select all the fields' });
                return false;
            }
            else if ((this.selectedRange != '0') && (this.selectedHQM == null || this.selectedHQM.toString() == '' || this.selectedHQM == 'Select Value')) {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select Half Year/Quarter/Month' });
                return false;
            }
            return true;

        } catch (ex) {
            this.clientErrorMsg(ex);
            return false;
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
            saveAs(blob, "POUPreferenceCardOptimizationReport.xls");
            //if (html != '' && html != null) {
            //    var a = document.createElement('a');
            //    var data_type = 'data:application/vnd.ms-excel';
            //    html = html.replace(/ /g, '%20');
            //    a.href = data_type + ', ' + html;
            //    a.download = 'POUPreferenceCardOptimizationReport.xls';
            //    a.click();
            //}
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }
    async getServerIP() {
        let htmlBuilder: string = '';
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
    }
    async getSSLConfigDetails() {
        let htmlBuilder: string = '';
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
    }
    async exportReportDetails(reqType: string) {
        let htmlBuilder: string = '';
        try {
            this.statusCode = -1;
            this.msgs = [];
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;
            let _DS: VM_POU_PREF_OPT_BY_SPECIALTY[] = [];
            let _procDS: VM_POU_PREF_OPT_BY_PROCEDURE[] = [];
            let _optimizeDS: VM_POU_PREF_OPT_BY_PREFERENCE[] = [];
            let _OptHdrData: VM_POU_PREF_OPT_HEADER_DATA;

            let imgserverPath: string = '';

            await this.getServerIP();

            await this.getSSLConfigDetails();

            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';


            let title: string = '""' + "AtparVersion 2.8" + '""';

            if (this.activeTab == 'By Speciality') {
                _DS = await JSON.parse(sessionStorage.getItem('_DS')) as VM_POU_PREF_OPT_BY_SPECIALTY[];

                htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

                if (reqType == 'Print') {
                    htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + "'" + imgserverPath + 'logo.jpg' + "'" + "title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                        + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=5 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";

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
                        + "<tr><td colspan=3 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";
                }

                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center rowspan=3 width=12% nowrap><span class=c3><b>Speciality</b></span></td>"
                    + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>No. of Procedures</b></span></td>"
                    + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>No. of Preference Cards</b></span></td>"
                    + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>Efficiency</b></span></td>"
                    + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Picked</b></span></td>"
                    + "<td align=center colspan=4 width=20% nowrap><span class=c3><b>Total Issued during case</b></span></td>"
                    + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Returns</b></span></td>"
                    + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Opened/ Unused</b></span></td>"
                    + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>Total Usage</b></span></td>"
                    + "</tr>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                    + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Existing</b></span></td>"
                    + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>New</b></span></td>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                    + "</tr>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                    + "</tr>";

                await _DS.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap><span class=c3>" + header.SPECIALTY_CODE + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NO_OF_PREF_LISTS.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + header.EFFICIENCY_PERCENTAGE.toFixed(1) + "%" + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.TOTAL_PICKED_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right ><span class=c3>" + this.transform(header.TOTAL_PICKED_VALUE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.TOTAL_ISSUED_EXISTING_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_ISSUED_EXISTING_VALUE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.TOTAL_ISSUED_NEW_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_ISSUED_NEW_VALUE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.TOTAL_RETURN_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_RETURN_VALUE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=center ><span class=c3>" + header.TOTAL_WASTED_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_WASTED_VALUE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform( header.TOTAL_USAGE.toLocaleString('en-US')) + "</span></td>"

                        + "</tr>";

                });

                htmlBuilder += "</table></Table>";

            }
            else if (this.activeTab == 'By Procedure') {
                _procDS = await JSON.parse(sessionStorage.getItem('_procDS')) as VM_POU_PREF_OPT_BY_PROCEDURE[];

                htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top style='overflow:hidden;'>";

                if (reqType == 'Print') {
                    htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                        + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=5 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";

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
                        + "<tr><td colspan=3 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";
                }

                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<table width=100% style='border:none; margin-bottom:15px;'>"
                    + "<tr>"
                    + "<td>Range:</td>"
                    + "<td style='font-weight:bold !important'>" + this.lblSelectedRange + "</td>"
                    + "<td>Year:</td>"
                    + "<td style='font-weight:bold !important'>" + this.selectedYear + "</td>"
                    + "<td>Specialty:</td>"
                    + "<td style='font-weight:bold !important'>" + this.lblSpecialityDesc + "&nbsp;(" + this.lblSpeciality + ")</td>"
                    + "<td>" + this.lblSelectedHQM + "</td>"
                    + "<td style='font-weight:bold !important'>" + this.strSelectedHQM + "</td>"
                    + "</tr></table>"
                    + "</td></tr>";

                //htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                htmlBuilder += "<tr><td colspan=2> "
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center rowspan=3 width=11% nowrap><span class=c3><b>Procedure Code</b></span></td>"
                    + "<td align=center rowspan=3 width=11% nowrap><span class=c3><b>Procedure Description</b></span></td>"
                    + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b># of Physicians</b></span></td>"
                    + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b># of Procedures</b></span></td>"
                    + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b># of Preference Cards</b></span></td>"
                    + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b>Efficiancy</b></span></td>"
                    + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Picked</b></span></td>"
                    + "<td align=center colspan=4 width=20% nowrap><span class=c3><b>Total Issued during case</b></span></td>"
                    + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Returns</b></span></td>"
                    + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Opened/ Unused</b></span></td>"
                    + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>Total Usage</b></span></td>"
                    + "</tr>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                    + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Existing</b></span></td>"
                    + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>New</b></span></td>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                    + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                    + "</tr>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                    + "</tr>";

                await _procDS.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap><span class=c3>" + header.PROCEDURE_CODE + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.PROCEDURE_DESCRIPTION + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NO_OF_PHYSICIANS.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NO_OF_PREF_LISTS.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + header.EFFICIENCY_PERCENTAGE.toFixed(1) + "%" + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.TOTAL_PICKED_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right ><span class=c3>" + this.transform(header.TOTAL_PICKED_VALUE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.TOTAL_ISSUED_EXISTING_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_ISSUED_EXISTING_VALUE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.TOTAL_ISSUED_NEW_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_ISSUED_NEW_VALUE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.TOTAL_RETURN_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_RETURN_VALUE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=center ><span class=c3>" + header.TOTAL_WASTED_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_WASTED_VALUE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_USAGE.toLocaleString('en-US')) + "</span></td>"

                        + "</tr>";

                    if (header.hasOwnProperty("PHYSICIAN_DETAILS")) {
                        if (header.PHYSICIAN_DETAILS != null && header.PHYSICIAN_DETAILS.length > 0) {
                            htmlBuilder += "<tr>"
                                + "<td colspan=17>"
                                + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse; margin:10px;" + "" + " border=1>"
                                + "<tr bgcolor=#E0E0E0>"
                                + "<td align=center rowspan=3 width=11% nowrap><span class=c3><b>Physician Name</b></span></td>"
                                + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b># of Procedures</b></span></td>"
                                + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b>Preference Card Name</b></span></td>"
                                + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b>Efficiancy</b></span></td>"
                                + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Picked</b></span></td>"
                                + "<td align=center colspan=4 width=20% nowrap><span class=c3><b>Total Issued during case</b></span></td>"
                                + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Returns</b></span></td>"
                                + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Opened/ Unused</b></span></td>"
                                + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>Total Usage</b></span></td>"
                                + "</tr>"
                                + "<tr bgcolor=#d3d3d3>"
                                + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                                + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                                + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Existing</b></span></td>"
                                + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>New</b></span></td>"
                                + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                                + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                                + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                                + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                                + "</tr>"
                                + "<tr bgcolor=#d3d3d3>"
                                + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                                + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                                + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                                + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                                + "</tr>";

                            header.PHYSICIAN_DETAILS.forEach(details => {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + details.PHYSICIAN_NAME + "</span></td>"
                                    + "<td align=center nowrap><span class=c3>" + details.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + details.PREF_LIST_ID + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + details.EFFICIENCY_PERCENTAGE.toFixed(1) + "%" + "</span></td>"
                                    + "<td align=center nowrap><span class=c3>" + details.TOTAL_PICKED_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right ><span class=c3>" + this.transform(details.TOTAL_PICKED_VALUE.toLocaleString('en-US')) + "</span></td>"
                                    + "<td align=center nowrap><span class=c3>" + details.TOTAL_ISSUED_EXISTING_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + this.transform(details.TOTAL_ISSUED_EXISTING_VALUE.toLocaleString('en-US')) + "</span></td>"
                                    + "<td align=center nowrap><span class=c3>" + details.TOTAL_ISSUED_NEW_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + this.transform( details.TOTAL_ISSUED_NEW_VALUE.toLocaleString('en-US')) + "</span></td>"
                                    + "<td align=center nowrap><span class=c3>" + details.TOTAL_RETURN_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + this.transform(details.TOTAL_RETURN_VALUE.toLocaleString('en-US')) + "</span></td>"
                                    + "<td align=center ><span class=c3>" + details.TOTAL_WASTED_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + this.transform( details.TOTAL_WASTED_VALUE.toLocaleString('en-US')) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + this.transform(details.TOTAL_USAGE.toLocaleString('en-US')) + "</span></td>"

                                    + "</tr>";
                            });
                            htmlBuilder += "</table></td></tr>";

                        }
                    }
                    else {
                    }


                });

                htmlBuilder += "</table></Table>";
            }
            else if (this.activeTab == 'Optimization') {
                _OptHdrData = new VM_POU_PREF_OPT_HEADER_DATA();
                _optimizeDS = await JSON.parse(sessionStorage.getItem('_optimizationDS')) as VM_POU_PREF_OPT_BY_PREFERENCE[];
                _OptHdrData = await JSON.parse(sessionStorage.getItem('_prefOptHdrDataDS')) as VM_POU_PREF_OPT_HEADER_DATA;
                let _isPrintRequest: boolean = false;
                let _isExcelRequest: boolean = false;
                let colspanTwo: string = '1';

                htmlBuilder = "<div style='width:90%;;'><Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top margin-left:5px;>";

                if (reqType == 'Print') {
                    _isPrintRequest = true;
                    htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                        + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=5 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";

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
                        + "<tr><td colspan=3 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";
                }

                _isExcelRequest = (reqType == 'Excel') ? true : false;
                colspanTwo = (reqType == 'Excel') ? '2' : '1';

                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<div style='margin-bottom:20px; margin-top:10px; width:100%'>"
                    + "<table width='100%' style='border:none; border-spacing:0px;'>"
                    + "<tr>";
                if (_isExcelRequest) {
                    htmlBuilder += "<td width=10></td>";
                }
                htmlBuilder += "<td width='150'><label>Procedure Code:</label></td>"
                    + "<td width='200'><strong>" + this.lblProcedure + "</strong></td>"
                    + "<td width='150'><label>Range:</label></td>"
                    + "<td width='200'><strong>" + this.lblSelectedRange + "</strong></td>"
                    + "<td width='150' style='border-left:1px solid #ccc;padding-left:6px;'><label> Remove: </label></td>"
                    + "<td colspan=" + colspanTwo + ">"
                    + "<table style='border:none;'>"
                    + "<tr>";
                if (!_isExcelRequest) {
                    htmlBuilder += "<td><img src=" + "'" + this.lessImg + "'" + "/></td>";
                }
                if (_isExcelRequest) {
                    htmlBuilder +="<td>"
                        + "<b>" + this.OptRemoveValue + "</b>"
                        + "</td>";
                }
                else {
                    htmlBuilder += "<td>"
                        + "<input value=" + this.OptRemoveValue + " name='txtRemove' id='RemoveId' style='width:50px;margin-left:-3px;' type='text' class='form-control'>"
                        + "</td>";
                }
                htmlBuilder += "<td><b>&nbsp;% </b></td>"
                    + "</tr>"
                    + "</table>"
                    + "</td>"
                    + "</tr>"
                    + "<tr style='background-color:none;'>";
                if (_isExcelRequest) {
                    htmlBuilder += "<td width=10></td>";
                }

                htmlBuilder += "<td width='150'><label>Preference Card Name:</label></td>"
                    + "<td width='200'><strong>" + this.lblPrefCardName + "</strong></td>"
                    + "<td width='150'><label>Year:</label></td>"
                    + "<td width='200'><strong>" + this.selectedYear + "</strong></td>"
                    + "<td width='150' style='border-left:1px solid #ccc;padding-left:6px;'><label> Add to Hold:</label></td>"
                    + "<td colspan=" + colspanTwo + ">"
                    + "<table style='border:none;'>"
                    + "<tr>";
                if (!_isExcelRequest) {
                    htmlBuilder += "<td style='padding-top:2px;'><img src= " + "'" + this.addToHoldImg + "'" + "/></td>";
                }
                if (_isExcelRequest) {
                    htmlBuilder += "<td>"
                        + "<b>" + this.OptHoldValue1 + "</b>"
                        + "</td>"
                        + "<td style='padding-left:2px; padding-right:2px;'><label><b>&nbsp;-&nbsp;</b></label></td>"
                        + "<td><b>" + this.OptHoldValue2 + "</b></td>";
                }
                else {
                    htmlBuilder += "<td><input value=" + this.OptHoldValue1 + " name='txtHold1' id='HoldId1' style='width:50px;margin-left:-3px;' type='text' class='form-control'></td>"
                        + "<td style='padding-left:2px; padding-right:2px;'><label><b>&nbsp;-&nbsp;</b></label></td>"
                        + "<td><input value=" + this.OptHoldValue2 + " [name]='txtHold2 ' id='HoldId2' style='width:50px;margin-left:-2px;' type='text' class='form-control'></td>";
                }
                htmlBuilder += "<td><label><b>&nbsp;% </b></label></td>"
                    + "</tr>"
                    + "</table>"
                    + "</td>"
                    + "</tr>"
                    + "<tr>";

                if (_isExcelRequest) {
                    htmlBuilder += "<td width=10></td>";
                }
                htmlBuilder += "<td width='150'><label>Physician Name:</label></td>"
                    + "<td width='200'><strong>" + this.lblPhysician + "</strong></td>"
                    + "<td width='150'><label>" + this.lblSelectedHQM + "</label></td>"
                    + "<td width='200'><strong>" + this.strSelectedHQM + "</strong></td>"
                    + "<td width='150' style='border-left:1px solid #ccc;padding-left:6px;'><label>Add to Open: </label></td>"
                    + "<td colspan=" + colspanTwo + ">"
                    + "<table style='border:none;'>"
                    + "<tr>";
                if (!_isExcelRequest) {
                    htmlBuilder += "<td><img src=" + "'" + this.greaterImg + "'" + "/></td>";
                }
                if (_isExcelRequest) {
                    htmlBuilder += "<td>"
                        + "<b>" + this.OptOpenValue + "</b>"
                        + "</td>";
                }
                else {
                    htmlBuilder += "<td> <input value=" + this.OptOpenValue + " name='txtOpen' id='OpenId' style='width:50px;margin-left:-3px;' type='text ' class='form-control'></td>";
                }
                htmlBuilder += "<td><label><b>&nbsp;% </b></label></td>"
                    + "</tr>"
                    + "</table>"
                    + " </td>"
                    + "</tr>"
                    + "</table>"
                    + "</div>"
                    + "</td></tr>";
                if (_isExcelRequest) {
                    htmlBuilder += "<tr height=30><td colspan= 2></td></tr>";
                }

                //htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                htmlBuilder += "<tr><td colspan=2>"
                    + "<div style='margin-bottom:20px; margin-top:20px; width:100%'>"
                    + "<table id='tblDynamic' border=1 style= 'border:1px solid black;  width:100%; border-collapse:collapse;'>"
                    + "<thead>"
                    + "<tr>";
                if (_isExcelRequest) {
                    htmlBuilder += "<th width=10></th>";
                }
                htmlBuilder += "<th style='width:25%;'></th>"
                    + "<th style='width:25%;' colspan=2> Open Items" + "</th>"
                    + "<th style='width:25%;' colspan=2> Hold Items" + "</th>"
                    + "<th style='width:25%;'> Total" + " </th>"
                    + "</tr>"
                    + "</thead>"
                    + "<tbody>"
                    + "<tr>";
                if (_isExcelRequest) {
                    htmlBuilder += "<td width=10></td>";
                }
                htmlBuilder += "<td>Current" + " </td>"
                    + "<td align='center' style=" + "'" + "text-align:center!important;padding-right:3px;" + "'" + " >" + _OptHdrData.CURRENT_OPEN_QTY.toLocaleString('en-US') + "</td>"
                    + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + "$" + _OptHdrData.CURRENT_OPEN_QTY_PRICE.toLocaleString('en-US') + "  &nbsp; </td>"
                    + "<td align='center' style=" + "'" + "text-align:center!important;padding-right:3px;" + "'" + " >" + _OptHdrData.CURRENT_HOLD_QTY.toLocaleString('en-US') + "</td>"
                    + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + "$" + _OptHdrData.CURRENT_HOLD_QTY_PRICE.toLocaleString('en-US') + " &nbsp; </td>"
                    + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + "$" + _OptHdrData.CURRENT_OPEN_HOLD_TOTAL.toLocaleString('en-US') + " &nbsp; </td>"
                    + "</tr>"
                    + "<tr>";
                if (_isExcelRequest) {
                    htmlBuilder += "<td width=10></td>";
                }
                htmlBuilder += "<td>Optimized " + "</td>"
                    + "<td align='center' style=" + "'" + "text-align:center!important;padding-right:3px;" + "'" + " >" + _OptHdrData.SUGGESTED_OPEN_QTY.toLocaleString('en-US') + "</td>"
                    + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + "$" + _OptHdrData.SUGGESTED_OPEN_QTY_PRICE.toLocaleString('en-US') + "  &nbsp; </td>"
                    + "<td align='center' style=" + "'" + "text-align:center!important;padding-right:3px;" + "'" + " >" + _OptHdrData.SUGGESTED_HOLD_QTY.toLocaleString('en-US') + "</td>"
                    + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + "$" + _OptHdrData.SUGGESTED_HOLD_QTY_PRICE.toLocaleString('en-US') + " &nbsp; </td>"
                    + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + "$" + _OptHdrData.SUGGESTED_OPEN_HOLD_TOTAL.toLocaleString('en-US') + " &nbsp; </td>"
                    + "</tr>"
                    + "<tr style=" + "font- weight:bold;" + ">";
                if (_isExcelRequest) {
                    htmlBuilder += "<td width=10></td><td>Net Difference </td>"
                        + "<td align='center'>" + _OptHdrData.NET_DIFF_OPEN_QTY.toLocaleString('en-US') + "</td>"
                        + "<td align='right'>" + _OptHdrData.NET_DIFF_OPEN_QTY_PRICE.toLocaleString('en-US') + "  &nbsp;&nbsp;<span><img src=" + "'" + _OptHdrData.NET_DIFF_OPEN_QTY_IMG + "'" + "/></span> </td>"
                        + "<td align='center'>" + _OptHdrData.NET_DIFF_HOLD_QTY.toLocaleString('en-US') + "</td>"
                        + "<td align='right'>" + "$" + _OptHdrData.NET_DIFF_HOLD_QTY_PRICE.toLocaleString('en-US') + " &nbsp;&nbsp;<span><img src=" + "'" + _OptHdrData.NET_DIFF_HOLD_QTY_IMG + "'" + "/></span> </td>"
                        + "<td align='right'>" + "$" + _OptHdrData.NET_DIFF_TOTAL.toLocaleString('en-US') + " &nbsp;&nbsp;<span><img src=" + "'" + _OptHdrData.NET_DIFF_TOTAL_IMG + "'" + "/></span> </td>";
                }
                else {
                    htmlBuilder += "<td>Net Difference </td>"
                        + "<td align='center' style=" + "'" + "text-align:center!important;padding-right:3px;" + "'" + ">" + _OptHdrData.NET_DIFF_OPEN_QTY.toLocaleString('en-US') + "</td>"
                        + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + "><span><img src=" + "'" + _OptHdrData.NET_DIFF_OPEN_QTY_IMG + "'" + "/></span>" + "$" + _OptHdrData.NET_DIFF_OPEN_QTY_PRICE.toLocaleString('en-US') + "  &nbsp; </td>"
                        + "<td align='center' style=" + "'" + "text-align:center!important;padding-right:3px;" + "'" + ">" + _OptHdrData.NET_DIFF_HOLD_QTY.toLocaleString('en-US') + "</td>"
                        + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + "><span><img src=" + "'" + _OptHdrData.NET_DIFF_HOLD_QTY_IMG + "'" + "/></span>" + "$" + _OptHdrData.NET_DIFF_HOLD_QTY_PRICE.toLocaleString('en-US') + " &nbsp; </td>"
                        + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + "><span><img src=" + "'" + _OptHdrData.NET_DIFF_TOTAL_IMG + "'" + "/></span>" + "$" + _OptHdrData.NET_DIFF_TOTAL.toLocaleString('en-US') + " &nbsp; </td>";
                }
                htmlBuilder += "</tr>"
                    + "</tbody></table></div>"
                    + "</td></tr>";

                var ex = document.getElementById("tble").innerHTML;

                if (_isPrintRequest) {
                    htmlBuilder += "<tr></tr><tr><td colspan=2>"
                        + "<div>"
                        + "<table id='tblColor' align=center width=100% style='BORDER-COLLAPSE:collapse;' border=1>"
                        + "<tr>"
                        + "<td border=1 width=25%> <div style='background:#008000; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New&nbsp;Items </div> </td>"
                        + "<td border=1 width=25%> <div style=" + "'" + "background: #ff0000; width:10; height:10; outline:none; text-align:center; margin:;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delete&nbsp;Items</div></td>"
                        + "<td border=1 width=25%> <div style=" + "'" + "background:#1a7fc7; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Move&nbsp;to&nbsp;hold </div></td>"
                        + "<td border=1 width=25%> <div style=" + "'" + "background:#000000; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No&nbsp;Change </div></td>"
                        + "</tr>"
                        + "</table></div></td></tr>";
                }
                else {
                    htmlBuilder += "<tr></tr><tr><td colspan=2>"
                        + "<div>"
                        + "<table id='tblColor' align=center width=100% style='BORDER-COLLAPSE:collapse;' border=1>"
                        + "<tr>";
                    if (_isExcelRequest) {
                        htmlBuilder += "<td width=10></td>";
                    }
                    htmlBuilder += "<td border=1 colspan='2' style='background:#008000; color:white;'> <div style='background:#008000; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New&nbsp;Items </div> </td>"
                        + "<td border=1 colspan='3' style='background:#ff0000; color:white;'> <div style=" + "'" + "background: #ff0000; width:10; height:10; outline:none; text-align:center; margin:;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delete&nbsp;Items</div></td>"
                        + "<td border=1 colspan='3' style='background:#1a7fc7; color:white;'> <div style=" + "'" + "background:#1a7fc7; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Move&nbsp;to&nbsp;hold </div></td>"
                        + "<td border=1 colspan='6' style='background:#000000; color:white;'> <div style=" + "'" + "background:#000000; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No&nbsp;Change </div></td>"
                        + "</tr>"
                        + "</table></div></td></tr>";
                }
                htmlBuilder += "<tr><td colspan=2>"
                    + "<div>"
                    + "<table align=center width=100% style='BORDER-COLLAPSE:collapse;' border=1>"
                    + "<tr bgcolor=#d3d3d3>";
                if (_isExcelRequest) {
                    htmlBuilder += "<td width=10 style='background:none;'></td>";
                }
                htmlBuilder += "<td align=center rowspan=2 width=10% nowrap><span class=c3><b>Item Id</b></span></td>"
                    + "<td align=center rowspan=2 width=15% nowrap><span class=c3><b>Item Description</b></span></td>"
                    + "<td align=center rowspan=2 width=10% nowrap><span class=c3><b>Item Cost</b></span></td>"
                    + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Current Quantity</b></span></td>"
                    + "<td align=center colspan=3 width=15% nowrap><span class=c3><b>Usage</b></span></td>"
                    + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Suggested Pref Qty</b></span></td>"
                    + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Net Change(Qty)</b></span></td>"
                    + "<td align=center colspan=2 width=20% nowrap><span class=c3><b>Net Change($)</b></span></td>"
                    + "</tr>"
                    + "<tr bgcolor=#d3d3d3>";
                if (_isExcelRequest) {
                    htmlBuilder += "<td width=10 style='background:none;'></td>";
                }
                htmlBuilder += "<td align=center width=5% nowrap><span class=c3><b>Open</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Hold</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Max</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Min</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Mean</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Open Qty</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Hold Qty</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Open</b></span></td>"
                    + "<td align=center width=5% nowrap><span class=c3><b>Hold</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>Open</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>Hold</b></span></td>"
                    + "</tr>";

                await _optimizeDS.forEach(header => {
                    let leftCellBorder: string = '';
                    try {
                        if (header.COLORCODE == 'leftCellBorder1') {
                            leftCellBorder = "10px solid black";
                        }
                        else if (header.COLORCODE == 'leftCellBorder2') {
                            leftCellBorder = "10px solid cornflowerblue";
                        }
                        else if (header.COLORCODE == 'leftCellBorder3') {
                            leftCellBorder = "10px solid red";
                        }
                        else if (header.COLORCODE == 'leftCellBorder4') {
                            leftCellBorder = "10px solid green";
                        }
                    }
                    catch (ex) {
                        this.clientErrorMsg(ex);
                    }
                    htmlBuilder += "<tr>";
                    if (_isExcelRequest) {
                        htmlBuilder += "<td width=10></td>";
                    }
                    htmlBuilder += "<td align=right nowrap style=" + "'" + "border-left:" + leftCellBorder + "'" + "><span class=c3>" + header.ITEM_ID + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.ITEM_DESCRIPTION + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + "$" + header.ITEM_PRICE.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.CURRENT_OPEN_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.CURRENT_HOLD_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center ><span class=c3>" + header.MAX_USAGE.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.MIN_USAGE.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + header.MEAN_USAGE.toFixed(1) + "%" + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.SUGGESTED_OPEN_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.SUGGESTED_HOLD_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NET_CHANGE_OPEN_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NET_CHANGE_HOLD_QTY.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right ><span class=c3>" + "$" + header.NET_CHANGE_OPEN_VALUE.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + "$" + header.NET_CHANGE_HOLD_VALUE.toLocaleString('en-US') + "</span></td>"
                        + "</tr>";
                    + "</table></div></td></tr>";

                });

                htmlBuilder += "</Table>";

            }


            return await htmlBuilder;


        }
        catch (ex) {
            htmlBuilder = '';
            this.clientErrorMsg(ex);
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
            this.msgs = [];

            if (html != '' && html != null) {
                await this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Preference Card Optimization Report', JSON.stringify(html), this.toMailAddr, '', 'false', MailPriority.Normal.toString(), '')
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<number>;
                        this.statusCode = data.StatusCode;
                    });

                if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                    this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Please Enter To Email Address' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_BODY) {
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Mail Server is Not Configured! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_SEND_FAILED) {
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                }
                else {
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                }
            }

            // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
            this.isMailDialog = false;
            this.toMailAddr = '';
            //}

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

                mywindow.document.write('<html><head><title>' + 'Point Of Use - Preference Card Optimization Report' + '</title>');
                mywindow.document.write('</head><body >');
                mywindow.document.write(html);
                mywindow.document.write('</body></html>');

                mywindow.document.close(); // necessary for IE >= 10
                mywindow.focus(); // necessary for IE >= 10*/

                mywindow.print();
                mywindow.close();

                return true;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async filterdata(event) {

        try {
            this.lstSpecialityFilterData = event;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async getProfileParamValue() {
        try {
            await this.commonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], EnumApps.PointOfUse, 'MAX_ALLOW_QTY')
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.strMaxAllowQty = data.DataVariable.toString();
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
    //async onRowExpand(originalEvent, data) {
    
    //    await data.isrowExpand(data)
    //    await this.onProcedureItemClick(data.data);
    //}
    //async isRowExpanded() {
    

    //}
    clientErrorMsg(ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString());
    }
    transform(value: any): any {
        return value.charAt(0) == '-' ?
            '($' + value.substring(1, value.length) + ')' :
            '$' + value;
    }  
}