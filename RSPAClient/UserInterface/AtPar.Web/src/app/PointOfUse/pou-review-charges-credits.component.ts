
import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';

import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { ReviewChargesCreditsServices } from './POU-REVIEW-CHARGES-CREDITS.SERVICE';
import { Http, Response } from "@angular/http";

import {
    StatusType,
    TokenEntry_Enum,
    YesNo_Enum,
    DataSet_Type,
    EnumApps,
    MailPriority
} from '../Shared/AtParEnums';

import { AtParConstants } from '../Shared/AtParConstants';

import {
    Message,
    SelectItem
} from '../components/common/api';

import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { VM_MT_POU_USER_DEPARTMENTS } from '../Entities/VM_MT_POU_USER_DEPARTMENTS';
import { VM_POU_CREDIT_HEADER } from '../Entities/VM_POU_CREDIT_HEADER';
import { VM_POU_CREDIT_DETAILS } from '../Entities/VM_POU_CREDIT_DETAILS';
import { VM_DEPARTMENT_CART_ITEMS } from '../Entities/VM_DEPARTMENT_CART_ITEMS';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { Menus } from '../AtPar/Menus/routepath';
import { saveAs } from 'file-saver';

declare var module: {
    id: string;
}
@Component({

    templateUrl: 'pou-review-charges-credits.component.html',

    providers: [
        AtParCommonService,
        AtParConstants,
        ReviewChargesCreditsServices
    ]

})

export class ReviewChargesCreditsComponent {


    isPostback: boolean = false;
    isMailDialog: boolean = false;
    showDDStatus: boolean = true;
    showTxtLotNumber: boolean = true;
    showTxtSerNumber: boolean = true;
    btn_SubmitReviews: boolean = false;
    btn_SubmitReviewsTop: boolean = false;
    gvCharges: boolean = false;
    grdCredits: boolean = false;
    tbReviewCharges: boolean = true;
    tdExports: boolean = false;
    pageForm: boolean = true;
    addChargeForm: boolean = false;
    editChargeForm: boolean = false;
    editCreditForm: boolean = false;

    statusCode: number = -1;
    noOfRecords: number = 0;
    defDateRange: number = 0;
    lblResultCount: number = 0;
    reviewChargesRows: number = 0;
    creditsRows: number = 0;
    startIndex: number;
    EndIndex: number;

    strUserId: string = '';
    strMaxAllowQty: string = '';
    strTransactionId: string = '';
    deviceTokenEntry: string[] = [];
    patientID: string = '';
    accountID: string = '';
    examID: string = '';
    comments: string = '';
    selectedDept: string = '';
    selectedStatus: string = '';
    activeTab: string = '';
    lit_GridVisible: string = 'N';
    selectedItemID: string = '';
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    ipAddress: string;
    _lblPatientID: string = '';
    toMailAddr: string = '';

    htCharges: any[] = [];
    dsItems: any[] = [];
    lstDeptId: any[] = [];
    lstStatus: any[] = [];
    lstItemIDs: any[] = [];

    fromDate: Date;
    toDate: Date;
    currentDate: Date;

    breadCrumbMenu: Menus;
    editChargeData: VM_POU_CREDIT_HEADER;
    addChargeData: VM_POU_CREDIT_HEADER;
    chargeNewItem: VM_POU_CREDIT_DETAILS;
    editCreditData: VM_POU_CREDIT_HEADER;

    msgs: Message[] = [];
    dvChargesHeaders: VM_POU_CREDIT_HEADER[] = [];
    dvChargesDetails: VM_POU_CREDIT_DETAILS[] = [];
    dvCreditHeaders: VM_POU_CREDIT_HEADER[] = [];
    dvCreditDetails: VM_POU_CREDIT_DETAILS[] = [];
    dsDeptItems: VM_DEPARTMENT_CART_ITEMS[] = [];
    lstChkCharges: VM_POU_CREDIT_HEADER[] = [];
    lstChargesFilterData: VM_POU_CREDIT_HEADER[] = [];
    disableButton: boolean = false;
    txtItemIDStatus: number;
    txtChargeCodeStatus: number;
    txtLotNumberStatus: number;
    txtSerialNumberStatus: number;
    txtQuantityStatus: number;
    txtPriceStatus: number;
    updateData: any;

    constructor(
        private httpService: HttpService,
        private commonService: AtParCommonService,
        private spinnerService: SpinnerService,
        private reviewCreditsService: ReviewChargesCreditsServices,
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
        this.tbReviewCharges = false;
        try {

            try {
                this.spinnerService.start();
                this.statusCode = -1;
                this.strUserId = this.deviceTokenEntry[TokenEntry_Enum.UserID];
                this.statusCode = await this.getMyPreferences();
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

            await this.bindDropDowns();

            this.currentDate = new Date();
            this.toDate = new Date();
            this.fromDate = new Date();
            if (this.defDateRange.toString() != '' && this.defDateRange != null) {
                this.fromDate = await this.addDays(this.fromDate, -this.defDateRange);
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    async getMyPreferences() {
        try {
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
            try {
                await this.commonService.getMyPreferences('RECORDS_PER_PAGE', this.deviceTokenEntry)
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<number>;
                        this.statusCode = data.StatusCode;
                        if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                            this.noOfRecords = parseInt(data.DataVariable.toString());
                        }
                    });
                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    return AtparStatusCodes.E_SERVERERROR;
                }
            } catch (ex) {
                return AtparStatusCodes.E_SERVERERROR;
            }

        } catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }
        return AtparStatusCodes.ATPAR_OK;
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

    async bindDropDowns() {
        try {
            this.statusCode = await this.getUserDepartments();
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                this.msgs = [];
                if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Department(s) allocated to user ' });
                }
                else {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed to get User Departments' });
                }
                return;
            }
        } catch (ex) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Error while retrieving Departments' });
            return;
        }
    }

    async getUserDepartments() {
        try {
            this.lstDeptId = [];
            this.lstDeptId.push({ label: "Select Department", value: "Select Department" });
            await this.commonService.getUserDepartments(this.strUserId, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry)
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_MT_POU_USER_DEPARTMENTS>;
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        let lstDept: VM_MT_POU_USER_DEPARTMENTS[] = [];
                        lstDept = data.DataList;
                        lstDept.forEach(dept => {
                            this.lstDeptId.push({ label: dept.DEPARTMENT_ID + ' - ' + dept.DEPT_NAME, value: dept.DEPARTMENT_ID });
                        });
                    }
                });

            this.lstStatus = [];
            this.lstStatus.push({ label: 'Not Reviewed', value: '0' });
            this.lstStatus.push({ label: 'Submitted', value: '1' });
            this.lstStatus.push({ label: 'Error', value: '2' });
            this.selectedStatus = '0';

            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                return this.statusCode;
            }
        } catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }
        return AtparStatusCodes.ATPAR_OK;
    }

    async onGoClick() {
        try {

            this.spinnerService.start();
            this.statusCode = -1;
            this.msgs = [];
            this.btn_SubmitReviews = false;
            this.btn_SubmitReviewsTop = false;
            this.gvCharges = false;
            this.grdCredits = false;
            this.lblResultCount = 0;
            this.tbReviewCharges = false;
            this.tdExports = false;
            this.activeTab = 'Charges';
            let returnValue: boolean = false;
            //returnValue = await this.clearCheckedFields();
            returnValue = await this.validateSearchFields();

            if (returnValue) {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
                await this.bindChargesGrid();
                //await this.getDepartmentItems();
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }

        finally {
            this.spinnerService.stop();
        }
    }

    async clearCheckedFields() {
        try {
            sessionStorage.removeItem('CHECKED_ITEMS');
            sessionStorage.removeItem('UNCHECKED_ITEMS');
            sessionStorage.removeItem('ChargesHashTable');
            return await true;
        } catch (ex) {
            return await false;
        }
    }

    validateSearchFields() {
        try {
            this.msgs = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                    return false;
                }
                else {
                    if (this.selectedDept == null || this.selectedDept == undefined || this.selectedDept == '' || this.selectedDept == 'Select Department') {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Department" });
                        return false;
                    }
                }
            }
            else {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;

        } catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    }

    async bindChargesGrid() {
        try {
            this.statusCode = -1;
            this.msgs = [];
            let ds: any[] = [];
            let dvCharges: any[] = [];
            let tempTodate: string = '';
            let strDeptID: string = this.selectedDept;

            let cDate = new Date();
            cDate.setDate(this.toDate.getDate() + 1);

            let fromDate: string = await this.convertDateFormate(this.fromDate);
            let toDate: string = await this.convertDateFormate(cDate);
            sessionStorage.setItem('reviewStatus', this.selectedStatus);

            await this.reviewCreditsService.getCharges(fromDate, toDate, this.patientID, this.examID, this.accountID, strDeptID,
                this.comments, parseInt(this.selectedStatus), parseInt(EnumApps.PointOfUse.toString()))
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json();
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.lit_GridVisible = 'N';
                        this.btn_SubmitReviews = false;
                        this.btn_SubmitReviewsTop = false;
                        this.gvCharges = false;
                        this.lblResultCount = 0;
                        this.tbReviewCharges = true;
                        this.tdExports = false;
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No open transactions found for the given search criteria, try another date range' });
                        return;
                    } else if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.dvChargesHeaders = data.DataDictionary[DataSet_Type[DataSet_Type.HEADERS.toString()]];
                        this.dvChargesDetails = data.DataDictionary[DataSet_Type[DataSet_Type.DETAILS.toString()]];

                        this.dvChargesDetails.forEach(detail => {

                            detail.ITEM_COUNT = parseFloat(detail.ITEM_COUNT).toFixed(2);
                            detail.ITEM_PRICE = detail.ITEM_PRICE == null ? parseFloat('0').toFixed(2) : parseFloat(detail.ITEM_PRICE).toFixed(2);
                        })

                        this.dvChargesHeaders.forEach(header => {
                            let details: VM_POU_CREDIT_DETAILS[] = [];
                            details = this.dvChargesDetails.filter(detail => detail.TRANSACTION_ID == header.TRANSACTION_ID);
                            header.DETAILS = details;;
                        });

                        if (this.dvChargesHeaders.length > 0) {
                            this.lit_GridVisible = 'Y';
                            this.btn_SubmitReviews = true;
                            this.btn_SubmitReviewsTop = true;
                            this.lblResultCount = this.dvChargesHeaders.length

                            sessionStorage.setItem('_DS', JSON.stringify(data.DataList));

                            if (this.noOfRecords == 0) {
                                this.reviewChargesRows = this.dvChargesHeaders.length;
                            } else {
                                this.reviewChargesRows = this.noOfRecords;
                            }

                            this.gvCharges = true;
                            this.tbReviewCharges = true;
                            this.tdExports = true;
                            sessionStorage.setItem('_DS', JSON.stringify(this.dvChargesHeaders));
                        }

                    } else if (this.statusCode == AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Local DB select failed' });
                        this.tdExports = false;
                        return;
                    } else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Failed to get Charge' });
                        this.tdExports = false;
                        return;
                    }
                });
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async bindCreditsGrid() {
        try {
            this.statusCode = -1;
            this.showDDStatus = false;
            this.msgs = [];
            let dsCredit: any[] = [];
            let strDeptID: string = this.selectedDept;

            let cDate = new Date();
            cDate.setDate(this.toDate.getDate() + 1);

            let fromDate: string = await this.convertDateFormate(this.fromDate);
            let toDate: string = await this.convertDateFormate(cDate);

            await this.reviewCreditsService.getCredits(fromDate, toDate, this.patientID, this.examID, this.accountID, this.selectedDept, this.comments, false)
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json();
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No open transactions found for the given search criteria, try another date range' });
                        this.btn_SubmitReviews = false;
                        this.btn_SubmitReviewsTop = false;
                        this.gvCharges = false;
                        this.tdExports = false;
                        this.lblResultCount = 0;
                        return;
                    } else if (this.statusCode == AtparStatusCodes.ATPAR_OK) {

                        this.dvCreditHeaders = data.DataDictionary[DataSet_Type[DataSet_Type.HEADERS.toString()]];
                        this.dvCreditDetails = data.DataDictionary[DataSet_Type[DataSet_Type.DETAILS.toString()]];

                        this.dvCreditDetails.forEach(detail => {
                            detail.ITEM_COUNT = parseFloat(detail.ITEM_COUNT).toFixed(2);
                            detail.ITEM_PRICE = detail.ITEM_PRICE == null ? parseFloat('0').toFixed(2) : parseFloat(detail.ITEM_PRICE).toFixed(2);
                            detail.BILLED_QTY = detail.BILLED_QTY == null ? detail.BILLED_QTY : parseFloat(detail.BILLED_QTY).toFixed(2);
                            detail.CREDIT_QTY = detail.CREDIT_QTY == null ? detail.CREDIT_QTY : parseFloat(detail.CREDIT_QTY).toFixed(2);
                        })

                        this.dvCreditHeaders.forEach(header => {
                            let details: VM_POU_CREDIT_DETAILS[] = [];
                            details = this.dvCreditDetails.filter(detail => detail.TRANSACTION_ID == header.TRANSACTION_ID);
                            header.DETAILS = details;
                        });

                        if (this.dvCreditHeaders.length > 0) {
                            this.lblResultCount = this.dvCreditHeaders.length;
                            sessionStorage.setItem('CreditDetails', JSON.stringify(this.dvCreditHeaders));
                            if (this.noOfRecords == 0) {
                                this.creditsRows = this.dvCreditHeaders.length;
                            } else {
                                this.creditsRows = this.noOfRecords;
                            }
                            this.grdCredits = true;
                            this.tdExports = true;

                            sessionStorage.setItem('CreditDetails', JSON.stringify(this.dvCreditHeaders));
                        }

                    } else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.dvCreditHeaders.length + ' Failed to get Credits.' });
                        return;
                    }

                });

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async getDepartmentItems() {
        try {
            this.lstItemIDs = [];
            this.lstItemIDs.push({ label: 'Select Item', value: 'Select Item' });
            await this.reviewCreditsService.getDepartmentItems(this.selectedDept, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json();
                    if (data.StatusCode == AtparStatusCodes.ATPAR_OK) {
                        this.dsDeptItems = data.DataList;
                        sessionStorage.setItem('dsItems', JSON.stringify(this.dsDeptItems));
                        if (this.dsDeptItems.length > 0) {
                            this.dsDeptItems.forEach(item => {
                                this.lstItemIDs.push({ label: item.ITEM_ID + '-' + item.ITEM_DESCRIPTION, value: item.ITEM_ID });
                            });
                        }
                    }
                    else if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Items Found.' });
                    }
                    else {
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                    }
                });
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async selectedTabIndexChanged(event: any) {
        try {
            if (this.isPostback) {
                this.spinnerService.start();
                if (event != null) {
                    this.activeTab = event.title;
                }
                this.lblResultCount = 0;
                this.msgs = [];
                if (this.activeTab.trim() == 'Charges') {
                    this.btn_SubmitReviews = true;
                    this.btn_SubmitReviewsTop = true;
                    this.gvCharges = true;
                    this.grdCredits = false;
                    this.showDDStatus = true;

                    if (await this.validateSearchFields()) {
                        await this.bindChargesGrid();
                    }
                    else {
                        this.gvCharges = false;
                        this.btn_SubmitReviews = false;
                        this.btn_SubmitReviewsTop = false;
                        this.tdExports = false;
                    }
                }
                else if (this.activeTab == 'Credits') {
                    this.selectedStatus = '0';
                    this.btn_SubmitReviews = false;
                    this.btn_SubmitReviewsTop = false;
                    this.gvCharges = false;
                    this.showDDStatus = false;

                    if (await this.validateSearchFields()) {
                        await this.bindCreditsGrid();
                    }
                    else {
                        this.tdExports = false;
                    }
                }
            } else {
                this.isPostback = true;
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onChargesFilterData(data) {
        try {
            this.lstChargesFilterData = data;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async checkAllCharges() {
        try {
            this.spinnerService.start();
            this.lstChkCharges = [];
            if (this.lstChargesFilterData != null && this.lstChargesFilterData != undefined && this.lstChargesFilterData.length != 0) {

                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.lstChargesFilterData.length) {
                    this.EndIndex = this.lstChargesFilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstChargesFilterData[i].REVIEWED = true;
                    this.lstChkCharges.push(this.lstChargesFilterData[i]);
                }
            }
            else {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.dvChargesHeaders.length) {
                    this.EndIndex = this.dvChargesHeaders.length;

                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.dvChargesHeaders[i].REVIEWED = true;
                    this.lstChkCharges.push(this.dvChargesHeaders[i]);
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async unCheckAllCharges() {
        try {
            this.spinnerService.start();
            this.lstChkCharges = [];
            if (this.lstChargesFilterData != null && this.lstChargesFilterData != undefined && this.lstChargesFilterData.length != 0) {

                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.lstChargesFilterData.length) {
                    this.EndIndex = this.lstChargesFilterData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstChargesFilterData[i].REVIEWED = false;
                    this.lstChkCharges.push(this.lstChargesFilterData[i]);
                }
            }
            else {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.dvChargesHeaders.length) {
                    this.EndIndex = this.dvChargesHeaders.length;

                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.dvChargesHeaders[i].REVIEWED = false;
                    this.lstChkCharges.push(this.dvChargesHeaders[i]);
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onSaveReviewsClick() {
        try {
            this.spinnerService.start();
            this.statusCode = -1;
            this.msgs = [];

            let lstReviewed: VM_POU_CREDIT_HEADER[] = [];
            let reviewObj: VM_POU_CREDIT_HEADER = null;

            let status = JSON.parse(sessionStorage.getItem('reviewStatus'));

            await this.dvChargesHeaders.forEach(header => {
                reviewObj = new VM_POU_CREDIT_HEADER();
                reviewObj.TRANSACTION_ID = header.TRANSACTION_ID;
                reviewObj.REVIEWED = header.REVIEWED;
                if (parseInt(status) == 0) {
                    if (reviewObj.REVIEWED == true) {
                        lstReviewed.push(header);
                    }
                }
                else if (parseInt(status) == 1) {
                    if (reviewObj.REVIEWED == false) {
                        lstReviewed.push(header);
                    }
                }
                else if (parseInt(status) == 2) {
                    lstReviewed.push(header);
                }
            });

            if (lstReviewed.length > 0) {

                await this.reviewCreditsService.setReviewed(lstReviewed)
                    .then((res: Response) => {
                        let data = res.json();
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.gvCharges = false;
                                this.btn_SubmitReviews = false;
                                this.btn_SubmitReviewsTop = false;
                                this.lblResultCount = 0;
                                this.tbReviewCharges = false;
                                this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Warn, detail: 'Reviewed successfully' });
                                break;
                            }
                            case StatusType.Warn: {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                    });



            } else {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select/unselect the transaction(s) before saving the review' });
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async addCharge(charge: VM_POU_CREDIT_HEADER) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        try {
            this.spinnerService.start();
            this.addChargeData = new VM_POU_CREDIT_HEADER();
            this.addChargeData = charge;
            this.chargeNewItem = new VM_POU_CREDIT_DETAILS();
            this.msgs = [];

            await this.getDepartmentItems();
            this.disableButton = true;
            this.pageForm = false;
            this.editChargeForm = false;
            this.addChargeForm = true;
            this.selectedItemID = "";

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async editCharge(charge: VM_POU_CREDIT_HEADER) {

        this.breadCrumbMenu.SUB_MENU_NAME = 'Update Charges';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

        try {
            this.spinnerService.start();
            let _DS: VM_POU_CREDIT_HEADER[] = [];
            _DS = JSON.parse(sessionStorage.getItem('_DS')) as VM_POU_CREDIT_HEADER[];
            this.msgs = [];

            let editCharge: VM_POU_CREDIT_HEADER[] = [];

            editCharge = await _DS.filter(x => x.TRANSACTION_ID == charge.TRANSACTION_ID);

            if (editCharge.length > 0) {
                this.editChargeData = new VM_POU_CREDIT_HEADER();
                this.editChargeData = editCharge[0];
                await this.editChargeData.DETAILS.forEach(detail => {
                    detail.ITEM_COUNT = parseInt(detail.ITEM_COUNT);
                    //detail.ITEM_PRICE = parseInt(detail.ITEM_PRICE);
                });
            }

            this.pageForm = false;
            this.addChargeForm = false;
            this.editChargeForm = true;

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async bindModelDataChange(event: any) {

        //if ("txtIAddCC" == event.TextBoxID.toString()) {
        //    this.txtChargeCodeStatus = await event.validationrules.filter(x => x.status == false).length;
        //}
        //if ("txtLNum" == event.TextBoxID.toString()) {
        //    this.txtLotNumberStatus = event.validationrules.filter(x => x.status == false).length;
        //}
        //if ("txtISNum" == event.TextBoxID.toString()) {
        //    this.txtSerialNumberStatus = event.validationrules.filter(x => x.status == false).length;
        //}
        //if ("txtQty" == event.TextBoxID.toString()) {
        //    this.txtQuantityStatus = event.validationrules.filter(x => x.status == false).length;
        //}
        //if ("txtIPrice" == event.TextBoxID.toString()) {
        //    this.txtPriceStatus = event.validationrules.filter(x => x.status == false).length;
        //}
        //if (this.submitButtonTitle == "Update") {
        //    this.txtItemIDStatus = 0;

        //    if (this.txtShortDescStatus >= 1) {
        //        this.txtShortDescStatus = 1;
        //    }
        //    else {
        //        this.txtShortDescStatus = 0;
        //    }

        //    if (this.txtCustItemIdStatus >= 1) {
        //        this.txtCustItemIdStatus = 1;
        //    }
        //    else {
        //        this.txtCustItemIdStatus = 0;
        //    }

        //    if (this.txtVendItemIdStatus >= 1) {
        //        this.txtVendItemIdStatus = 1;
        //    }
        //    else {
        //        this.txtVendItemIdStatus = 0;
        //    }

        //    if (this.txtUomProcurementStatus >= 1) {
        //        this.txtUomProcurementStatus = 1;
        //    }
        //    else {
        //        this.txtUomProcurementStatus = 0;
        //    }

        //    if (this.txtUomIssueStatus >= 1) {
        //        this.txtUomIssueStatus = 1;
        //    }
        //    else {
        //        this.txtUomIssueStatus = 0;
        //    }

        //    if (this.txtConvRateProcStatus >= 1) {
        //        this.txtConvRateProcStatus = 1;
        //    }
        //    else {
        //        this.txtConvRateProcStatus = 0;
        //    }

        //}


        //if (this.txtItemIDStatus == 0) {
        //    if ((this.txtChargeCodeStatus == 0 || this.txtChargeCodeStatus == undefined) && (this.txtLotNumberStatus == 0 || this.txtLotNumberStatus == undefined) && (this.txtSerialNumberStatus == 0 || this.txtSerialNumberStatus == undefined) && (this.txtQuantityStatus == 0 || this.txtQuantityStatus == undefined) && (this.txtPriceStatus || this.txtPriceStatus == undefined)) {
        //        this.disableButton = false;

        //    }
        //    else {
        //        this.disableButton = true;
        //    }

        //}
        //else {
        //    this.disableButton = true;
        //}
    }

    async onChargeUpdateClick() {
        try {
            this.spinnerService.start();
            this.statusCode = -1;
            this.msgs = [];
            let _txtPatientID: string;
            let _txtAccID: string;
            let _txtChargeCode: string;
            let _txtDateTime: string;
            let _txtItemCount: string;
            let _txtItemPrice: string;
            let _txtExamID: string;
            let _txtComments: string;
            let _lblItemID: string;
            let _lblLineNo: string;
            let _lblPatientID: string;
            let _lblChargeCode: string;
            let _lblTransID: string;
            let _lblItemSerialNo: string;

            if (this.editChargeData != null && this.editChargeData != undefined) {

                _lblTransID = this.editChargeData.TRANSACTION_ID.toString();
                _lblPatientID = this.editChargeData.PATIENT_NAME;
                _txtPatientID = this.editChargeData.PATIENT_ID;
                _txtAccID = this.editChargeData.ACCOUNT_ID;
                _txtDateTime = this.convertDateFormate(this.editChargeData.CAPTURE_DATE_TIME);
                _txtExamID = this.editChargeData.EXAM_ID;
                _txtComments = this.editChargeData.COMMENTS;


                if (_txtDateTime == null || _txtDateTime == '') {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Date of Service.' });
                    return;
                }
                else {
                    var reg = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
                    if (reg.test(_txtDateTime) == false) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Date of Service.' });
                        return;
                    }
                }


                if (Date.parse(this.convertDateFormate(_txtDateTime)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Date of Service should not be greater than Today's date." });
                    return;
                }

                if (_txtPatientID == null || _txtPatientID == '') {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter PatientID." });
                    return;
                }

                let _tblChargesHeader: VM_POU_CREDIT_HEADER[] = [];

                let _chargesHeader: VM_POU_CREDIT_HEADER = new VM_POU_CREDIT_HEADER();

                _chargesHeader.TRANSACTION_ID = parseInt(_lblTransID);
                _chargesHeader.PATIENT_ID = _txtPatientID;
                _chargesHeader.ACCOUNT_ID = _txtAccID;
                _chargesHeader.EXAM_ID = _txtExamID;
                _chargesHeader.COMMENTS = _txtComments;
                _chargesHeader.DATE_TIME = _txtDateTime;

                _tblChargesHeader.push(_chargesHeader);

                let _tblChargesDetails: VM_POU_CREDIT_DETAILS[] = [];
                let _ChargesDetails: VM_POU_CREDIT_DETAILS = null;

                for (var i = 0; i < this.editChargeData.DETAILS.length; i++) {

                    _lblItemID = this.editChargeData.DETAILS[i].ITEM_ID;
                    _lblLineNo = this.editChargeData.DETAILS[i].LINE_NO.toString();
                    _lblChargeCode = this.editChargeData.DETAILS[i].CHARGE_CODE;
                    _txtChargeCode = this.editChargeData.DETAILS[i].CHARGE_CODE;
                    _txtItemCount = this.editChargeData.DETAILS[i].ITEM_COUNT;
                    _txtItemPrice = this.editChargeData.DETAILS[i].ITEM_PRICE;
                    _lblItemSerialNo = this.editChargeData.DETAILS[i].ITEM_SRNUMBER;


                    if (_txtItemCount == null || _txtItemCount == '') {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Quantity.' });
                        return;
                    }

                    if (parseFloat(_txtItemCount) > parseFloat(this.strMaxAllowQty)) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                        return;
                    }
                    if (_lblItemSerialNo != null && _lblItemSerialNo != '') {
                        if (parseInt(_txtItemCount) > 1) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than 1.' });
                            return;
                        }
                    }

                    if (_txtItemPrice != null && _txtItemPrice != '') {
                        var reg = /^(\+?((([0-9]+(\.)?)|([0-9]*\.[0-9]+))([eE][+-]?[0-9]+)?))$/;
                        if (reg.test(_txtItemPrice) == false) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Price.' });
                            return;
                        }
                    }

                    _ChargesDetails = new VM_POU_CREDIT_DETAILS();

                    _ChargesDetails.ITEM_ID = _lblItemID;
                    _ChargesDetails.LINE_NO = parseInt(_lblLineNo);
                    _ChargesDetails.ITEM_COUNT = _txtItemCount;
                    _ChargesDetails.CHARGE_CODE = _txtChargeCode;
                    _ChargesDetails.ITEM_PRICE = _txtItemPrice;

                    _tblChargesDetails.push(_ChargesDetails);

                }


                let dicDataItems: Object = null;
                dicDataItems = { "CHARGES_HEADER": _tblChargesHeader, "CHARGES_DETAILS": _tblChargesDetails };


                await this.reviewCreditsService.updateCharges(this.editChargeData.TRANSACTION_ID, dicDataItems)
                    .then((res: Response) => {
                        this.spinnerService.stop();
                        let data = res.json();
                        this.statusCode = data.StatusCode;
                    });

                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed to Update the Charges Details' });
                    return;
                }
                else {
                    await this.bindChargesGrid();
                    this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                    //this.pageForm = true;
                    //this.editChargeForm = false;
                    //this.addChargeForm = false;
                    //this.editChargeData = null;
                    return;
                }
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onChargeGoBackClick() {

        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

        try {
            this.spinnerService.start();
            this.pageForm = true;
            this.addChargeForm = false;
            this.editChargeForm = false;
            this.editChargeData = null;
            this.activeTab = 'Charges';
            await this.bindChargesGrid();
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async ddItemIDChanged(event) {

        if (this.selectedItemID === "Select Item" || this.selectedItemID == undefined) {

            this.disableButton = true;
            this.txtItemIDStatus = 1;
            return;
        }
        else {
            this.txtItemIDStatus = 0;
        }

        try {
            this.spinnerService.start();
            let strLotId: string = '';
            let strSerialId: string = '';
            let strChargeCode: string = '';
            this.disableButton = false;
            if (this.selectedItemID != null && this.selectedItemID != '' && this.selectedItemID != 'Select Item') {
                let dsFilterItems = await this.dsDeptItems.filter(x => x.ITEM_ID == this.selectedItemID);

                if (dsFilterItems.length > 0) {
                    strLotId = dsFilterItems[0].LOT_CONTROLLED;
                    strSerialId = dsFilterItems[0].SERIAL_CONTROLLED;
                    strChargeCode = dsFilterItems[0].CHARGE_CODE;
                }

                this.chargeNewItem.CHARGE_CODE = strChargeCode;

                this.chargeNewItem.ITEM_LOTNUMBER = "";
                this.chargeNewItem.ITEM_SRNUMBER = "";

                if (strLotId == YesNo_Enum[YesNo_Enum.Y]) {
                    this.showTxtLotNumber = true;
                }
                else {
                    this.showTxtLotNumber = false;
                }

                if (strSerialId == YesNo_Enum[YesNo_Enum.Y]) {
                    this.showTxtSerNumber = true;
                }
                else {
                    this.showTxtSerNumber = false;
                }
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onChargeItemSaveClick() {
        try {
            this.spinnerService.start();
            this.statusCode = -1;
            this.msgs = [];
            let _DS: VM_POU_CREDIT_HEADER[] = [];
            let strItemId: string;
            let strQty: string;
            let strLotId: string;
            let strSerId: string;
            let strchargecode: string;
            let strprice: string;
            let StrLineNo: string;
            let intLineNo: number;
            let strTransactionId: string;
            let dsItems: VM_DEPARTMENT_CART_ITEMS[] = [];

            let filterItems: VM_POU_CREDIT_HEADER[] = [];

            _DS = await JSON.parse(sessionStorage.getItem('_DS')) as VM_POU_CREDIT_HEADER[];
            dsItems = JSON.parse(sessionStorage.getItem('dsItems')) as VM_DEPARTMENT_CART_ITEMS[];

            let isDuplicateExists: boolean = false;

            if (this.chargeNewItem != null && this.chargeNewItem != undefined) {

                strQty = this.chargeNewItem.ITEM_COUNT;
                strItemId = this.selectedItemID;
                strLotId = this.chargeNewItem.ITEM_LOTNUMBER;
                strSerId = this.chargeNewItem.ITEM_SRNUMBER;
                strchargecode = this.chargeNewItem.CHARGE_CODE;
                strprice = this.chargeNewItem.ITEM_PRICE;
                strTransactionId = this.addChargeData.TRANSACTION_ID.toString();

                let strDescription: string;

                if (this.selectedItemID == '' || this.selectedItemID == 'Select ItemID' || this.selectedItemID == null) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Item ID' });
                    return;
                }

                if (strQty != null && strQty != '') {
                    var reg = /((\d+)((\.\d{1,2})?))$/;
                    if (reg.test(strQty) == false) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Quantity' });
                        return;
                    }
                }

                if (strLotId != null && strLotId != '') {
                    var reg = /^[a-zA-Z0-9_-]+$/;
                    if (reg.test(strLotId) == false) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Lot Number' });
                        return;
                    }
                }

                if (strSerId != null && strSerId != '') {
                    var reg = /^[a-zA-Z0-9_-]+$/;
                    if (reg.test(strSerId) == false) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Serial Number' });
                        return;
                    }
                }

                if (strchargecode != null && strchargecode != '') {
                    var reg = /^[a-zA-Z0-9_-]+$/;
                    if (reg.test(strchargecode) == false) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Charge Code' });
                        return;
                    }
                }

                if (strprice != null && strprice != '') {
                    var reg = /^(\+?((([0-9]+(\.)?)|([0-9]*\.[0-9]+))([eE][+-]?[0-9]+)?))$/;
                    if (reg.test(strprice) == false) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Price' });
                        return;
                    }
                }


                strDescription = await dsItems.filter(x => x.ITEM_ID == this.selectedItemID)[0].ITEM_DESCRIPTION;

                if (strQty == '' || strQty == null) {
                    strQty = '0';
                }
                if (strprice == '' || strprice == null) {
                    strprice = '0';
                }

                if (strTransactionId != null && strTransactionId != '' && strItemId != '' && strItemId != null) {
                    filterItems = await _DS.filter(x => x.TRANSACTION_ID == parseInt(strTransactionId));
                    if (filterItems.length > 0) {
                        let filterDetails = await filterItems[0].DETAILS.filter(x => x.ITEM_ID == strItemId);
                        if (filterDetails.length > 0) {
                            for (var i = 0; i < filterDetails.length; i++) {
                                //filterDetails.forEach(detail => {
                                if (strLotId != '' && strLotId != null && strSerId != '' && strSerId != null) {
                                    if (filterDetails[i].ITEM_LOTNUMBER == strLotId && filterDetails[i].ITEM_SRNUMBER == strSerId) {
                                        isDuplicateExists = true;
                                        break;
                                    } else {
                                        isDuplicateExists = false;
                                    }
                                } else if (strLotId != '' && strLotId != null) {
                                    if (filterDetails[i].ITEM_LOTNUMBER == strLotId) {
                                        isDuplicateExists = true;
                                        break;
                                    } else {
                                        isDuplicateExists = false;
                                    }
                                } else if (strSerId != '' && strSerId != null) {
                                    if (filterDetails[i].ITEM_SRNUMBER == strSerId) {
                                        isDuplicateExists = true;
                                        break;
                                    } else {
                                        isDuplicateExists = false;
                                    }
                                } else if (strLotId == '' || strLotId == null || strSerId == '' || strSerId == null) {
                                    isDuplicateExists = true;
                                    break;
                                }
                                //});
                            }
                        }

                        if (isDuplicateExists) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Item already exists' });
                            return;
                        }
                    }
                }


                let _drItemId = await dsItems.filter(x => x.ITEM_ID == strItemId);

                if (_drItemId.length == 0) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Item ID' });
                    return;
                }

                if (_drItemId[0].LOT_CONTROLLED == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                    if (strLotId == '' || strLotId == null) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Lot Number' });
                        return;
                    }
                }

                if (_drItemId[0].SERIAL_CONTROLLED == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                    if (strSerId == '' || strSerId == null) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Serial Number' });
                        return;
                    }
                }

                if (_drItemId[0].LOT_CONTROLLED == YesNo_Enum[YesNo_Enum.Y.toString()] && _drItemId[0].SERIAL_CONTROLLED == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                    if ((strLotId == '' || strLotId == null) && (strSerId == '' || strSerId == null)) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Serial Number and Lot Number' });
                        return;
                    }
                }

                intLineNo = 0;

                if (filterItems.length > 0) {
                    await filterItems[0].DETAILS.forEach(detail => {
                        if (intLineNo < detail.LINE_NO) {
                            intLineNo = detail.LINE_NO;
                        }
                    });
                }

                intLineNo += 1;
                let savedata: any;
                await this.reviewCreditsService.insertPouChargeCaptureDetails(strTransactionId, strItemId, strDescription, strLotId, strSerId, strchargecode, strprice, intLineNo, strQty)
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {
                        savedata = res.json();
                        if (savedata.StatusCode == AtparStatusCodes.ATPAR_OK) {
                            //await this.bindChargesGrid();
                            this.msgs = [];
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Saved Successfully' });
                            this.selectedItemID = "";
                            this.chargeNewItem.CHARGE_CODE = "";
                            this.chargeNewItem.ITEM_LOTNUMBER = "";
                            this.chargeNewItem.ITEM_SRNUMBER = "";
                            this.chargeNewItem.ITEM_COUNT = "";
                            this.disableButton = true;
                            //this.pageForm = false;
                            //this.editChargeForm = false;
                            //this.addChargeForm = true;
                        } else {
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: savedata.StatusMessage });
                            this.selectedItemID = "";
                            this.chargeNewItem.CHARGE_CODE = "";
                            this.chargeNewItem.ITEM_LOTNUMBER = "";
                            this.chargeNewItem.ITEM_SRNUMBER = "";
                            this.disableButton = true;
                            this.chargeNewItem.ITEM_COUNT = "";
                        }
                    });
                console.log(savedata);


            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }

    }

    async onChargeItemGoBackClick() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        try {
            this.spinnerService.start();
            this.addChargeData = null;
            this.chargeNewItem = null;
            this.addChargeForm = false;
            this.pageForm = true;
            this.editChargeForm = false;
            this.activeTab = 'Charges';
            await this.bindChargesGrid();
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async editCredit(credit: VM_POU_CREDIT_HEADER) {

        this.breadCrumbMenu.SUB_MENU_NAME = 'Update Credits';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

        try {
            this.spinnerService.start();

            this.editCreditData = new VM_POU_CREDIT_HEADER();

            let _dsCreditData: VM_POU_CREDIT_HEADER[] = [];

            _dsCreditData = await JSON.parse(sessionStorage.getItem('CreditDetails')) as VM_POU_CREDIT_HEADER[];

            let dsCredit: VM_POU_CREDIT_HEADER[] = [];

            dsCredit = await _dsCreditData.filter(x => x.TRANSACTION_ID == credit.TRANSACTION_ID);

            if (dsCredit.length > 0) {
                this.editCreditData = new VM_POU_CREDIT_HEADER();
                this.editCreditData = dsCredit[0];
                this._lblPatientID = this.editCreditData.PATIENT_ID;
                await this.editCreditData.DETAILS.forEach(detail => {
                    detail.CREDIT_QTY = '';
                });
            }

            this.pageForm = false;
            this.editCreditForm = true;

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onCreditUpdateClick() {
        try {
            this.spinnerService.start();
            this.statusCode = -1;
            this.msgs = [];

            let _tblCreditHeader: VM_POU_CREDIT_HEADER[] = [];
            let _tblCreditDetails: VM_POU_CREDIT_DETAILS[] = [];
            let _drHeader: VM_POU_CREDIT_HEADER;
            let _drDetails: VM_POU_CREDIT_DETAILS;
            //Dim _dsCredits As New DataSet
            let _txtPatientID: string;
            let _txtAccID: string;
            let _txtExamID: string;
            let _txtComments: string;
            let _txtItemCredit: string;
            let _txtChargeCode: string;
            let _txtDateOfService: string;
            let _txtItemPrice: string;
            let _lblItemID: string;
            let _lblLineNo: string;
            let _lblPatientID: string;
            let _lblItemCharge: string;
            let _lblTransID: string;

            if (this.editCreditData != null && this.editCreditData != undefined) {

                _lblTransID = this.editCreditData.TRANSACTION_ID.toString();
                _lblPatientID = this._lblPatientID;
                _txtPatientID = this.editCreditData.PATIENT_ID;
                _txtAccID = this.editCreditData.ACCOUNT_ID;
                _txtExamID = this.editCreditData.EXAM_ID;
                _txtComments = this.editCreditData.COMMENTS;
                _txtDateOfService = this.convertDateFormate(this.editCreditData.CAPTURE_DATE_TIME);

                if (Date.parse(this.convertDateFormate(_txtDateOfService)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Date of Service should not be greater than Today's date." });
                    return;
                }

                if (_txtPatientID == '' || _txtPatientID == null) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter PatientID." });
                    return;
                }

                _drHeader = new VM_POU_CREDIT_HEADER();

                _drHeader.TRANSACTION_ID = parseInt(_lblTransID);
                _drHeader.PATIENT_ID = _txtPatientID;
                _drHeader.ACCOUNT_ID = _txtAccID;
                _drHeader.EXAM_ID = _txtExamID;
                _drHeader.COMMENTS = _txtComments;
                _drHeader.DATE_OF_SERVICE = _txtDateOfService;

                if (_lblPatientID.trim() != _txtPatientID.trim()) {
                    _drHeader.PATIENTID_CHANGED = YesNo_Enum[YesNo_Enum.Y];
                }
                else {
                    _drHeader.PATIENTID_CHANGED = YesNo_Enum[YesNo_Enum.N];
                }

                _tblCreditHeader.push(_drHeader);

                for (var i = 0; i < this.editCreditData.DETAILS.length; i++) {
                    _drDetails = new VM_POU_CREDIT_DETAILS();

                    _lblItemID = this.editCreditData.DETAILS[i].ITEM_ID;
                    _lblLineNo = this.editCreditData.DETAILS[i].LINE_NO.toString();
                    _lblItemCharge = this.editCreditData.DETAILS[i].BILLED_QTY;
                    _txtItemCredit = this.editCreditData.DETAILS[i].CREDIT_QTY;
                    _txtChargeCode = this.editCreditData.DETAILS[i].CHARGE_CODE;
                    _txtItemPrice = this.editCreditData.DETAILS[i].ITEM_PRICE;

                    if (_txtItemPrice == '' || _txtItemPrice == null) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Price." });
                        return;
                    }

                    if (_txtItemCredit != '' && _txtItemCredit != null) {
                        if (parseFloat(_txtItemCredit) > parseFloat(_lblItemCharge)) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Credit Qty should be less than or equal to Charge Qty." });
                            return;
                        }
                        if (parseFloat(_txtItemCredit) > parseFloat(this.strMaxAllowQty)) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                            return;
                        }
                        if (parseFloat(_txtItemCredit) > 0) {
                            _drDetails.CREDIT_CHANGED = YesNo_Enum[YesNo_Enum.Y];
                        }
                        else {
                            _drDetails.CREDIT_CHANGED = YesNo_Enum[YesNo_Enum.N];
                        }
                    }
                    else {
                        _drDetails.CREDIT_CHANGED = YesNo_Enum[YesNo_Enum.N];
                    }

                    _drDetails.ITEM_ID = _lblItemID;
                    _drDetails.LINE_NO = parseInt(_lblLineNo);
                    _drDetails.ITEM_COUNT = _txtItemCredit;
                    _drDetails.CHARGE_CODE = _txtChargeCode;
                    _drDetails.ITEM_PRICE = _txtItemPrice;


                    _tblCreditDetails.push(_drDetails);

                }


                let _dsCredits = { "CREDIT_HEADER": _tblCreditHeader, "CREDIT_DETAILS": _tblCreditDetails };

                //let data: any;
                await this.reviewCreditsService.updateCredits(_dsCredits)
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {
                        this.updateData = res.json();
                        this.statusCode = this.updateData.StatusCode;
                        if (this.updateData != undefined) {
                            if (this.statusCode == AtparStatusCodes.S_FAILEDTOCREDITOLDPATIENT) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Failed to Credit to the Patient :" + _txtPatientID });
                                return;
                            }
                            else if (this.statusCode == AtparStatusCodes.S_FAILEDTOCREDITNEWPATIENT) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Failed to Credit to the Patient :" + _txtPatientID });
                                return;
                            }
                            else if (this.statusCode == AtparStatusCodes.S_FAILEDTOCHARGE) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Failed to Charge to the Patient :" + _txtPatientID });
                                return;
                            }
                            else if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to Update the Credit Details" });
                                return;
                            }
                            else {
                                //await this.bindCreditsGrid();
                                //this.pageForm = true;
                                //this.editCreditForm = false;
                                //this.editCreditData = null;
                                this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                return;

                            }
                        }
                    });


            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onCreditGoBackClick() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        try {
            this.spinnerService.start();
            this.pageForm = true;
            this.editCreditForm = false;
            this.editCreditData = null;
            this.activeTab = 'Credits';
            await this.bindCreditsGrid();
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
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
                saveAs(blob, "POUReviewChargesCreditsReport.xls");


                //var ua = window.navigator.userAgent;
                //var msie = ua.indexOf("MSIE ");
                //// If Internet Explorer
                //if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                //this.statusCode = -1;
                //let folderName: string = '';
                //await this.commonService.exportToExcel(html, "POU_Review_Charges_", "POUReviewChargesCreditsReport")
                //    .then((res: Response) => {
                //        let data = res.json();
                //        this.statusCode = data.StatusCode;
                //        if (this.statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
                //            folderName = data.DataVariable.toString();
                //            var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/POUReviewChargesCreditsReport.xls';
                //            var query = '?download';
                //            window.open(filename + query,'_self');
                //        }
                //        else {
                //            this.msgs = [];
                //            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
                //        }
                //    });

                //await this.commonService.deleteExcel(folderName, "POUReviewChargesCreditsReport")
                //    .then((res: Response) => {
                //    });
                //}
                //else {
                //var a = document.createElement('a');
                //var data_type = 'data:application/vnd.ms-excel';
                //html = html.replace(/ /g, '%20');
                //a.href = data_type + ', ' + html;
                //a.setAttribute('target', '_self');
                //a.download = 'POUReviewChargesCreditsReport.xls';
                //a.click();
                // }
            }
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

                mywindow.document.write('<html><head><title>' + 'Point Of Use - Review charges/credits' + '</title>');
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
                await this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Review Charges/Credits Report', JSON.stringify(html), this.toMailAddr, '', 'false', MailPriority.Normal.toString(), '')
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

    async exportReportDetails(reqType: string) {
        let htmlBuilder: string = '';
        try {
            this.statusCode = -1;
            this.msgs = [];
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;
            let _DS: VM_POU_CREDIT_HEADER[] = [];

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

            if (this.activeTab == 'Charges') {
                _DS = await JSON.parse(sessionStorage.getItem('_DS')) as VM_POU_CREDIT_HEADER[];

                htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

                if (reqType == 'Print') {
                    htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                        + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=5 align=left><span class=c2><b> Review Charges Report of the Department " + this.selectedDept + " between " + this.convertDateFormate(this.fromDate) + " and " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";

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
                        + "<tr><td colspan=3 align=left><span class=c2><b> Review Charges Report of the Department " + this.selectedDept + " between " + this.convertDateFormate(this.fromDate) + " and " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                }

                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center width=20% nowrap><span class=c3><b>Date Of Service(MM/DD/YYYY)</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b>Patient ID / Name</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b>User ID</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>Account ID</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>Exam ID</b></span></td>"
                    + "<td align=center width=20% nowrap><span class=c3><b>Comments</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>Department</b></span></td>"
                    + "</tr>";

                await _DS.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap><span class=c3>" + header.CAPTURE_DATE_TIME + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.PATIENT_NAME + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.USER_ID + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.ACCOUNT_ID + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.EXAM_ID + "</span></td>"
                        + "<td align=left ><span class=c3>" + header.COMMENTS + "</span></td>"

                        + "<td align=left nowrap><span class=c3>" + header.DEPARTMENT_ID + "</span></td>"

                        + "</tr>";

                    if (header.DETAILS.length > 0) {
                        htmlBuilder += "<tr>"
                            + "<td colspan=7>"
                            + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#E0E0E0>"
                            + "<td align=center nowrap width=15%><span class=c3><b>Item ID</b></span></td>"
                            + "<td align=center nowrap width=8%><span class=c3><b>LineNo</b></span></td>"
                            + "<td align=center nowrap width=21%><span class=c3><b>Description</b></span></td>"
                            + "<td align=center nowrap width=10%><span class=c3><b>Quantity</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Lot Number</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Serial Number</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Charge Code</b></span></td>"
                            + "<td align=center nowrap width=10%><span class=c3><b>Price</b></span></td>"
                            + "</tr>";
                        header.DETAILS.forEach(detail => {
                            htmlBuilder += "<tr>"
                                + "<td align=left nowrap style='mso-number-format:\@;'><span class=c3>" + detail.ITEM_ID + "</span></td>"
                                + "<td align=right nowrap><span class=c3>" + detail.LINE_NO + "</span></td>"

                                + "<td align=left ><span class=c3>" + detail.ITEM_DESCRIPTION + "</span></td>"
                                + "<td align=right nowrap style='mso-number-format:\@;'><span class=c3>" + detail.ITEM_COUNT + "</span></td>";

                            if (detail.ITEM_LOTNUMBER != '' && detail.ITEM_LOTNUMBER != null) {
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + detail.ITEM_LOTNUMBER + "</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap><span class=c3></span></td>";
                            }

                            if (detail.ITEM_SRNUMBER != '' && detail.ITEM_SRNUMBER != null) {
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + detail.ITEM_SRNUMBER + "</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap><span class=c3></span></td>";
                            }

                            if (detail.CHARGE_CODE != '' && detail.CHARGE_CODE != null) {
                                htmlBuilder += "<td align=right nowrap style='mso-number-format:\@;'><span class=c3>" + detail.CHARGE_CODE + "</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=right nowrap><span class=c3></span></td>";
                            }

                            htmlBuilder += "<td align=right nowrap style='mso-number-format:\@;'><span class=c3>" + detail.ITEM_PRICE + "</span></td>";

                            htmlBuilder += "</tr>";

                        });

                        htmlBuilder += "</table>"
                            + "</td>"
                            + "</tr>";
                    }

                });

                htmlBuilder += "</table></Table>";

            }
            else if (this.activeTab == 'Credits') {
                _DS = await JSON.parse(sessionStorage.getItem('CreditDetails')) as VM_POU_CREDIT_HEADER[];

                htmlBuilder += "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

                if (reqType == 'Print') {
                    htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                        + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=5 align=left><span class=c2><b> Review Credits Report of the Department " + this.selectedDept + " between " + this.convertDateFormate(this.fromDate) + " and " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";

                    htmlBuilder += "<A  href=" + "" + "javascript:printWindow()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                }
                else {
                    if (reqType == 'Mail') {
                        htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=cid:logo title=Atpar 3><img src=cid:topbg width=82% height=63></TD></TR>";
                    }
                    else {
                        htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                    }
                    htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=3 align=left><span class=c2><b> Review Credits Report of the Department " + this.selectedDept + " between " + this.convertDateFormate(this.fromDate) + " and " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";

                }


                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center width=20% nowrap><span class=c3><b>Date Of Service(MM/DD/YYYY)</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b>Patient ID / Name</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b>User ID</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>Account ID</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>Exam ID</b></span></td>"
                    + "<td align=center width=20% nowrap><span class=c3><b>Comments</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>Department</b></span></td>"

                    + "</tr>";

                await _DS.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap><span class=c3>" + header.CAPTURE_DATE_TIME + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.PATIENT_NAME + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.USER_ID + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.ACCOUNT_ID + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.EXAM_ID + "</span></td>"
                        + "<td align=left ><span class=c3>" + header.COMMENTS + "</span></td>";


                    htmlBuilder += "<td align=left nowrap><span class=c3>" + header.DEPARTMENT_ID + "</span></td>";

                    htmlBuilder += "</tr>";

                    if (header.DETAILS.length > 0) {
                        htmlBuilder += "<tr>"
                            + "<td colspan=7>"
                            + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#E0E0E0>"
                            + "<td align=center nowrap width=15%><span class=c3><b>Item ID</b></span></td>"
                            + "<td align=center nowrap width=8%><span class=c3><b>LineNo</b></span></td>"
                            + "<td align=center nowrap width=15%><span class=c3><b>Description</b></span></td>"
                            + "<td align=center nowrap  width=16%><span class=c3>"
                            + "<table width=100% border=0 ><tr> <td align=center colspan =3>"
                            + "<span class=c2><b><u>Quantity</u><br /></span></td></tr><tr><td align=left style=width:33.33%>"
                            + "<span class=c2><b><u>Issue</u><br /></span></td><td align=center style=width:33.33%><span class=c2><b><u>Charge</u><br /></span>"
                            + "</td><td align=right style=width:33.33%><span class=c2><b><u>Credit</u><br /></span></tr></td></table></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Lot Number</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Serial Number</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Charge Code</b></span></td>"
                            + "<td align=center width=10% ><span class=c3><b>Price</b></span></td>"
                            + "</tr>";

                        header.DETAILS.forEach(detail => {
                            htmlBuilder += "<tr>"
                                + "<td align=left nowrap style='mso-number-format:\@;' ><span class=c3>" + detail.ITEM_ID + "</span></td>"
                                + "<td align=right nowrap><span class=c3>" + detail.LINE_NO + "</span></td>"
                                + "<td align=left><span class=c3>" + detail.ITEM_DESCRIPTION + "</span></td>";

                            if (detail.BILLED_QTY == null || detail.BILLED_QTY == '' || detail.BILLED_QTY == undefined) {
                                detail.BILLED_QTY = '';
                            }
                            if (detail.CREDIT_QTY == null || detail.CREDIT_QTY == '' || detail.CREDIT_QTY == undefined) {
                                detail.CREDIT_QTY = '';
                            }

                            htmlBuilder += "<td align=left nowrap><span class=c3>"
                                + "<table width=100% border=0><tr>"
                                + "<td align=right width=33.33% style='mso-number-format:\@;'>" + detail.ITEM_COUNT + "</td>"
                                + "<td align=center width=33.33% style='mso-number-format:\@;'>" + detail.BILLED_QTY + "</td>"
                                + "<td align=right width=33.33% style='mso-number-format:\@;'>" + detail.CREDIT_QTY + "</td></tr></table>"
                                + "</span></td>";

                            if (detail.ITEM_LOTNUMBER != '' && detail.ITEM_LOTNUMBER != null) {
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + detail.ITEM_LOTNUMBER + "</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap><span class=c3></span></td>";
                            }

                            if (detail.ITEM_SRNUMBER != '' && detail.ITEM_SRNUMBER != null) {
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + detail.ITEM_SRNUMBER + "</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap><span class=c3></span></td>";
                            }

                            if (detail.CHARGE_CODE != '' && detail != null) {
                                htmlBuilder += "<td align=right nowrap style='mso-number-format:\@;'><span class=c3>" + detail.CHARGE_CODE + "</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=right nowrap><span class=c3></span></td>";
                            }

                            htmlBuilder += "<td align=right style='mso-number-format:\@;' ><span class=c3>" + detail.ITEM_PRICE + "</span></td>";

                            htmlBuilder += "</tr>";

                        });

                        htmlBuilder += "</table>"
                            + "</td>"
                            + "</tr>";

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

    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    clientErrorMsg(ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString());
    }

    async OnDestroy() {
    }

}