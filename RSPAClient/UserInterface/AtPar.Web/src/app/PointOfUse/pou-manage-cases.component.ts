import {
    Component,
    OnInit,
    OnDestroy,
    Inject
} from '@angular/core';
import { Response } from "@angular/http";

import { datatableservice } from './../components/datatable/datatableservice';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { Message } from '../components/common/api';
import { ManageCasesServices } from './pou-manage-cases.component.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import {
    StatusType,
    BusinessType,
    TokenEntry_Enum,
    ClientType,
    YesNo_Enum,
    Cart_QtyOption_Enum,
    Cart_File_Type,
    EnumApps,
    CASE_EDITING_OPTIONS,
    Case_Review_Type,
    CASE_PICK_STATUS
} from '../Shared/AtParEnums';

import { MT_POU_DEPT } from '../../app/Entities/MT_POU_DEPT';
import { MT_POU_SPECIALTY_CODE } from '../../app/Entities/MT_POU_SPECIALTY_CODE';
import { MT_POU_CASE_CART_HEADER } from '../../app/Entities/MT_POU_CASE_CART_HEADER';
import { VM_MT_POU_CASE_CART_HEADER_TB } from "../../app/Entities/VM_MT_POU_CASE_CART_HEADER_TB";
import { VM_MT_POU_CASE_DISCRIPTON } from "../../app/Entities/VM_MT_POU_CASE_DISCRIPTON";
import { VM_MT_POU_CASE_CART } from "../../app/Entities/VM_MT_POU_CASE_CART";
import { VM_MT_POU_CASE_CART_HEADER } from "../../app/Entities/VM_MT_POU_CASE_CART_HEADER";
import { VM_POU_CART_DETAILS } from "../../app/Entities/VM_POU_CART_DETAILS";
import { SelectItem } from './../components/common/api';
import { MT_POU_PHYSICIAN } from "../entities/mt_pou_physician";
import { MT_POU_PREF_LIST_HEADER } from "../entities/mt_pou_pref_list_header";
import { PAR_MNGT_COST_CENTER } from "../entities/par_mngt_cost_center";
import { VM_POU_REASON_PROC_COST_CASE_SPEC_CODES } from "../entities/vm_pou_reason_proc_cost_case_spec_codes";
import { PAR_MNGT_ITEM_SUBSTITUTE } from '../../app/Entities/PAR_MNGT_ITEM_SUBSTITUTE';
import { PAR_MNGT_ITEM } from '../../app/Entities/PAR_MNGT_ITEM';
import { VM_SEARCHITEM_DETAILS } from '../../app/Entities/VM_SEARCHITEM_DETAILS';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { VM_MT_POU_CASE_INFO } from "../entities/vm_mt_pou_case_info";
import { MT_POU_CASE_CART_DETAILS } from "../entities/MT_POU_CASE_CART_DETAILS";
import { VM_POU_CASE_CART_HEADER } from "../entities/VM_POU_CASE_CART_HEADER";
import { Menus } from '../AtPar/Menus/routepath';
import { ConfirmationService } from '../components/common/api';
import { DOCUMENT } from '@angular/platform-browser';

declare var module: {
    id: string;
}


@Component({

    templateUrl: 'pou-manage-cases.component.html',
    providers: [datatableservice,
        AtParCommonService,
        ManageCasesServices,
        AtParConstants,
        ConfirmationService]
})

export class ManageCasesComponent implements OnInit {
    showGrid: boolean = false;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    public newItem = new PAR_MNGT_VENDOR();



    deviceTokenEntry: string[] = [];
    noOfRecords: number = 0;
    defDateRange: number = 0;
    statusCode: number = -1;
    strVndrReviewReq: string = "";
    strCaseEditingOption: string = "";
    btnTopSave: boolean;
    btnBottomSave: boolean;
    lstDepts: MT_POU_DEPT[] = [];
    lstServiceCodes: MT_POU_SPECIALTY_CODE[] = [];
    lstCaseDescr: MT_POU_CASE_CART_HEADER[] = [];
    objCaseInfo: VM_MT_POU_CASE_CART_HEADER;
    lstCaseInfo: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
    lstCaseForQA: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
    lstCaseItemsInfo: VM_POU_CART_DETAILS[] = [];
    lstProcedureCodes: string[] = [];
    lstPrefItems: string[] = [];
    strChkValues: string[] = [];
    colArr: string[] = [];
    blnChkValue: boolean = false;
    strOption: string = "";
    btnAddCase: boolean = false;
    strCaseID: string = "";
    strDeptID: string = "";
    strServiceCode: string = "";
    caseID: string = "";
    deptID: string = "";
    serviceCode: string = "";
    fromDate: Date;
    toDate: Date;
    statusData: SelectItem[] = [];
    repCaseData: SelectItem[] = [];
    statusList: any;
    itemStatus: string = "N";
    caseStatusList: any;
    lstCasesItems: any = [];
    lstServiceCodesItems: any = [];

    statusMsgs: Message[] = [];
    lstProcedureItems: any = [];
    lstProcedureItemsList: any = [];
    lstProcedures: VM_POU_REASON_PROC_COST_CASE_SPEC_CODES[];
    lstPhysiciansItems: any = [];
    lstPhysiciansItemsList: any = [];
    lstPhysicians: MT_POU_PHYSICIAN[];
    lstPreferenceItems: any = [];
    lstPreferenceItemsList: any = [];
    lstPreferences: MT_POU_PREF_LIST_HEADER[];
    totallstpreferences: MT_POU_PREF_LIST_HEADER[];
    lstdeptItems: any = [];
    lstdeptItemsList: any = [];
    lstdepts: MT_POU_DEPT[];
    lstdeptcostcenters: PAR_MNGT_COST_CENTER[];
    lstSearchDetails: VM_SEARCHITEM_DETAILS[];
    lstReviewedItems: MT_POU_CASE_CART_DETAILS[] = [];

    ProcedureItem: string = "";
    PhysiciansItem: string = "";
    caseId: string = "";
    caseDesc: string = "";
    performDate: Date;
    Preference: string = "";
    patient: string = "";
    dept: string = "";
    convertDate: string = "";
    currentDate: Date;
    strcostcenter: string = "";
    //validation
    txtcaseIDStatus: number;
    txtcaseDescStatus: number;
    txtpatientStatus: number;
    performDateStatus: number;
    physiciansItemStatus: number;
    procedureItemStatus: number;
    preferenceStatus: number;
    deptStatus: number;
    IsDuplicate: boolean = false;
    replacePrefformSaveEnableDisable: boolean = true;
    replacePrefform: boolean = false;
    replacePref_patient: string = "";
    replacePref_Procedure: string = "";
    rep_Preference: string = "";
    lstReplacePreference: MT_POU_PREF_LIST_HEADER[];
    lstReplacePreferenceItemsList: MT_POU_PREF_LIST_HEADER[];
    lstReplacePreferenceItems: any = [];
    dtCases: VM_MT_POU_CASE_INFO[] = [];
    public dtCasesItem = new VM_MT_POU_CASE_INFO();


    //Session Variables
    m_IsAddCaseEnabled: any;
    m_IsChangeStatusEnabled: any;
    m_IsReplaceCaseEnabled: any;
    m_IsReplacePrefEnabled: any;

    ddlStatus: boolean = false;
    ddlRepCase: boolean = false;
    chkSelect: boolean = false;
    repCaseValue: string = '';
    statusValue: string = '';
    checked: string = "";
    prefListID: string = "";
    procCode: string = "";
    ddlDtlStatus: boolean = false;
    isSave: boolean = false;
    //Details
    _strMaxAllowQty: string = "";
    status: string = "";
    patID: string = "";
    qCaseId: any;
    itemCaseID: string = '';
    physician: string = '';
    dataDictionary: any;
    lstCaseData: any;
    replaceprefCardStatus: boolean = false;
    //LookUp
    lookupItem: string = '';
    description: string = '';
    mfgItem: string = '';
    venItem: string = '';
    upcID: string = '';
    gtin: string = '';
    public subItem = new VM_SEARCHITEM_DETAILS();
    lstSubItemData: VM_SEARCHITEM_DETAILS[] = [];
    isDetails: boolean;
    procedureCode: string = '';
    preferenceList: string = '';
    lnkItemStatus: boolean;
    isHoldQty: boolean;
    isPickQty: boolean;
    isDetailSaved: boolean = false;
    isAddItem: boolean = true;;

    showItemGrid: boolean = false;
    addItems: boolean = false;
    lookupitem: boolean;
    additem: boolean = false;
    breadCrumbMenu: Menus;



    constructor(public dataservice: datatableservice,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private manageCasesService: ManageCasesServices,
        private commonService: AtParCommonService,
        @Inject(DOCUMENT) private document,
        private atParConstant: AtParConstants,
        private confirmationService: ConfirmationService) {
        this.breadCrumbMenu = new Menus();
        this.ven = new Employee();
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    add() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Case';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = true;
        this.editform = false;
        this.page = false;
        this.showGrid = false;
        this.loading = true;
        this.txtcaseIDStatus = null;
        this.txtcaseDescStatus = null;
        this.txtpatientStatus = null;
        this.performDateStatus = null;
        this.physiciansItemStatus = null;
        this.procedureItemStatus = null;
        this.preferenceStatus = null;
        this.deptStatus = null;
        this.ProcedureItem = "";
        this.PhysiciansItem = "";
        this.caseId = "";
        this.caseDesc = "";
        this.performDate = null;
        this.Preference = "";
        this.patient = "";
        this.dept = "";
        this.strcostcenter = "";
        this.strServiceCode = "";
        this.currentDate = new Date();
        this.GetDeptCostCenters();
    }

    onGoBack() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.page = true;
        this.showGrid = false;
        this.editform = false;
        this.table = false;
        this.statusMsgs = [];
    }

    onfocusToCalendar(e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        } else {
            this.minDateValue2 = this.date1;
        }
    }

    onfocusFromCalendar(e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    }

    async ngOnInit() {
        this.btnTopSave = true;
        this.btnBottomSave = true;
        var Ispagepostback = "";
        var IspagepostbackReplacePref = "";
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.noOfRecords = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        await this.commonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], EnumApps.PointOfUse, "ALLOW_EDITING_CASE")
            .catch(this.httpService.handleError).then((res: Response) => {
                let response = res.json() as AtParWebApiResponse<string>;
                console.log(response);
                let temp = response.DataVariable.toString().split(',');
                let tempdata = temp[3].split('-');
                if (tempdata[0] == "1") {
                    this.replaceprefCardStatus = true;
                }
                else {
                    this.replaceprefCardStatus = false;
                }

            });

        try {
            this.statusCode = await this.getDefDateRange();
            if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                return;
            }

            this.fromDate = new Date();
            this.toDate = await this.addDays(this.fromDate, this.defDateRange);

            this.statusCode = await this.getDepartments();
            if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Departments" });
                return;
            }
            this.statusCode = await this.getServiceCodes();
            if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Service Codes" });
                return;
            }
            this.statusCode = await this.getCases();
            if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Cases" });
                return;
            }
            sessionStorage.setItem("lstDepts", JSON.stringify(this.lstDepts));
            sessionStorage.setItem("lstServiceCodes", JSON.stringify(this.lstServiceCodes));
            sessionStorage.setItem("lstCaseDescr", JSON.stringify(this.lstCaseDescr));
            this.statusCode = await this.getProfileParamValue();
            this.strChkValues = this.strCaseEditingOption.split(",");
            for (var i = 0; i <= this.strChkValues.length - 1; i++) {
                this.colArr = this.strChkValues[i].split("-");
                for (var colCnt = 0; colCnt <= this.colArr.length - 1; colCnt++) {
                    if (colCnt == 0) {
                        this.blnChkValue = (parseInt(this.colArr[colCnt]) == 0 ? false : true);
                    } else {
                        this.strOption = CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS[this.colArr[colCnt]]].toString();

                        switch (this.strOption) {
                            case CASE_EDITING_OPTIONS.AddCase.toString():
                                this.m_IsAddCaseEnabled = this.blnChkValue;
                                break;
                            case CASE_EDITING_OPTIONS.ChangeStatus.toString():
                                this.m_IsChangeStatusEnabled = this.blnChkValue;
                                break;
                            case CASE_EDITING_OPTIONS.ReplaceCase.toString():
                                this.m_IsReplaceCaseEnabled = this.blnChkValue;
                                break;
                            case CASE_EDITING_OPTIONS.ReplacePref.toString():
                                this.m_IsReplacePrefEnabled = this.blnChkValue;
                                break;
                        }
                    }
                }
                if (this.m_IsAddCaseEnabled) {
                    this.btnAddCase = true;

                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    async getDefDateRange() {
        try {
            await this.commonService.GetMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.statusMsgs = [];
                    if (data.StatType == StatusType.Success) {
                        this.defDateRange = parseInt(data.DataVariable.toString());
                    }
                    this.statusCode = data.StatusCode;
                    if (data.StatType == StatusType.Error) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                        return;
                    }
                });
            return await this.statusCode;

        }
        catch (ex) {
            return await AtparStatusCodes.E_SERVERERROR;
        }
    }

    async getDepartments() {
        try {
            await this.manageCasesService.getDepartments().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_DEPT>;
                    this.statusMsgs = [];
                    if (data.StatType == StatusType.Success) {
                        this.lstDepts = data.DataList;
                    }
                    this.statusCode = data.StatusCode;
                    if (data.StatType == StatusType.Error) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Departments" });
                        return;
                    }
                });
            return await this.statusCode;

        }
        catch (ex) {
            return await AtparStatusCodes.E_SERVERERROR;
        }
    }

    async getServiceCodes() {
        try {
            await this.manageCasesService.getServiceCodes().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_SPECIALTY_CODE>;
                    this.statusMsgs = [];
                    if (data.StatType == StatusType.Success) {
                        this.lstServiceCodes = data.DataList;
                    }
                    this.statusCode = data.StatusCode;
                    if (data.StatType == StatusType.Error) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Service Codes" });
                        return;
                    }
                });
            return await this.statusCode;

        }
        catch (ex) {
            return await AtparStatusCodes.E_SERVERERROR;
        }

    }

    async getCases() {
        try {
            await this.manageCasesService.getCases().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_CASE_CART_HEADER>;
                    this.statusMsgs = [];
                    if (data.StatType == StatusType.Success) {
                        this.lstCaseDescr = data.DataList;
                    }
                    this.statusCode = data.StatusCode;
                    if (data.StatType == StatusType.Error) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        return;
                    }
                });
            return await this.statusCode;

        }
        catch (ex) {
            return await AtparStatusCodes.E_SERVERERROR;
        }
    }

    async getProfileParamValue() {
        try {
            await this.commonService.GetProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], EnumApps.PointOfUse, "ALLOW_EDITING_CASE").
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.statusMsgs = [];
                    if (data.StatType == StatusType.Success) {
                        this.strCaseEditingOption = data.DataVariable.toString();
                    }
                    this.statusCode = data.StatusCode;
                    if (data.StatType == StatusType.Error) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        return;
                    }
                });
            return await this.statusCode;

        }
        catch (ex) {
            return await AtparStatusCodes.E_SERVERERROR;
        }
    }

    async BindGrid() {
        this.caseStatusList = [];
        this.caseStatusList.push({ label: 'All', value: null });
        this.caseStatusList.push({ label: 'OPEN', value: 'OPEN' });
        this.caseStatusList.push({ label: 'READY', value: 'READY' });
        this.caseStatusList.push({ label: 'CANCELLED', value: 'CANCELLED' });
        this.caseStatusList.push({ label: 'PICKED', value: 'PICKED' });
        this.caseStatusList.push({ label: 'PARTIALLY PICKED', value: 'PARTIALLY PICKED' });
        this.caseStatusList.push({ label: 'REPLACED', value: 'REPLACED' });
        this.caseStatusList.push({ label: 'REVIEWED', value: 'REVIEWED' });
        this.caseStatusList.push({ label: 'RETURNED', value: 'RETURNED' });
        this.caseStatusList.push({ label: 'CASEISSUED', value: 'CASEISSUED' });

        let _strCaseID: string = '';
        let _strDeptID: string = '';
        let _strServiceCode: string = '';
        let _strAddVisible: string = "True";
        if (this.caseID != null && this.caseID != "" && this.caseID != undefined) {
            if (this.caseID.trim().indexOf(' ') >= 0) {
                let _arrCaseAttributes: string[] = [];
                _arrCaseAttributes = this.caseID.trim().split(' ');
                _strCaseID = _arrCaseAttributes[0];
            }
            else {
                _strCaseID = this.caseID.trim();
            }
        }

        if (this.deptID != null && this.deptID != "" && this.deptID != undefined) {
            if (this.deptID.trim().indexOf(' ') >= 0) {
                let _arrCaseAttributes: string[] = [];
                _arrCaseAttributes = this.deptID.trim().split(' ');
                _strDeptID = _arrCaseAttributes[0];
            }
            else {
                _strDeptID = this.deptID.trim();
            }
        }

        if (this.serviceCode != null && this.serviceCode != "" && this.serviceCode != undefined) {
            if (this.serviceCode.trim().indexOf(' ') >= 0) {
                let _arrCaseAttributes: string[] = [];
                _arrCaseAttributes = this.serviceCode.trim().split(' ');
                _strServiceCode = _arrCaseAttributes[0];
            }
            else {
                _strServiceCode = this.serviceCode.trim();
            }
        }

        let frmDate = this.convert(this.fromDate);
        let todate = this.convert(this.toDate);

        try {
            await this.manageCasesService.getCasesforQA(frmDate, todate, Case_Review_Type.PRE, _strDeptID, _strServiceCode, _strCaseID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_MT_POU_CASE_CART_HEADER>;
                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.objCaseInfo = data.Data;
                            this.lstCaseInfo = this.objCaseInfo.lstCaseInfo;
                            sessionStorage.setItem("lstCaseInfo", JSON.stringify(this.lstCaseInfo));
                            this.lstCaseForQA = this.objCaseInfo.lstCaseforQA;

                            this.lstCaseInfo.forEach(info => {
                                if ((info.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED].toString() || info.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN].toString() || info.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED].toString() ||
                                    info.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED].toString() || info.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.READY].toString() || info.STATUS == "PARTIALLY PICKED") && this.replaceprefCardStatus == true) {
                                    info.cursor = 'pointer';
                                }
                                else {
                                    info.cursor = 'none';
                                }
                                info.selectToggle = false;
                                let changeDate = info.PERFORM_DATE;
                                var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                info.PERFORM_DATE = dateStr.replace(',', '');
                                let objCaseQA: VM_MT_POU_CASE_CART_HEADER;
                                let lstSearch: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
                                let lstCases: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
                                let lstFilter: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
                                let infoDetail: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
                                let lstStatus: string[] = [];
                                let _blnMultiStatus: boolean = false;
                                let _strCaseStatus: string = '';
                                let _strAddVisible: string = "True";
                                info.statusData = [];
                                info.statusData.push({ label: "Select Status", value: "Select Status" });
                                if (this.objCaseInfo != null) {
                                    objCaseQA = this.objCaseInfo;
                                    lstSearch = objCaseQA.lstCaseInfo.filter(x => x.PROCEDURE_CODE == 'EMPTY_ROW');
                                    if (lstSearch.length > 0) {
                                        return;
                                    }
                                }
                                lstCases = objCaseQA.lstCaseforQA.filter(x => x.CASE_ID == info.CASE_ID);
                                lstFilter = objCaseQA.lstCaseInfo.filter(x => x.CASE_ID == info.CASE_ID);
                                if (this.m_IsChangeStatusEnabled == true) {
                                    info.selectStatus = false;
                                }
                                else {
                                    info.selectStatus = true;
                                }
                                if (this.m_IsReplaceCaseEnabled == true) {
                                    info.selectCase = false;
                                }
                                else {
                                    info.selectCase = true;
                                }
                                info.isExpander = false;
                                if (lstCases.length > 1) {

                                    infoDetail = this.lstCaseForQA.filter(x => x.CASE_ID == info.CASE_ID);
                                    info.DETAILS = infoDetail;

                                    if (infoDetail.length > 1) {
                                        info.isExpander = true;
                                    }
                                    let lstStatus1: string[] = [];
                                    lstStatus1 = asEnumerable(lstCases).Select(x => x.STATUS).ToArray();

                                    lstStatus1.forEach(status => {
                                        if (lstStatus.filter(x => x == status).length == 0) {
                                            lstStatus.push(status);
                                        }

                                    });

                                    if (lstStatus.length > 1) {
                                        _blnMultiStatus = true;
                                        info.selectStatus = true;
                                        let lstAddbtnStatus: string[] = [];
                                        lstAddbtnStatus = lstStatus.filter(x => x == CASE_PICK_STATUS.PICKED.toString() ||
                                            x == CASE_PICK_STATUS.REVIEWED.toString() ||
                                            x == CASE_PICK_STATUS.REPLACED.toString() ||
                                            x == CASE_PICK_STATUS.RETURNED.toString());
                                        if (lstAddbtnStatus.length > 0) {
                                            _strAddVisible = "False"
                                        }
                                    }

                                    else {

                                        _strCaseStatus = lstStatus[0];

                                        if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN.toString()]) {
                                            info.statusData.push({ label: CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()], value: CASE_PICK_STATUS.READY.toString() })
                                            info.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                        }
                                        else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()]) {
                                            info.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED.toString() })
                                        }
                                        else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] || _strCaseStatus == "PARTIALLY PICKED") {
                                            info.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                        }
                                        else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CANCELLED.toString()]) {
                                            info.statusData.push({ label: CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()], value: CASE_PICK_STATUS.READY })
                                        }
                                        else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] || _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.RETURNED.toString()]) {
                                            info.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                            //if (info.EMERGENCY_CASE == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                                                info.statusData.push({ label: "REMOVE", value: CASE_PICK_STATUS.REMOVE })
                                            //}
                                        }
                                        else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()]) {
                                            info.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                        }
                                        else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()]) {
                                        }
                                        if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()]) {
                                            info.selectStatus = true;
                                            info.selectCase = true;
                                            info.rowClsStyle = 'ui-datatable-green';
                                            info.selectToggle = true;
                                        }
                                        if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] ||
                                            _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()] ||
                                            _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] ||
                                            _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()] ||
                                            _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.RETURNED.toString()]) {
                                            _strAddVisible = "False"
                                        }

                                    }


                                    info.selectPref = false;
                                }
                                else {

                                    _strCaseStatus = info.STATUS.toString();

                                    if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN.toString()]) {
                                        info.statusData.push({ label: CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()], value: CASE_PICK_STATUS.READY.toString() })
                                        info.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                    }
                                    else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()]) {
                                        info.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED.toString() })
                                    }
                                    else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] || _strCaseStatus == "PARTIALLY PICKED") {
                                        info.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                    }
                                    else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CANCELLED.toString()]) {
                                        info.statusData.push({ label: CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()], value: CASE_PICK_STATUS.READY })
                                    }
                                    else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] || _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.RETURNED.toString()]) {
                                        info.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                        //if (info.EMERGENCY_CASE == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                                            info.statusData.push({ label: "REMOVE", value: CASE_PICK_STATUS.REMOVE })
                                       // }
                                    }
                                    else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()]) {
                                        info.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                    }
                                    else if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()]) {
                                    }
                                    if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()]) {
                                        info.selectStatus = true;
                                        info.selectCase = true;
                                        info.rowClsStyle = 'ui-datatable-green';
                                        info.selectToggle = true;

                                    }
                                    if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] ||
                                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()] ||
                                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] ||
                                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()] ||
                                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.RETURNED.toString()]) {
                                        _strAddVisible = "False"
                                    }
                                    if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] ||
                                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN.toString()] ||
                                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] ||
                                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()] ||
                                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()] ||
                                        _strCaseStatus == "PARTIALLY PICKED") {

                                        if (this.m_IsReplacePrefEnabled) {
                                        }
                                    }
                                    info.selectPref = true;
                                }
                                info.repCaseData = [];
                                info.repCaseData.push({ label: "Select Case", value: "Select Case" });
                                if (lstFilter[0].EMERGENCY_CASE == YesNo_Enum[YesNo_Enum.N.toString()] && (!_blnMultiStatus)) {
                                    if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN.toString()] ||
                                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()]) {
                                        if (objCaseQA.lstDstCaseCartHeader.length > 0) {

                                            objCaseQA.lstDstCaseCartHeader.forEach(infoCase => {
                                                info.repCaseData.push({ label: infoCase.CASE_ID + " - " + infoCase.CASE_DESCR, value: infoCase.CASE_ID })

                                            });
                                        }
                                    }
                                    else {
                                        info.selectCase = true;
                                    }

                                }
                                else {
                                    info.selectCase = true;
                                }
                                infoDetail = this.lstCaseForQA.filter(x => x.CASE_ID == info.CASE_ID);
                                infoDetail.forEach(detail => {
                                    if (this.m_IsChangeStatusEnabled == true) {
                                        detail.selectStatus = false;
                                    }
                                    else {
                                        detail.selectStatus = true;
                                    }
                                    if ((detail.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED].toString() || detail.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN].toString() || detail.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED].toString() ||
                                        detail.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED].toString() || detail.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.READY].toString() || detail.STATUS == "PARTIALLY PICKED") && this.replaceprefCardStatus == true) {
                                        detail.cursor = 'pointer';
                                    }
                                    else {
                                        detail.cursor = 'none';
                                    }
                                    detail.statusData = [];
                                    detail.statusData.push({ label: "Select Status", value: "Select Status" });
                                    let dtlsStatus = detail.STATUS;
                                    if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN.toString()]) {
                                        detail.statusData.push({ label: CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()], value: CASE_PICK_STATUS.READY.toString() })
                                        detail.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                    }
                                    else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()]) {
                                        detail.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED.toString() })
                                    }
                                    else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] || dtlsStatus == "PARTIALLY PICKED") {
                                        detail.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                    }
                                    else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CANCELLED.toString()]) {
                                        detail.statusData.push({ label: CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()], value: CASE_PICK_STATUS.READY })
                                    }
                                    else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] || dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.RETURNED.toString()]) {
                                        detail.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                        if (detail.EMERGENCY_CASE == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                                            detail.statusData.push({ label: "REMOVE", value: CASE_PICK_STATUS.REMOVE })
                                        }
                                    }
                                    else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()]) {
                                        detail.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
                                    }
                                    else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()]) {
                                    }
                                    if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] ||
                                        dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN.toString()] ||
                                        dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] ||
                                        dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()] ||
                                        dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()] ||
                                        dtlsStatus == "PARTIALLY PICKED") {
                                        if (this.m_IsReplacePrefEnabled) {
                                        }
                                    }
                                    if (detail.PREFERENCENAME == null || detail.PREFERENCENAME == undefined) {
                                        detail.PREFERENCENAME = "";
                                    }
                                    detail.selectPref = true;

                                });
                                info.qCaseId = info.CASE_ID + ":" + _strAddVisible;
                            });

                            this.showGrid = true;
                            this.statusCode = data.StatusCode;
                            break;

                        }
                        case StatusType.Warn: {
                            this.lstCaseInfo = [];
                            this.showGrid = false;
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    validateSearchFields() {
        try {

            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convert(this.fromDate)) > Date.parse(this.convert(this.toDate))) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be greater than From Date" });
                    return false;
                }
            }
            else {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;

        } catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    }

    async onGoClick() {
        let isValidate: boolean;
        try {
            this.showGrid = false;
            this.lstCaseInfo = [];
            isValidate = await this.validateSearchFields();
            this.spinnerService.start();
            if (isValidate) {
                await this.BindGrid();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async ddlStatusBind(dtlsStatus: any, emergencyCase: any) {

        if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN.toString()]) {
            await this.statusData.push({ label: CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()], value: CASE_PICK_STATUS.READY.toString() })
            await this.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
        }
        else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()]) {
            await this.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED.toString() })
        }
        else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] || dtlsStatus == "PARTIALLY PICKED") {
            await this.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
        }
        else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CANCELLED.toString()]) {
            await this.statusData.push({ label: CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()], value: CASE_PICK_STATUS.READY })
        }
        else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] || dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.RETURNED.toString()]) {
            await this.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
            if (emergencyCase == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                await this.statusData.push({ label: "REMOVE", value: CASE_PICK_STATUS.REMOVE })
            }
        }
        else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()]) {
            await this.statusData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })
        }
        else if (dtlsStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()]) {
        }

    }

    async gvCaseInfo_RowDataBound(lstCaseInfo) {

        let objCaseQA: VM_MT_POU_CASE_CART_HEADER;
        let lstSearch: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let lstCases: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let lstFilter: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let infoDetail: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let lstStatus: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let _blnMultiStatus: boolean = false;
        let _strCaseStatus: string = '';
        let _strAddVisible: string = "True";
        await lstCaseInfo.forEach(info => {
            if (this.objCaseInfo != null) {
                objCaseQA = this.objCaseInfo;
                lstSearch = objCaseQA.lstCaseInfo.filter(x => x.PROCEDURE_CODE == 'EMPTY_ROW');
                if (lstSearch.length > 0) {
                    return;
                }
            }
            lstCases = objCaseQA.lstCaseforQA.filter(x => x.CASE_ID == info.CASE_ID);
            lstFilter = objCaseQA.lstCaseInfo.filter(x => x.CASE_ID == info.CASE_ID);
            if (this.m_IsChangeStatusEnabled == true) {
                this.ddlStatus = true;
            }
            else {
                this.ddlStatus = false;
            }
            if (this.m_IsReplaceCaseEnabled == true) {
                this.ddlRepCase = true;
            }
            else {
                this.ddlRepCase = false;
            }
            if (lstCases.length > 1) {
                infoDetail = this.lstCaseForQA.filter(x => x.CASE_ID == info.CASE_ID);
                info.DETAILS = infoDetail;
                //lstStatus=
                if (lstStatus.length > 1) {
                    _blnMultiStatus = true;
                    this.ddlStatus = false;
                    let lstAddbtnStatus: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
                    // lstAddbtnStatus = lstStatus.(x => x.STATUS==
                    if (lstAddbtnStatus.length > 0) {
                        _strAddVisible = "False"
                    }
                    else {

                        _strCaseStatus = lstStatus[0].STATUS.toString();;
                        this.ddlStatusBind(_strCaseStatus, info.EMERGENCY_CASE);
                        if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()]) {
                            this.ddlStatus = false;
                            this.ddlRepCase = false;
                        }
                        if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] ||
                            _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()] ||
                            _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] ||
                            _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()] ||
                            _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.RETURNED.toString()]) {
                            _strAddVisible = "False"
                        }

                    }

                }
                else {
                    _strCaseStatus = info.STATUS.toString();
                    this.ddlStatusBind(_strCaseStatus, info.EMERGENCY_CASE);
                    if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()]) {
                        this.ddlStatus = false;
                        this.ddlRepCase = false;
                    }
                    if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] ||
                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REPLACED.toString()] ||
                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] ||
                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()] ||
                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.RETURNED.toString()]) {
                        _strAddVisible = "False"
                    }
                    if (_strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] ||
                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN.toString()] ||
                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] ||
                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()] ||
                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()] ||
                        _strCaseStatus == "PARTIALLY PICKED") {

                        if (this.m_IsReplacePrefEnabled) {
                        }
                    }
                }

                if (lstFilter[0].EMERGENCY_CASE == YesNo_Enum[YesNo_Enum.N.toString()] && (!_blnMultiStatus)) {
                    if (_strCaseStatus = CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN.toString()] ||
                        _strCaseStatus == CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()]) {
                        if (objCaseQA.lstDstCaseCartHeader.length > 0) {
                            objCaseQA.lstDstCaseCartHeader.forEach(info => {
                                this.repCaseData.push({ label: "CANCEL", value: CASE_PICK_STATUS.CANCELLED })

                            });
                        }
                        else {
                            this.ddlRepCase = false;
                        }

                    }
                    else {
                        this.ddlRepCase = false;
                    }
                    if (this.ddlRepCase == false && this.ddlStatus == false) {
                        this.chkSelect = false;
                    }
                    else {
                        this.chkSelect = true;
                    }

                }

            }
        });

    }

    gvDetails_RowDataBound(lstDetails: VM_MT_POU_CASE_CART_HEADER_TB[]) {

        let objCaseQA: VM_MT_POU_CASE_CART_HEADER;
        let lstSearch: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let lstCases: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let lstFilter: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        objCaseQA = this.objCaseInfo;
        objCaseQA.lstCaseforQA.forEach(details => {
            lstFilter = objCaseQA.lstCaseInfo.filter(x => (x => x.CASE_ID == details.CASE_ID &&
                x.PROCEDURE_CODE == details.PROCEDURE_CODE &&
                x.PREF_LIST_ID == details.PREF_LIST_ID));
            if (this.m_IsChangeStatusEnabled) {
                this.ddlDtlStatus = true;
            }
            else {
                this.ddlDtlStatus = false;
            }
            this.ddlStatusBind(details.STATUS, lstFilter[0].EMERGENCY_CASE);
            if (details.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED.toString()] ||
                details.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN.toString()] ||
                details.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED.toString()] ||
                details.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED.toString()] ||
                details.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.READY.toString()] ||
                details.STATUS == "PARTIALLY PICKED") {

                if (this.m_IsReplacePrefEnabled) {
                }
            }
        });

    }

    async onSaveClick(event) {

        let objCaseQA: VM_MT_POU_CASE_CART_HEADER;
        let lstSearch: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let lstFilter: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let lstCases: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        try {
            this.spinnerService.start();
            objCaseQA = await this.UpdateDataset(event);
            if (objCaseQA != null) {
                lstSearch = await objCaseQA.lstCaseforQA.filter(x => x.CHECKED.toString().toLowerCase() == 'true');
                if (lstSearch.length == 0) {
                    lstSearch = await objCaseQA.lstCaseInfo.filter(x => x.CHECKED.toString().toLowerCase() == 'true');
                    if (lstSearch.length == 0) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No cases were selected to save" });
                        return;
                    }
                }
                await objCaseQA.lstCaseInfo.forEach(info => {
                    let changeStatus = info.CHANGE_STATUS;
                    if (info.CHECKED.toString().toLowerCase() == 'true') {
                        if (info.CHANGE_STATUS != undefined || info.CHANGE_STATUS != null) {
                            lstSearch = objCaseQA.lstCaseforQA.filter(x => x.CASE_ID == info.CASE_ID);
                            if (lstSearch.length > 1) {
                                lstSearch.forEach(searchInfo => {
                                    let objRow = new VM_MT_POU_CASE_CART_HEADER_TB();
                                    objRow.CASE_ID = searchInfo.CASE_ID;
                                    objRow.PROCEDURE_CODE = searchInfo.PROCEDURE_CODE;
                                    objRow.PREF_LIST_ID = searchInfo.PREF_LIST_ID;
                                    objRow.CURRENT_STATUS = searchInfo.STATUS;
                                    objRow.CHANGED_STATUS = changeStatus;
                                    objRow.REPLACE_CASE = '';
                                    lstCases.push(objRow);
                                });
                            }
                            else {
                                let objRow = new VM_MT_POU_CASE_CART_HEADER_TB();
                                objRow.CASE_ID = lstSearch[0].CASE_ID;
                                objRow.PROCEDURE_CODE = lstSearch[0].PROCEDURE_CODE;
                                objRow.PREF_LIST_ID = lstSearch[0].PREF_LIST_ID;
                                objRow.CURRENT_STATUS = lstSearch[0].STATUS;
                                objRow.CHANGED_STATUS = changeStatus;
                                objRow.REPLACE_CASE = '';
                                lstCases.push(objRow);
                            }
                        }
                        else if (parseInt(info.REPLACE_CASE) != -1) {
                            let objRow = new VM_MT_POU_CASE_CART_HEADER_TB();
                            objRow.CASE_ID = info.CASE_ID;
                            objRow.PROCEDURE_CODE = '';
                            objRow.PREF_LIST_ID = '';
                            objRow.CURRENT_STATUS = '';
                            objRow.CHANGED_STATUS = '';
                            objRow.REPLACE_CASE = info.REPLACE_CASE;;
                            lstCases.push(objRow);

                        }
                    }
                    else {
                        lstSearch = objCaseQA.lstCaseforQA.filter(x => x.CASE_ID == info.CASE_ID);
                        if (lstSearch.length > 0) {
                            lstSearch.forEach(searchInfo => {
                                if (searchInfo.CHECKED.toString().toLowerCase() == 'true') {
                                    let objRow = new VM_MT_POU_CASE_CART_HEADER_TB();
                                    objRow.CASE_ID = searchInfo.CASE_ID;
                                    objRow.PROCEDURE_CODE = searchInfo.PROCEDURE_CODE;
                                    objRow.PREF_LIST_ID = searchInfo.PREF_LIST_ID;
                                    objRow.CURRENT_STATUS = searchInfo.STATUS;
                                    objRow.CHANGED_STATUS = searchInfo.CHANGE_STATUS;
                                    objRow.REPLACE_CASE = '';
                                    lstCases.push(objRow);
                                }
                            });

                        }
                    }

                });
                if (lstCases.length > 0) {
                    let _drRepSearch: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
                    let _drEmrSearch: VM_MT_POU_CASE_CART[] = [];
                    let _blnIsValidReplaceCase: boolean = true;
                    _drRepSearch = await lstCases.filter(x => x.REPLACE_CASE != '');
                    if (_drRepSearch.length > 0) {
                        await _drRepSearch.forEach(repSearch => {
                            if (objCaseQA.lstCaseIdDesc.length > 0) {
                                _drEmrSearch = objCaseQA.lstCaseIdDesc.filter(x => x.CASE_ID = repSearch.REPLACE_CASE);
                                if (_drEmrSearch.length > 0) {
                                    _drEmrSearch.filter(emrSearch => {
                                        lstSearch = objCaseQA.lstCaseforQA.filter(x => x.CASE_ID == repSearch.CASE_ID &&
                                            x.PROCEDURE_CODE == emrSearch.PROCEDURE_CODE &&
                                            x.PREF_LIST_ID == emrSearch.PREF_LIST_ID &&
                                            x.PHYSICIAN == emrSearch.PHYSICIAN);
                                        if (lstSearch.length == 0) {
                                            _blnIsValidReplaceCase = false;
                                            this.confirmationService.confirm({
                                                message: 'Procedure, Pref List does not match with the case being replaced, do you want to continue?',
                                                accept: () => {

                                                    this.manageCasesService.processCases(lstCases).
                                                        catch(this.httpService.handleError).subscribe((res: Response) => {
                                                            let data = res.json() as AtParWebApiResponse<number>;

                                                            this.statusMsgs = [];
                                                            switch (data.StatType) {
                                                                case StatusType.Success: {
                                                                    this.statusMsgs = [];
                                                                    this.statusMsgs.push({
                                                                        severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved successfully"
                                                                    });
                                                                    this.showGrid = false;
                                                                    break;
                                                                }
                                                                case StatusType.Warn: {
                                                                    this.statusMsgs = [];
                                                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                                    break;
                                                                }
                                                                case StatusType.Error: {
                                                                    this.statusMsgs = [];
                                                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                                    break;
                                                                }
                                                                case StatusType.Custom: {
                                                                    this.statusMsgs = [];
                                                                    this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                                    break;
                                                                }
                                                            }

                                                        });
                                                }

                                            });

                                        }

                                    });
                                }
                            }
                        });
                    }
                    if (_blnIsValidReplaceCase) {

                        await this.manageCasesService.processCases(lstCases).
                            catch(this.httpService.handleError).subscribe((res: Response) => {
                                let data = res.json() as AtParWebApiResponse<number>;

                                this.statusMsgs = [];
                                switch (data.StatType) {
                                    case StatusType.Success: {
                                        this.statusMsgs = [];
                                        this.statusMsgs.push({
                                            severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved successfully"
                                        });
                                        this.showGrid = false;
                                        break;
                                    }
                                    case StatusType.Warn: {
                                        this.statusMsgs = [];
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case StatusType.Error: {
                                        this.statusMsgs = [];
                                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case StatusType.Custom: {
                                        this.statusMsgs = [];
                                        this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }

                            });

                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async UpdateDataset(event) {

        let objCaseQA: VM_MT_POU_CASE_CART_HEADER;
        let isChecked: boolean = true;
        try {
            this.statusMsgs = [];
            let lstSearch: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
            let lstFilter: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
            //await this.lstCaseInfo.forEach(info => {

            for (let i = 0; i <= this.lstCaseInfo.length - 1; i++) {

                let info: VM_MT_POU_CASE_CART_HEADER_TB = new VM_MT_POU_CASE_CART_HEADER_TB();
                info = this.lstCaseInfo[i];
                if (info.CHECKED == "true") {
                    if (info.selectCase == false && info.selectStatus == false) {
                        if ((info.statusValue == null || info.statusValue == '' || info.statusValue == "Select Status" || info.statusValue == undefined) &&
                            (info.repCaseValue == null || info.repCaseValue == '' || info.repCaseValue == "Select Case" || info.repCaseValue == undefined)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select the Replace Case / Change Status" });
                            isChecked = false;
                            break;

                        }
                        else if ((info.statusValue != null && info.statusValue != '' && info.statusValue.toString() != 'Select Status' && info.statusValue != undefined) &&
                            (info.repCaseValue != null && info.repCaseValue != '' && info.repCaseValue.toString() != 'Select Case' && info.repCaseValue != undefined)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Only one transaction(Change Status/Replace Case) is allowed at a time" });
                            isChecked = false;
                            break;
                        }
                    }
                    else if (info.selectCase == false && (info.repCaseValue == null || info.repCaseValue == '' || info.repCaseValue == "Select Case")) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select the Replace Case" });
                        isChecked = false;
                        break;

                    }
                    else if (info.selectStatus == false && (info.statusValue == null || info.statusValue == '' || info.statusValue == "Select Status")) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select the Change Status" });
                        isChecked = false;
                        break;
                    }
                }


                objCaseQA = this.objCaseInfo;
                lstSearch = objCaseQA.lstCaseInfo.filter(x => x.CASE_ID == info.CASE_ID);
                lstSearch[0].REPLACE_CASE = info.repCaseValue;
                lstSearch[0].CHANGE_STATUS = info.statusValue;
                lstSearch[0].CHECKED = info.CHECKED;
                if (info.DETAILS != null || info.DETAILS != undefined) {
                    if (info.DETAILS.length > 1) {
                        //info.DETAILS.forEach(infoDetail => {
                        for (var j = 0; j <= info.DETAILS.length - 1; j++) {
                            let infoDetail = info.DETAILS[j];
                            if (infoDetail.CHECKED == "true") {
                                if (infoDetail.statusValue == null || infoDetail.statusValue == '' || infoDetail.statusValue == "Select Status") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select the Change Status" });
                                    isChecked = false;
                                    break;
                                }
                                else if ((infoDetail.statusValue != null || infoDetail.statusValue != '' || infoDetail.statusValue.toString() != 'Select Status') &&
                                    (infoDetail.repCaseValue != null || infoDetail.repCaseValue != '' || infoDetail.repCaseValue.toString() != 'Select Case')) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Only one transaction(Change Status/Replace Case) is allowed at a time" });
                                    isChecked = false;
                                    break;

                                }
                                lstFilter = objCaseQA.lstCaseInfo.filter(x => x.CASE_ID == infoDetail.CASE_ID && x.PROCEDURE_CODE == this.procCode && x.PREF_LIST_ID == this.prefListID);
                                lstFilter[0].CHANGE_STATUS = infoDetail.statusValue;
                                lstFilter[0].CHECKED = infoDetail.CHECKED;
                            }
                        }
                    }

                }

            }

            if (isChecked == false) {
                objCaseQA = null;
            }
            return objCaseQA;
        }
        catch (ex) {
            objCaseQA = null;
            return objCaseQA;
        }

    }

    async fillCasesAuto(event) {

        let lstCaseDes: any = [];
        let query = event.query;

        try {

            lstCaseDes = this.filterCaseItems(query, this.lstCaseDescr);
            this.lstCasesItems = [];
            for (let i = 0; i <= lstCaseDes.length - 1; i++) {
                if (lstCaseDes[i].DESCRIPTION != null && lstCaseDes[i].DESCRIPTION != "" && lstCaseDes[i].DESCRIPTION != undefined) {
                    this.lstCasesItems[i] = lstCaseDes[i].CASE_ID + " - " + lstCaseDes[i].DESCRIPTION;
                }
                else {
                    this.lstCasesItems[i] = lstCaseDes[i].CASE_ID;
                }

            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async fillServiceCodesAuto(event) {

        let lstCaseDes: any = [];
        let query = event.query;

        try {

            lstCaseDes = this.filterServiceItems(query, this.lstServiceCodes);
            this.lstServiceCodesItems = [];
            for (let i = 0; i <= lstCaseDes.length - 1; i++) {
                if (lstCaseDes[i].DESCRIPTION != null && lstCaseDes[i].DESCRIPTION != "" && lstCaseDes[i].DESCRIPTION != undefined) {
                    this.lstServiceCodesItems[i] = lstCaseDes[i].SPECIALTY_CODE + " - " + lstCaseDes[i].DESCRIPTION;
                }
                else {
                    this.lstServiceCodesItems[i] = lstCaseDes[i].SPECIALTY_CODE;
                }

            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async fillProceduresAuto(event) {

        this.lstProcedureItems = [];
        this.lstProcedureItemsList = [];
        let query = event.query;
        try {

            await this.manageCasesService.getProcedureCodes("PROCEDURES", "", "").
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_POU_REASON_PROC_COST_CASE_SPEC_CODES>;

                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstProcedures = data.DataList;
                            this.lstProcedureItemsList = this.filterCodeItems(query, this.lstProcedures)
                            for (let i = 0; i <= this.lstProcedureItemsList.length - 1; i++) {
                                this.lstProcedureItems[i] = this.lstProcedureItemsList[i].CODE + " - " + this.lstProcedureItemsList[i].DESCRIPTION;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.statusMsgs = [];
                            }
                            else {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async fillDepartmentsAuto(event) {

        this.lstdeptItems = [];
        this.lstdeptItemsList = [];
        let query = event.query;
        try {

            await this.manageCasesService.getDepartments().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_DEPT>;

                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstdepts = data.DataList;
                            this.lstdeptItemsList = this.filterDeptItems(query, this.lstdepts)
                            this.lstdeptItems = [];
                            for (let i = 0; i <= this.lstdeptItemsList.length - 1; i++) {
                                this.lstdeptItems[i] = this.lstdeptItemsList[i].DEPT_ID + " - " + this.lstdeptItemsList[i].DEPT_NAME;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.statusMsgs = [];
                            }
                            else {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async fillPhysiciansAuto(event) {

        this.lstPhysiciansItems = [];
        this.lstPhysiciansItemsList = [];
        let query = event.query;
        try {

            await this.commonService.getPhysicians().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_PHYSICIAN>;
                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstPhysicians = data.DataList;
                            this.lstPhysiciansItemsList = this.filterPhysicianItems(query, this.lstPhysicians)
                            this.lstPhysiciansItems = [];
                            for (let i = 0; i <= this.lstPhysiciansItemsList.length - 1; i++) {
                                this.lstPhysiciansItems[i] = this.lstPhysiciansItemsList[i].PHYSICIAN_ID + " - " + this.lstPhysiciansItemsList[i].FIRST_NAME + " " + this.lstPhysiciansItemsList[i].MIDDLE_INITIAL + " " + this.lstPhysiciansItemsList[i].LAST_NAME;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.statusMsgs = [];
                            }
                            else {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async fillPreferenceListAuto(event) {

        this.lstPreferenceItems = [];
        this.lstPreferenceItemsList = [];
        let query = event.query;
        try {

            await this.manageCasesService.getPreferenceListIDs().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_PREF_LIST_HEADER>;
                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            let procitem: any[] = [];
                            let phyitem: any[] = [];
                            if (this.ProcedureItem != null && this.ProcedureItem != "") {
                                procitem = this.ProcedureItem.split(" - ");
                            }
                            if (this.PhysiciansItem != null && this.PhysiciansItem != "") {
                                phyitem = this.PhysiciansItem.split(" - ");
                            }
                            this.totallstpreferences = data.DataList;
                            this.lstPreferences = asEnumerable(data.DataList).Where(x => x.PROCEDURE_ID === procitem[0] && x.PHYSICIAN_ID === phyitem[0]).Select(x => x).ToArray();
                            this.lstPreferenceItemsList = this.filterPrefItems(query, this.lstPreferences)
                            this.lstPreferenceItems = [];
                            for (let i = 0; i <= this.lstPreferenceItemsList.length - 1; i++) {
                                this.lstPreferenceItems[i] = this.lstPreferenceItemsList[i].PREF_LIST_ID + " - " + this.lstPreferenceItemsList[i].PREF_LIST_DESCR;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.statusMsgs = [];
                            }
                            else {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async fillProcCodeAuto(event) {

        let lstProcedures: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let lstProcoCode: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let filter: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        this.lstProcedureCodes = [];
        let query = event.query;
        try {
            lstProcedures = this.objCaseInfo.lstCaseforQA;
            filter = lstProcedures.filter(x => x.CASE_ID == this.itemCaseID)

            lstProcoCode = this.filterProcCodeItems(query, filter);
            for (let i = 0; i <= lstProcoCode.length - 1; i++) {
                this.lstProcedureCodes[i] = lstProcoCode[i].PROCEDURE_CODE;
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async fillPreferenceAuto(event) {

        let lstProcedures: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let lstProcoCode: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let filter: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let query = event.query;
        try {
            lstProcedures = this.objCaseInfo.lstCaseforQA;
            filter = lstProcedures.filter(x => x.CASE_ID == this.itemCaseID && x.PROCEDURE_CODE == this.subItem.PROCEDURE_CODE)
            this.lstPrefItems = [];
            lstProcoCode = this.filterPrefItems(query, filter)
            for (let i = 0; i <= lstProcoCode.length - 1; i++) {
                this.lstPrefItems[i] = lstProcoCode[i].PREF_LIST_ID;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async GetDeptCostCenters() {

        try {
            await this.manageCasesService.getDeptCostCenters().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<PAR_MNGT_COST_CENTER>;
                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstdeptcostcenters = data.DataList;
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.statusMsgs = [];
                            }
                            else {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    filterProcCodeItems(query, items: any[]) {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if ((filtered.filter(x => x.PROCEDURE_CODE == itemValue.PROCEDURE_CODE)).length == 0) {
                    filtered.push(itemValue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    let itemValue = items[i];
                    if (itemValue.PROCEDURE_CODE.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(x => x.PROCEDURE_CODE == itemValue.PROCEDURE_CODE)).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                }
            }
        }
        return filtered;
    }

    filterCaseItems(query, items: any[]) {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if ((filtered.filter(x => x.CASE_ID == itemValue.CASE_ID)).length == 0) {
                    filtered.push(itemValue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    let itemValue = items[i];
                    if (itemValue.CASE_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 || itemValue.DESCRIPTION.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(x => x.CASE_ID == itemValue.CASE_ID || x.DESCRIPTION == itemValue.DESCRIPTION)).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                }
            }
        }
        return filtered;
    }

    filterServiceItems(query, items: any[]) {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if ((filtered.filter(x => x.SPECIALTY_CODE == itemValue.SPECIALTY_CODE)).length == 0) {
                    filtered.push(itemValue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    let itemValue = items[i];
                    if (itemValue.SPECIALTY_CODE.toLowerCase().indexOf(query.toLowerCase()) == 0 || itemValue.DESCRIPTION.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(x => x.SPECIALTY_CODE == itemValue.SPECIALTY_CODE || x.DESCRIPTION == itemValue.DESCRIPTION)).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                }
            }
        }
        return filtered;
    }

    filterCodeItems(query, items: any[]) {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if ((filtered.filter(x => x.CODE == itemValue.CODE || x.DESCRIPTION == itemValue.DESCRIPTION)).length == 0) {
                    filtered.push(itemValue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    let itemValue = items[i];
                    if (itemValue.CODE.toLowerCase().indexOf(query.toLowerCase()) == 0 || itemValue.DESCRIPTION.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(x => x.CODE == itemValue.CODE || x.DESCRIPTION == itemValue.DESCRIPTION)).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                }
            }
        }
        return filtered;
    }

    filterDeptItems(query, items: any[]) {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if ((filtered.filter(x => x.DEPT_ID == itemValue.DEPT_ID)).length == 0) {
                    filtered.push(itemValue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    let itemValue = items[i];
                    if (itemValue.DEPT_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 || itemValue.DEPT_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(x => x.DEPT_ID == itemValue.DEPT_ID || x.DEPT_NAME == itemValue.DEPT_NAME)).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                }
            }
        }
        return filtered;
    }

    filterPhysicianItems(query, items: any[]) {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if ((filtered.filter(x => x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID)).length == 0) {
                    filtered.push(itemValue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    let itemValue = items[i];
                    if (itemValue.PHYSICIAN_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.FIRST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.MIDDLE_INITIAL.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.LAST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(x => x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID ||
                            x.FIRST_NAME == itemValue.FIRST_NAME ||
                            x.MIDDLE_INITIAL == itemValue.MIDDLE_INITIAL ||
                            x.LAST_NAME == itemValue.LAST_NAME)).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                }
            }
        }
        return filtered;
    }

    filterPrefItems(query, items: any[]) {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if ((filtered.filter(x => x.PREF_LIST_ID == itemValue.PREF_LIST_ID)).length == 0) {
                    filtered.push(itemValue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    let itemValue = items[i];
                    if (itemValue.PREF_LIST_ID.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                        if (itemValue.PREF_LIST_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 || itemValue.PREF_LIST_DESCR.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            if ((filtered.filter(x => x.PREF_LIST_ID == itemValue.PREF_LIST_ID || x.PREF_LIST_DESCR == itemValue.PREF_LIST_DESCR)).length == 0) {
                                filtered.push(itemValue);
                            }
                        }
                    }
                }
            }
        }
        return filtered;
    }

    clientErrorMsg(strExMsg) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spinnerService, strExMsg.toString());
    }

    Validate() {
        try {
            if (this.performDate != null) {
                this.performDateStatus = 0;
            }
            else {
                this.performDateStatus = 1;
            }

            if (this.PhysiciansItem != null && this.PhysiciansItem != "" && this.PhysiciansItem != "%") {
                this.physiciansItemStatus = 0;
            }
            else {
                this.physiciansItemStatus = 1;
            }

            if (this.ProcedureItem != null && this.ProcedureItem != "" && this.ProcedureItem != "%") {
                this.procedureItemStatus = 0;
            }
            else {
                this.procedureItemStatus = 1;
            }

            if (this.Preference != null && this.Preference != "" && this.Preference != "%") {
                this.preferenceStatus = 0;
            }
            else {
                this.preferenceStatus = 1;
            }

            if (this.dept != null && this.dept != "" && this.dept != "%") {
                this.deptStatus = 0;
            }
            else {
                this.deptStatus = 1;
            }

            if (this.txtcaseIDStatus == 0 && this.txtcaseDescStatus == 0 && this.txtpatientStatus == 0 && this.performDateStatus == 0 && this.physiciansItemStatus == 0
                && this.procedureItemStatus == 0 && this.preferenceStatus == 0 && this.deptStatus == 0 &&
                (this.caseId != "" || this.caseId != undefined || this.caseId != null) && (this.caseDesc != "" || this.caseDesc != undefined || this.caseDesc != null) &&
                (this.patient != "" || this.patient != undefined || this.patient != null)) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }

            if (this.rep_Preference != null && this.rep_Preference != "" && this.rep_Preference != "%") {
                this.replacePrefformSaveEnableDisable = false;
            }
            else {
                this.replacePrefformSaveEnableDisable = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    bindModelDataChange(event: any) {

        try {
            if ("txtCaseID" == event.TextBoxID.toString()) {
                this.txtcaseIDStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtCaseDesc" == event.TextBoxID.toString()) {
                this.txtcaseDescStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtpatient" == event.TextBoxID.toString()) {
                this.txtpatientStatus = event.validationrules.filter(x => x.status == false).length;
            }
            this.Validate();

            if (this.txtcaseIDStatus == 0 && this.txtcaseDescStatus == 0 && this.txtpatientStatus == 0 && this.performDateStatus == 0 && this.physiciansItemStatus == 0
                && this.procedureItemStatus == 0 && this.preferenceStatus == 0 && this.deptStatus == 0) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async Save_Click(event) {

        try {
            this.spinnerService.start();
            let procitem: string[] = [];
            let procitem1: VM_POU_REASON_PROC_COST_CASE_SPEC_CODES[] = [];
            let phyitem: string[] = [];
            let phyitem1: string[] = [];
            let prefitem: string[] = [];
            let prefitem1: string[] = [];
            let deptlst: string[] = [];
            let deptlist1: string[] = [];
            let getdeptCostcenter: PAR_MNGT_COST_CENTER[] = [];

            //date validating
            if (this.performDate != null) {
                if (Date.parse(this.performDate.getMonth() + '/' + this.performDate.getDate() + '/' + this.performDate.getFullYear()) < Date.parse(this.currentDate.getMonth() + "/" + this.currentDate.getDate() + "/" + this.currentDate.getFullYear())) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Perform Date must be greater than or equal to today's date" });
                    this.spinnerService.stop();
                    return;
                }
                else {
                    this.convertDate = this.convert(this.performDate);
                }
            }
            else {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter date" });
                this.spinnerService.stop();
                return;
            }

            //procedure item validating
            if (this.ProcedureItem != null || this.ProcedureItem != "") {
                procitem = this.ProcedureItem.split(" - ");
            }
            if (this.lstProcedures != null && this.lstProcedures.length > 0) {
                procitem1 = asEnumerable(this.lstProcedures).Where(x => x.CODE == procitem[0]).Select(x => x).ToArray();
                if (procitem1.length == 0) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Procedure ID" });
                    this.spinnerService.stop();
                    return;
                }
                else {
                    this.strServiceCode = procitem1[0].SCODE;
                }
            }
            else {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Procedure ID" });
                this.spinnerService.stop();
                return;
            }
            //physician item validating
            if (this.PhysiciansItem != null || this.PhysiciansItem != "") {
                phyitem = this.PhysiciansItem.split(" - ");
            }
            if (this.lstPhysicians != null && this.lstPhysicians.length > 0) {
                phyitem1 = asEnumerable(this.lstPhysicians).Where(x => x.PHYSICIAN_ID == phyitem[0]).Select(x => x.PHYSICIAN_ID).ToArray();
                if (phyitem1.length == 0) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Physician ID" });
                    this.spinnerService.stop();
                    return;
                }
            }
            else {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Physician ID" });
                this.spinnerService.stop();
                return;
            }
            //preference list validating
            if (this.Preference != null || this.Preference != "") {
                prefitem = this.Preference.split(" - ");
            }
            if (this.totallstpreferences != null && this.totallstpreferences.length > 0) {
                prefitem1 = asEnumerable(this.totallstpreferences).Where(x => x.PREF_LIST_ID == prefitem[0] && x.PHYSICIAN_ID == phyitem[0] && x.PROCEDURE_ID == procitem[0]).Select(x => x.PREF_LIST_ID).ToArray();
                if (prefitem1.length == 0) {
                    prefitem1 = asEnumerable(this.totallstpreferences).Where(x => x.PREF_LIST_ID == prefitem[0] && x.PROCEDURE_ID == procitem[0]).Select(x => x.PREF_LIST_ID).ToArray();
                    if (prefitem1.length == 0) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Preference ID" });
                        this.spinnerService.stop();
                        return;
                    }
                }
            }
            else {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Preference ID" });
                this.spinnerService.stop();
                return;
            }
            //department list validating
            if (this.dept != null || this.dept != "") {
                deptlst = this.dept.split(" - ");
            }
            if (this.lstdepts != null && this.lstdepts.length > 0) {
                deptlist1 = asEnumerable(this.lstdepts).Where(x => x.DEPT_ID == deptlst[0]).Select(x => x.DEPT_ID).ToArray();
                if (deptlist1.length == 0) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Dept ID" });
                    this.spinnerService.stop();
                    return;
                }
            }
            else {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Dept ID" });
                this.spinnerService.stop();
                return;
            }
            if (this.lstdeptcostcenters != null && this.lstdeptcostcenters.length > 0) {
                this.lstdeptcostcenters = asEnumerable(this.lstdeptcostcenters).Where(x => x.DEPT_ID == deptlst[0]).OrderBy(x => x.COST_CENTER_CODE).Select(x => x).ToArray();
                if (this.lstdeptcostcenters.length > 0) {
                    this.strcostcenter = this.lstdeptcostcenters[0].COST_CENTER_CODE;
                }
            }
            this.CheckForDuplicates(this.caseId, prefitem[0], procitem[0]);
            if (this.IsDuplicate) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Case ID already exists" });
                this.spinnerService.stop();
                return;
            }
            else {
                await this.AddCaseInfo(this.caseId, this.caseDesc, phyitem[0], this.patient, prefitem[0], procitem[0], this.convertDate, "", CASE_PICK_STATUS.OPEN.toString(), deptlst[0], this.strServiceCode, this.strcostcenter);
            }

            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    CheckForDuplicates(caseID, prefID, procID) {
        try {
            let caseIDs: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
            if (this.objCaseInfo != undefined || this.objCaseInfo != null) {
                if (this.objCaseInfo.lstCaseInfo.length > 0) {
                    caseIDs = this.objCaseInfo.lstCaseforQA;
                    let selRows = asEnumerable(caseIDs).Where(x => x.CASE_ID == caseID && x.PREF_LIST_ID == prefID && x.PROCEDURE_CODE == procID).Select(X => X).ToArray();
                    if (selRows.length > 0) {
                        this.IsDuplicate = true
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async AddCaseInfo(CaseID, CaseDesc, PhyID, Patient, PrefID, ProcID, Date, RoomNo, Status, DeptId, ServiceCode, CostCenter) {

        try {
            await this.manageCasesService.addCaseInfo(CaseID, CaseDesc, PhyID, Patient, PrefID, ProcID, Date, this.deviceTokenEntry[TokenEntry_Enum.UserID], RoomNo, Status, YesNo_Enum[YesNo_Enum.Y].toString(), DeptId, ServiceCode, CostCenter).
                catch(this.httpService.handleError).then((res: Response) => {
                    let resp = res.json() as AtParWebApiResponse<MT_POU_CASE_CART_HEADER>
                    this.spinnerService.stop();
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Emergency case is created successfully" });
                            this.loading = true;
                            this.ProcedureItem = "";
                            this.PhysiciansItem = "";
                            this.caseId = "";
                            this.caseDesc = "";
                            this.performDate = null;
                            this.Preference = "";
                            this.patient = "";
                            this.dept = "";
                            this.strcostcenter = "";
                            this.strServiceCode = "";
                            document.getElementById("txtCaseID").focus();
                            break;

                        case StatusType.Error:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            break;
                        case StatusType.Warn:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            break;
                    }
                    this.atParConstant.scrollToTop();
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    review_Case_Items(pref: VM_MT_POU_CASE_CART_HEADER_TB) {

        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Replace Pref Card';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            if ((pref.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.REVIEWED].toString() || pref.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.OPEN].toString() || pref.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.PICKED].toString() ||
                pref.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.CASEISSUED].toString() || pref.STATUS == CASE_PICK_STATUS[CASE_PICK_STATUS.READY].toString() || pref.STATUS == "PARTIALLY PICKED") && this.replaceprefCardStatus == true) {
                this.replacePrefform = true;
                this.page = false;
                this.showGrid = false;
                this.form = false;
                this.table = false;
                this.editform = false;
                this.rep_Preference = "";
                this.replacePref_patient = pref.PATIENTNAME;
                this.replacePref_Procedure = pref.PROCEDURENAME;
                this.dtCasesItem = new VM_MT_POU_CASE_INFO();
                this.dtCasesItem.CASE_ID = pref.CASE_ID;
                this.dtCasesItem.PREF_LIST_ID = pref.PREF_LIST_ID;
                this.dtCasesItem.STATUS = pref.STATUS;
                this.replacePrefformSaveEnableDisable = true;

            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async fillReplacePreferenceListAuto(event) {

        this.lstReplacePreferenceItems = [];
        this.lstReplacePreferenceItemsList = [];
        let query = event.query;
        try {

            await this.manageCasesService.getPreferenceListIDs().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_PREF_LIST_HEADER>;
                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstReplacePreference = data.DataList;
                            this.lstReplacePreferenceItemsList = this.filterPrefItems(query, this.lstReplacePreference)
                            for (let i = 0; i <= this.lstReplacePreferenceItemsList.length - 1; i++) {
                                this.lstReplacePreferenceItems[i] = this.lstReplacePreferenceItemsList[i].PREFLISTNAME + " /" + this.lstReplacePreferenceItemsList[i].PREF_PROCEDURES;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async goReplacePref_Back() {

        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.spinnerService.start();
            await this.BindGrid();
            this.spinnerService.stop();
            this.replacePrefform = false;
            this.page = true;
            this.showGrid = true;
            this.form = false;
            this.table = false;
            this.editform = false;
            this.replacePref_patient = "";
            this.replacePref_Procedure = "";
            this.rep_Preference = "";
            this.statusMsgs = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async replacePref_Save(event) {

        this.spinnerService.start();
        let replacePref_Procitem: any[] = [];
        let arrSplitPrefProc: string[] = [];
        let arrPrefAttributes: any[] = [];
        let arrProcAttributes: any[] = [];
        let strPrefID: string;
        let strNewProcID: string;
        if (this.replacePref_Procedure != null && this.replacePref_Procedure != "") {
            replacePref_Procitem = this.replacePref_Procedure.split(" - ");
        }
        if (this.rep_Preference != null || this.rep_Preference != "") {
            if (this.rep_Preference.indexOf(") /") > 1) {
                arrSplitPrefProc = this.rep_Preference.split(") /");

                if (arrSplitPrefProc != null && arrSplitPrefProc.length > 0) {
                    if (arrSplitPrefProc[0] != null || arrSplitPrefProc[0] != "") {
                        arrSplitPrefProc[0] = arrSplitPrefProc[0].trim();
                        arrPrefAttributes = arrSplitPrefProc[0].split("(");
                        strPrefID = arrPrefAttributes[arrPrefAttributes.length - 1];
                    }
                    if (arrSplitPrefProc[1] != null || arrSplitPrefProc[1] != "") {
                        arrProcAttributes = arrSplitPrefProc[1].split("(")
                        strNewProcID = arrProcAttributes[arrProcAttributes.length - 1]
                        strNewProcID = strNewProcID.replace(")", "");
                    }

                }
            }

            else {
                if (this.lstReplacePreference != null && this.lstReplacePreference.length > 0) {
                    this.lstReplacePreference = asEnumerable(this.lstReplacePreference).Where(x => x.PREF_LIST_ID === this.rep_Preference).Select(x => x).ToArray();
                    if (this.lstReplacePreference.length == 0) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Please enter valid Preference ID" });
                        this.spinnerService.stop();
                        return;
                    }
                    else {
                        if (this.lstReplacePreference.length > 1) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Please select the correct pref / procedure combination" });
                            this.spinnerService.stop();
                            return;
                        }
                        else {
                            strPrefID = this.rep_Preference;
                            strNewProcID = this.lstReplacePreference[0].PROCEDURE_ID;
                        }
                    }
                }
            }
        }
        this.spinnerService.stop();
        //VM_MT_POU_CASE_INFO
        this.dtCasesItem.PROCEDURE_CODE = replacePref_Procitem[0];
        this.dtCasesItem.NEW_PREF_LIST_ID = strPrefID;
        this.dtCasesItem.NEW_PROCEDURE_CODE = strNewProcID;
        this.dtCases = [];
        this.dtCases.push(this.dtCasesItem);
        try {
            await this.manageCasesService.replacePrefCard(this.dtCases).
                catch(this.httpService.handleError).then((res: Response) => {
                    let resp = res.json() as AtParWebApiResponse<number>
                    this.spinnerService.stop();
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: " Pref card: " + this.dtCasesItem.PREF_LIST_ID + " in case: " + this.dtCasesItem.CASE_ID + " replaced with pref card: " + this.dtCasesItem.NEW_PREF_LIST_ID });
                            this.replacePrefformSaveEnableDisable = true;
                            break;

                        case StatusType.Error:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            break;
                        case StatusType.Warn:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            break;
                    }
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async Details_Load(caseInfo: VM_MT_POU_CASE_CART_HEADER_TB) {

        try {
            this.spinnerService.start();
            await this.manageCasesService.SearchItem().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.dataDictionary = data.DataDictionary;
                            this.lstSearchDetails = data.DataDictionary["lstSearchDetails"];
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Error while getting data" });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }


                });

            this.statusList = [];
            this.statusList.push({ label: 'All', value: null });
            this.statusList.push({ label: 'Active', value: true });
            this.statusList.push({ label: 'InActive', value: false });
            await this.commonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], EnumApps.PointOfUse.toString(), "MAX_ALLOW_QTY").
                catch(this.httpService.handleError).then((res: Response) => {

                    let data = res.json() as AtParWebApiResponse<string>;
                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this._strMaxAllowQty = data.DataVariable.toString();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }


                });
            let _strCaseID = caseInfo.qCaseId;
            let _strCaseInfo = _strCaseID.split(':');
            this.itemCaseID = caseInfo.CASE_ID;
            this.status = _strCaseInfo[1];
            if (this.status == "False") {
                this.isAddItem = false;
            }
            else {
                this.isAddItem = true;
            }
            let objCaseQA: VM_MT_POU_CASE_CART_HEADER;
            let lstFilter: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
            objCaseQA = this.objCaseInfo;

            lstFilter = objCaseQA.lstCaseforQA.filter(x => x.CASE_ID == this.itemCaseID);
            if (lstFilter.length > 1) {
                this.isDetails = true;
            }
            else {
                this.procedureCode = lstFilter[0].PROCEDURE_CODE;
                this.preferenceList = lstFilter[0].PREF_LIST_ID;
                this.isDetails = false;
            }
            this.patID = lstFilter[0].PATIENTNAME;

            await this.itemBindGrid();

            return true;
        }
        catch (ex) {
            return false;

        }
        finally {
            this.spinnerService.stop();
        }

    }

    async itemBindGrid(): Promise<any> {

        try {
            await this.manageCasesService.getCaseItems(this.itemCaseID, Case_Review_Type.PRE).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;

                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.dataDictionary = data.DataDictionary;
                            let lstCartDetails: VM_POU_CART_DETAILS[] = [];
                            let lstCaseCartheader: VM_POU_CASE_CART_HEADER[] = [];
                            let lstCartheader: MT_POU_CASE_CART_HEADER[] = [];
                            lstCartDetails = this.dataDictionary["CARTDETAILS"];
                            lstCartheader = this.dataDictionary["CARTSHEADERS"];
                            lstCaseCartheader = this.dataDictionary["CASECARTHEADER"];
                            this.lstCaseItemsInfo = this.dataDictionary["CARTDETAILS"];
                            if (lstCartheader.length > 0) {
                                this.physician = lstCartheader[0].PHYSICIAN_DESCR;
                            }
                            this.lstCaseData = [];
                            if (lstCartDetails.length > 0) {
                                for (let i = 0; i <= lstCartDetails.length - 1; i++) {
                                    lstCartDetails[i].oldpickqty = lstCartDetails[i].OLD_PICK_QTY;
                                    lstCartDetails[i].oldholdqty = lstCartDetails[i].HOLD_QTY;
                                    let lstCartSearch: VM_POU_CASE_CART_HEADER[] = [];
                                    // lstCartSearch = lstCaseCartheader.filter(x => x.CASE_ID == this.itemCaseID && x.PROCEDURE_CODE == this.procedureCode && x.PREF_LIST_ID == this.preferenceList);
                                    lstCartSearch = lstCaseCartheader.filter(x => x.CASE_ID == this.itemCaseID);
                                    if (lstCartSearch.length > 0) {
                                        let intStatus: number = lstCartSearch[0].STATUS;
                                        if (intStatus == CASE_PICK_STATUS.READY || intStatus == CASE_PICK_STATUS.OPEN) {
                                            lstCartDetails[i].ITEMSTATUS = false;
                                            lstCartDetails[i].isHoldQty = false;
                                            lstCartDetails[i].isPickQty = false;
                                            this.lnkItemStatus = true;
                                            if (lstCartDetails[i].ITEM_STATUS === "Y") {
                                                lstCartDetails[i].ITEMSTATUS = true;
                                                lstCartDetails[i].isHoldQty = false;
                                                lstCartDetails[i].isPickQty = false;
                                            }
                                            else {

                                                lstCartDetails[i].ITEMSTATUS = false;
                                                lstCartDetails[i].isHoldQty = true;
                                                lstCartDetails[i].isPickQty = true;
                                            }
                                        }
                                        else {
                                            lstCartDetails[i].isHoldQty = true;
                                            lstCartDetails[i].isPickQty = true;
                                            this.lnkItemStatus = false;
                                        }

                                    }


                                }
                                if (this.isDetailSaved == true) {
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved successfully" });
                                    this.lstCaseData = lstCartDetails;
                                    sessionStorage.setItem("cartDetails", JSON.stringify(this.lstCaseData));
                                    return this.lstCaseData;
                                }
                                else {
                                    this.lstCaseData = lstCartDetails;
                                    sessionStorage.setItem("cartDetails", JSON.stringify(this.lstCaseData));
                                    return this.lstCaseData;
                                }
                            }

                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }


                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    lookup() {

        let strItemID: string = '';
        let _sbSearch: string = '';
        try {
            strItemID = this.subItem.ITEMID;
            this.statusMsgs = [];
            if (strItemID == null || strItemID == '' || strItemID == undefined) {
                this.lookupitem = false;
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter any search text" });
                return;

            }

            let filterItems: VM_SEARCHITEM_DETAILS[] = [];
            let itemIfo: VM_SEARCHITEM_DETAILS[] = [];
            itemIfo = this.lstSearchDetails;
            let filtercount: number = 0;
            let _sbSearch: string = '';
            if (itemIfo != null && itemIfo != undefined) {
                if (itemIfo.length > 0) {

                    if (strItemID == '%') {
                        filterItems = itemIfo;
                    }
                    else if (strItemID != null && strItemID != '') {

                        filterItems = itemIfo.filter(x => (x.ITEMID.toLowerCase() == strItemID.toLowerCase()) || (x.MFG_ITEM_ID.toLowerCase() == strItemID.toLowerCase()) || (x.VENDOR_ITEM_ID.toLowerCase() == strItemID.toLowerCase()) ||
                            (x.UPCID.toLowerCase() == strItemID.toLowerCase()) || (x.GTIN.toLowerCase() == strItemID.toLowerCase())
                            || (x.ITEM_DESCR.toLowerCase().indexOf(strItemID.toLowerCase()) >= 0));

                    }
                    this.lookupitem = false;
                    if (filterItems.length > 0) {

                        this.lstSubItemData = [];
                        this.subItem.ITEMID = filterItems[0].ITEMID;
                        this.subItem.ITEM_DESCR = filterItems[0].ITEM_DESCR;

                        if (filterItems.length != 1) {
                            filterItems.forEach(item => {
                                if (this.lstSubItemData.filter(x => x.ITEMID == item.ITEMID && x.ITEM_DESCR == item.ITEM_DESCR
                                    && x.CUST_ITEM_ID == item.CUST_ITEM_ID && x.VENDOR_ITEM_ID == item.VENDOR_ITEM_ID && x.MFG_ITEM_ID == item.MFG_ITEM_ID
                                    && x.UPCID == item.UPCID && x.GTIN == item.GTIN).length == 0) {
                                    this.lstSubItemData.push(item);

                                }
                            });
                        }
                        if (this.lstSubItemData.length > 1) {
                            this.lookupitem = true;
                        }
                    }
                    else {
                        this.subItem.ITEM_DESCR = '';
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter the valid item" });
                        return;
                    }
                }
                else {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No locations allocated" });
                    return;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {

        }
    }

    async onCaseDetailsClick(caseInfo: VM_MT_POU_CASE_CART_HEADER_TB, event) {

        this.breadCrumbMenu.SUB_MENU_NAME = 'Case Details';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        try {

            let getDetailsBool: boolean = await this.Details_Load(caseInfo);

            if (getDetailsBool) {
                this.editform = true;
                this.page = false;
                this.showGrid = false;
                this.showItemGrid = true;
                this.additem = false;
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async onCaseDetailsGoBackClick() {

        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        try {
            this.statusMsgs = [];
            this.editform = false;
            this.page = true;
            this.showGrid = true;
            this.showItemGrid = false;
            this.additem = false;
            this.subItem.ITEMID = '';
            this.subItem.ITEM_DESCR = '';
            this.lookupitem = false;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    onItemSearchClick() {

        try {
            this.showItemGrid = false;
            this.addItems = false;
            this.editform = false;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    onAddItems() {

        try {

            this.showItemGrid = true;
            this.addItems = true;

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async insertSubItems() {

        let lstProcedures: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let lstProcoCode: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let filter: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let filterRow: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
        let filterItem: VM_SEARCHITEM_DETAILS[] = [];
        let filterCaseInfo: VM_POU_CART_DETAILS[] = [];
        try {
            lstProcedures = this.objCaseInfo.lstCaseforQA;
            filter = this.objCaseInfo.lstCaseforQA.filter(x => x.CASE_ID == this.itemCaseID && x.PROCEDURE_CODE == this.subItem.PROCEDURE_CODE);
            filterRow = this.objCaseInfo.lstCaseforQA.filter(x => x.CASE_ID == this.itemCaseID && x.PROCEDURE_CODE == this.subItem.PROCEDURE_CODE && x.PREF_LIST_ID == this.subItem.PREF_LIST_ID);
            filterItem = this.lstSearchDetails.filter(x => x.CUST_ITEM_ID == this.subItem.ITEMID);
            if (filterItem.length == 0) {
                filterItem = this.lstSearchDetails.filter(x => x.ITEMID == this.subItem.ITEMID);
                if (filterItem.length == 0) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid item' });
                    return;
                }
            }

            if (this.isDetails == true) {

                if (this.subItem.PROCEDURE_CODE == null || this.subItem.PROCEDURE_CODE == '' || this.subItem.PROCEDURE_CODE == undefined) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid Procedure Code' });
                    return;
                }
                else if (filter.length == 0) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid Procedure Code' });
                    return;
                }
                else if (this.subItem.PREF_LIST_ID == null || this.subItem.PREF_LIST_ID == '' || this.subItem.PREF_LIST_ID == undefined) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid Preference List' });
                    return;
                }
                else if (filterRow.length == 0) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid Preference List' });
                    return;
                }
            }
            if (this.subItem.ITEMID == null || this.subItem.ITEMID == '' || this.subItem.ITEMID == undefined) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid item' });
                return;
            }
            else if ((this.subItem.OLD_PICK_QTY == null || this.subItem.OLD_PICK_QTY == '' || this.subItem.OLD_PICK_QTY == undefined) &&
                (this.subItem.HOLD_QTY == null || this.subItem.HOLD_QTY == '' || this.subItem.HOLD_QTY == undefined)) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Open Qty / Hold Qty' });
                return;
            }
            else if (parseFloat(this.subItem.OLD_PICK_QTY) > parseFloat(this._strMaxAllowQty)) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Open qty must not be greater than max allowable quantity' });
                return;
            }
            else if (parseFloat(this.subItem.HOLD_QTY) > parseFloat(this._strMaxAllowQty)) {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Hold qty must not be greater than max allowable quantity' });
                return;
            }
            if (this.isDetails == false) {
                filterCaseInfo = this.lstCaseItemsInfo.filter(x => x.PROCEDURE_CODE == this.procedureCode && x.PREF_LIST_ID == this.preferenceList && x.ITEM_ID == this.subItem.ITEMID)
                if (filterCaseInfo.length > 0) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Item already exists' });
                    await this.onClearData();
                    return;
                }

            }
            else {
                filterCaseInfo = this.lstCaseItemsInfo.filter(x => x.PROCEDURE_CODE == this.subItem.PROCEDURE_CODE && x.PREF_LIST_ID == this.subItem.PREF_LIST_ID && x.ITEM_ID == this.subItem.ITEMID)
                if (filterCaseInfo.length > 0) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Item already exists' });
                    await this.onClearData();
                    return;
                }
            }
            let item = new VM_SEARCHITEM_DETAILS();
            if (this.isDetails == false) {
                item.PROCEDURE_CODE = this.procedureCode;
                item.PREF_LIST_ID = this.preferenceList;
            }
            else {
                item.PROCEDURE_CODE = this.subItem.PROCEDURE_CODE;
                item.PREF_LIST_ID = this.subItem.PREF_LIST_ID;
            }
            if ((this.subItem.OLD_PICK_QTY != null && this.subItem.OLD_PICK_QTY != '' && this.subItem.OLD_PICK_QTY != undefined) &&
                (this.subItem.HOLD_QTY == null || this.subItem.HOLD_QTY == '' || this.subItem.HOLD_QTY == undefined)) {
                this.subItem.HOLD_QTY = '0';
            }
            if ((this.subItem.OLD_PICK_QTY == null || this.subItem.OLD_PICK_QTY == '' || this.subItem.OLD_PICK_QTY == undefined) &&
                (this.subItem.HOLD_QTY != null && this.subItem.HOLD_QTY != '' && this.subItem.HOLD_QTY != undefined)) {
                this.subItem.OLD_PICK_QTY = '0';
            }
            item.ITEM = this.subItem.ITEMID;
            item.ITEM_DESCR = this.subItem.ITEM_DESCR;
            item.OLD_PICK_QTY = this.subItem.OLD_PICK_QTY;
            item.HOLD_QTY = this.subItem.HOLD_QTY;
            item.IS_NEWITEM = "Y";
            item.isNew = true;
            this.lstCaseData.push(item);
            this.statusMsgs = [];
            this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Item added successfully' });
            await this.onClearData();
            this.additem = false;
            this.lookupitem = false;

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async onClearData() {

        try {
            this.subItem.PROCEDURE_CODE = '';
            this.subItem.PREF_LIST_ID = '';
            this.subItem.ITEMID = '';
            this.subItem.ITEM_DESCR = '';
            this.subItem.OLD_PICK_QTY = '';
            this.subItem.HOLD_QTY = '';
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    selectedRow(selectedRowData: VM_SEARCHITEM_DETAILS) {

        try {
            if (selectedRowData.CUST_ITEM_ID != null && selectedRowData.CUST_ITEM_ID != '' && selectedRowData.CUST_ITEM_ID != undefined) {
                this.subItem.ITEMID = selectedRowData.CUST_ITEM_ID;
            }
            else {
                this.subItem.ITEMID = selectedRowData.ITEMID;
            }
            this.subItem.ITEM_DESCR = selectedRowData.ITEM_DESCR;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async SaveReviewCaseItems() {

        this.lstReviewedItems = [];
        let msg: string = '';;
        try {
            this.lstCaseData.filter(info => {
                let newItem: boolean = false;
                info.ITEM_ID = info.ITEM;
                info.CASE_ID = this.itemCaseID;
                info.PICK_QTY = info.OLD_PICK_QTY;
                if ((info.OLD_PICK_QTY == null || info.OLD_PICK_QTY == '' || info.OLD_PICK_QTY == undefined) &&
                    (info.HOLD_QTY == null || info.HOLD_QTY == '' || info.HOLD_QTY == undefined)) {
                    if ((info.OLD_PICK_QTY != '0' && info.HOLD_QTY != '0')) {
                        msg = 'Please enter Open Qty / Hold Qty';
                        return;
                    }
                }
                info.OLD_PICK_QTY = info.OLD_PICK_QTY == '' ? '0' : info.OLD_PICK_QTY;
                info.HOLD_QTY = info.HOLD_QTY == '' ? '0' : info.HOLD_QTY;
                if (info.IS_NEWITEM == "Y") {
                    info.ITEM_STATUS = "Y";
                    newItem = true;
                }
                if ((info.OLD_PICK_QTY != info.oldpickqty) || (info.HOLD_QTY != info.oldholdqty)) {
                    newItem = true;
                }
                if (info.itemStatus == null || info.itemStatus == '' || info.itemStatus == undefined) {
                    info.itemStatus = info.ITEM_STATUS;
                }
                if (info.ITEM_STATUS != info.itemStatus) {
                    newItem = true;
                }
                if (newItem) {

                    if (parseFloat(info.OLD_PICK_QTY) > parseFloat(this._strMaxAllowQty)) {
                        msg = 'Open qty must not be greater than max allowable quantity';
                        return;
                    }
                    else if (parseFloat(info.HOLD_QTY) > parseFloat(this._strMaxAllowQty)) {
                        msg = 'Hold qty must not be greater than max allowable quantity';
                        return;
                    }
                    else {
                        this.lstReviewedItems.push(info);
                    }
                }

            });
            if (msg != '') {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                return;

            }

            this.spinnerService.start();
            if (this.lstReviewedItems.length > 0) {

                await this.manageCasesService.SaveReviewCaseItems(this.lstReviewedItems).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let resp = res.json() as AtParWebApiResponse<MT_POU_CASE_CART_DETAILS>
                        this.spinnerService.stop();
                        this.statusCode = resp.StatusCode;
                        switch (resp.StatType) {
                            case StatusType.Success:
                                break;
                            case StatusType.Error:
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Error while getting data" });
                                break;
                            case StatusType.Warn:
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                break;
                        }
                    });

                if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                    this.isDetailSaved = true;
                    await this.itemBindGrid();
                    this.isDetailSaved = false;

                }
            }
            else {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No items to review" });
                return;
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    onAddItemClick() {

        try {
            this.subItem = new VM_SEARCHITEM_DETAILS();
            this.lookupitem = false;
            this.lstSubItemData = [];
            setTimeout(() => {
                (<HTMLInputElement>document.getElementById("txtItemID")).focus();

            }, 500);
            this.additem = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async updateSubItems(subItemData: any, event) {

        try {
            if (event == true) {
                subItemData.itemStatus = subItemData.ITEM_STATUS;
                subItemData.ITEM_STATUS = "Y";
                subItemData.isPickQty = false;
                subItemData.isHoldQty = false;
            }
            else {
                subItemData.itemStatus = subItemData.ITEM_STATUS;
                subItemData.ITEM_STATUS = "N";
                subItemData.isPickQty = true;
                subItemData.isHoldQty = true;
                let filterData: any[] = (JSON.parse(sessionStorage.getItem("cartDetails"))).filter((x) => x.ITEM == subItemData.ITEM);
                if (filterData != null && filterData != undefined) {
                    if (filterData.length > 0) {
                        subItemData.OLD_PICK_QTY = filterData[0].OLD_PICK_QTY;
                        subItemData.HOLD_QTY = filterData[0].HOLD_QTY;
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    updateItems(item: VM_MT_POU_CASE_CART_HEADER_TB, event) {

        if (event == true) {
            item.CHECKED = "true";
        }
        else {
            item.CHECKED = "false";
        }

    }

    close() {

        this.additem = false;
        this.statusMsgs = [];
    }

    OnDestroy() {

        this.deviceTokenEntry = null;
        this.noOfRecords = null;
        this.defDateRange = null;
        this.statusCode = null;
        this.strVndrReviewReq = null;
        this.strCaseEditingOption = null;
        this.lstDepts = null;
        this.lstServiceCodes = null;
        this.lstCaseDescr = null;
        this.objCaseInfo = null;
        this.lstCaseInfo = null;
        this.lstCaseForQA = null;
        this.lstCaseItemsInfo = null;
        this.lstProcedureCodes = null;
        this.lstPrefItems = null;
        this.strChkValues = null;
        this.colArr = null;
        this.strOption = null;
        this.strCaseID = null;
        this.strDeptID = null;
        this.strServiceCode = null;
        this.caseID = null;
        this.deptID = null;
        this.serviceCode = null;
        this.fromDate = null;
        this.toDate = null;
        this.statusData = null;
        this.repCaseData = null;
        this.statusList = null;
        this.itemStatus = null;

        this.lstCasesItems = null;
        this.lstServiceCodesItems = null;
        this.statusMsgs = null;
        this.lstProcedureItems = null;
        this.lstProcedureItemsList = null;
        this.lstProcedures = null;
        this.lstPhysiciansItems = null;
        this.lstPhysiciansItemsList = null;
        this.lstPhysicians = null;
        this.lstPreferenceItems = null;
        this.lstPreferenceItemsList = null;
        this.lstPreferences = null;
        this.totallstpreferences = null;
        this.lstdeptItems = null;
        this.lstdeptItemsList = null;
        this.lstdepts = null;
        this.lstdeptcostcenters = null;
        this.lstSearchDetails = null;
        this.lstReviewedItems = null;
        this.ProcedureItem = null;
        this.PhysiciansItem = null;
        this.caseId = null;
        this.caseDesc = null;
        this.performDate = null;
        this.Preference = null;
        this.patient = null;
        this.dept = null;
        this.convertDate = null;
        this.currentDate = null;
        this.strcostcenter = null;
        this.txtcaseIDStatus = null;
        this.txtcaseDescStatus = null;
        this.txtpatientStatus = null;
        this.performDateStatus = null;
        this.physiciansItemStatus = null;
        this.procedureItemStatus = null;
        this.preferenceStatus = null;
        this.deptStatus = null;
        this.replacePref_patient = null;
        this.replacePref_Procedure = null;
        this.rep_Preference = null;
        this.lstReplacePreference = null;
        this.lstReplacePreferenceItemsList = null;
        this.lstReplacePreferenceItems = null;
        this.dtCases = null;
        this.dtCasesItem = null;
        this.m_IsAddCaseEnabled = null;
        this.m_IsChangeStatusEnabled = null;
        this.m_IsReplaceCaseEnabled = null;
        this.m_IsReplacePrefEnabled = null;
        this.repCaseValue = null;
        this.statusValue = null;
        this.checked = null;
        this.prefListID = null;
        this.procCode = null;
        this._strMaxAllowQty = null;
        this.status = null;
        this.patID = null;
        this.qCaseId = null;
        this.itemCaseID = null;
        this.physician = null;
        this.dataDictionary = null;
        this.lstCaseData = null;
        this.lookupItem = null;
        this.description = null;
        this.mfgItem = null;
        this.venItem = null;
        this.upcID = null;
        this.gtin = null;
        this.subItem = null;
        this.lstSubItemData = null;
    }
}