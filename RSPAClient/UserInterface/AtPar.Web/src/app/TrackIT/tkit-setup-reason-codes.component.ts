import { Component, OnDestroy, ViewChild } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { TKIT_REASON_CODES } from "../Entities/TKIT_REASON_CODES";
import { ReasonCodeService } from './tkit-setup-reason-codes.service';
import { TokenEntry_Enum, EnumApps, ModeEnum, YesNo_Enum, StatusType, } from '../Shared/AtParEnums'
import { HttpService } from '../Shared/HttpService';
import { AtparStatusCodes, } from '../Shared/AtParStatusCodes';
import { Http, Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from './../components/common/api';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { SelectItem } from '../components/common/api';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'tkit-setup-reason-codes.component.html',
    providers: [datatableservice, ReasonCodeService, HttpService, AtParCommonService, AtParConstants]
})

export class SetupReasonCodesComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    reasonCodeSearch: string = "";
    showAddButton: boolean = true;
    mode: string;
    pop: boolean = false;
    table: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    ven: any;
    Title: string = "";
    bindSymbal: string = "";
    loading: boolean = true;
    reasonCodeStatus: number;
    descStatus: number;
    ddlOrgIDStatus: number;

    showTextBox: boolean = false;
    showLable: boolean = false;
    public newItem = new TKIT_REASON_CODES();
    growlMessage: Message[] = [];
    _deviceTokenEntry: string[] = [];
    lstReasonCodes: TKIT_REASON_CODES[];
    mainlstGridData: TKIT_REASON_CODES[];
    ddlStatusType: any[] = [];
    pageSize: number;
    menuCode: string;
    appID: string;
    auditSatus: string = "";
    lstOrgGroups: SelectItem[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    orgGrpId: string = "";
    selectedOrgGroupId: string = "";
    orgGroupIDForDBUpdate: string;
    statusType: string;
    breadCrumbMenu: Menus;

    constructor(public dataservice: datatableservice,
        private reasonCodeService: ReasonCodeService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private leftBarAnimationService: LeftBarAnimationService) {
        this.breadCrumbMenu = new Menus();
        this.ven = new Employee();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }


    addReasonCode() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Reason Code';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = true;
        this.showLable = false;
        this.form = true;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.Title = "Save";
        this.bindSymbal = "floppy-o";
        this.showAddButton = false;
        this.mode = ModeEnum[ModeEnum.Add].toString();
        this.reasonCodeStatus = null;
        this.descStatus = null;
        this.newItem = new TKIT_REASON_CODES();
        this.reasonCodeSearch = "";
        //this.blnShowOrgGroupDD = true;
        //this.blnShowOrgGroupLabel = false;
        this.loading = true;
        this.bindOrgGroups();
        this.ddlOrgIDStatus = null;
    }

    tbl() {
        this.form = false;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.table = true;
    }

    edit(data) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Reason Code';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = false;
        this.showLable = true;
        this.form = true;
        this.table = false;
        this.showAddButton = false;
        this.Title = "Update";
        this.bindSymbal = "check";
        this.newItem = data;
        this.mode = ModeEnum[ModeEnum.Edit].toString();
        this.loading = false;
        this.reasonCodeSearch = "";
        this.orgGrpId = data.ORG_GROUP_ID;
        this.blnShowOrgGroupDD = false;
        this.blnShowOrgGroupLabel = true;
    }

    save() {
        this.editform = false;
    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.table = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.showAddButton = true;
        this.newItem = new TKIT_REASON_CODES();
        this.reasonCodeSearch = "";
        this.selectedOrgGroupId = "";
        this.growlMessage = [];
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    ngOnInit(): void {
        this.table = false;
        this.showAddButton = true;
        this.ddlStatusType.push({ label: 'All', value: "" });

        // Negative binding due to SQL Server db.  0 - active and 1 - inactive
        this.ddlStatusType.push({ label: 'Active', value: true });
        this.ddlStatusType.push({ label: 'Inactive', value: false });
        this.pageSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.menuCode = localStorage.getItem("menuCode") != null ? localStorage.getItem("menuCode") : 'mt_tkit_setup_reason_codes.aspx';
        this.appID = (EnumApps.TrackIT).toString();
        this.mainlstGridData = new Array<TKIT_REASON_CODES>()
        this.checkAuditAllowed();
        this.statusType = "";
        //this.bindOrgGroups();
    }

    ngOnDestroy() {
        this.reasonCodeSearch = null;
        this.mode = null;
        this.Title = null;
        this.bindSymbal = null;
        this.reasonCodeStatus = null;
        this.descStatus = null;
        this.newItem = null;
        this.growlMessage = null;
        this._deviceTokenEntry = null;
        this.lstReasonCodes = null;
        this.ddlStatusType = null;
        this.pageSize = null;
        this.menuCode = null;
        this.appID = null;
        this.auditSatus = null;
    }


    // Add and Update button validations
    bindModelDataChange(event: any) {
        try {
            if ("txtReasonCode" == event.TextBoxID.toString()) {
                this.reasonCodeStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtDesc" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.Title == "Update") {
                this.reasonCodeStatus = 0;
            }
            this.ddlOrgIDChanged();
            if (this.reasonCodeStatus == 0 && this.ddlOrgIDStatus == 0) {
                if (this.descStatus == null || this.descStatus == undefined || this.descStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            else {
                this.loading = true;
            }


        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            this.lstOrgGroups = [];
            await this.commonService.getUserOrgGroups(this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            // this.blnStatusMsg = false;

                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.blnShowOrgGroupDD = false;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + ' - ' + this.orgGroupData[0].ORG_GROUP_NAME;
                                break;

                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.blnShowOrgGroupLabel = false;
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + ' - ' + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }

                                break;
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
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    async BindGrid() {
        this.mainlstGridData = [];
        this.lstReasonCodes = [];
        this.statusType = "";


        //if (this.table == true) {
        //    this.dataTableComponent.reset();
        //    this.statusType = null;
        //}

        try {
            this.table = false;
            if (this.mode == "Edit") {
                this.showAddButton = true;
            }
            this.spinnerService.start();
            if (this.reasonCodeSearch == null || this.reasonCodeSearch == undefined || this.reasonCodeSearch === "") {
                this.reasonCodeSearch = "";
            }

            await this.reasonCodeService.getReasonCodes(this.reasonCodeSearch, "")
                .catch(this.httpService.handleError)
                .then((resp: Response) => {
                    let webresp = resp.json() as AtParWebApiResponse<TKIT_REASON_CODES>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {

                            this.growlMessage = [];
                            this.lstReasonCodes = [];
                            this.mainlstGridData = [];
                            this.lstReasonCodes = webresp.DataList;

                            for (var item = 0; item < this.lstReasonCodes.length; item++) {

                                if (this.lstReasonCodes[item].STATUS == false) {
                                    this.lstReasonCodes[item].STATUS = true;
                                } else {
                                    this.lstReasonCodes[item].STATUS = false;
                                }

                                this.mainlstGridData.push(this.lstReasonCodes[item]);
                            }
                            this.table = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.table = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "warn", summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.table = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "info", summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.table = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "error", summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            break;
                        }
                    }
                });

        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    async changeStatus(reasonCode) {

        this.growlMessage = [];
        this.spinnerService.start();
        try {
            var webresp = new AtParWebApiResponse<TKIT_REASON_CODES>();
            //await this.reasonCodeService.deleteReasonCode(reasonCode.REASON_CODE, !reasonCode.STATUS)
            
            await this.reasonCodeService.deleteReasonCode(reasonCode.REASON_CODE, !reasonCode.STATUS)
                .catch(this.httpService.handleError).then(async (resp: Response) => {
                    webresp = resp.json() as AtParWebApiResponse<TKIT_REASON_CODES>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success:
                            // await this.BindGrid();
                            this.growlMessage = [];
                            let msg = AtParConstants.Updated_Status_Msg.replace("1%", 'Reason Code').replace("2%", reasonCode.REASON_CODE);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });

                            let filterData: any = [];
                            this.lstReasonCodes = [];
                            let matchedrecord = this.mainlstGridData.filter(x => x.REASON_CODE == reasonCode.REASON_CODE)
                            matchedrecord[0].STATUS = reasonCode.STATUS;

                            if (this.statusType.toString() == "false") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == false)
                            } else if (this.statusType.toString() == "true") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == true)
                            } else {
                                filterData = this.mainlstGridData
                            }
                            if (filterData != null) {
                                for (let x = 0; x < filterData.length; x++) {
                                    let lstSetupcodeDetails = new TKIT_REASON_CODES();
                                    lstSetupcodeDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                    lstSetupcodeDetails.REASON_CODE = filterData[x].REASON_CODE;
                                    lstSetupcodeDetails.REASON_DESCR = filterData[x].REASON_DESCR;

                                    lstSetupcodeDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                                    lstSetupcodeDetails.UPDATE_USERID = filterData[x].UPDATE_USERID;
                                    //if (filterData[x].STATUS == false) {
                                    //    filterData[x].STATUS = true;
                                    //} else {
                                    //    filterData[x].STATUS  = false;
                                    //}

                                    lstSetupcodeDetails.STATUS = filterData[x].STATUS;
                                    this.lstReasonCodes.push(lstSetupcodeDetails);
                                }
                            }


                            break;

                        case StatusType.Error:
                            await this.BindGrid();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            break;
                        case StatusType.Warn:
                            await this.BindGrid();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                            break;
                    }

                    this.spinnerService.stop();
                });

        }

        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }

    }

    private async checkAuditAllowed() {

        this.growlMessage = [];

        try {
            this.spinnerService.start();
            let webresp = new AtParWebApiResponse<string>();
            await this.commonService.getAuditAllowed(this.appID, this.menuCode)
                .catch(this.httpService.handleError).then((res: Response) => {
                    webresp = res.json() as AtParWebApiResponse<string>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {

                        case StatusType.Success: {
                            this.auditSatus = webresp.Data;
                            break
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage })
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage })
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage })
                            break;
                        }
                    }

                });
        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    public saveOrUpdateReasonCode() {
        this.showAddButton = false;
        this.table = false;
        this.growlMessage = [];

        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                this.table = false;
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                this.spinnerService.stop();
                return false;
            }
        }

        if (this.Title == "Save") {

            try {
                let webresp = new AtParWebApiResponse<TKIT_REASON_CODES>();
                this.spinnerService.start();

                if (this.newItem.REASON_DESCR == undefined || this.newItem.REASON_DESCR == 'undefined') {
                    this.newItem.REASON_DESCR = '';
                }

                this.reasonCodeService.createReasonCodes(this.newItem.REASON_CODE, this.newItem.REASON_DESCR, this.orgGroupIDForDBUpdate)
                    .catch(this.httpService.handleError).then((resp: Response) => {
                        webresp = resp.json() as AtParWebApiResponse<TKIT_REASON_CODES>
                        this.spinnerService.stop();
                        switch (webresp.StatType) {
                            case StatusType.Success: {
                                this.growlMessage = [];
                                if (this.mode == ModeEnum[ModeEnum.Add].toString()) {
                                    this.loading = true;
                                    this.reasonCodeStatus = null;
                                    this.descStatus = null;
                                    this.ddlOrgIDStatus = null;
                                    if (this.blnShowOrgGroupDD) {
                                        (<HTMLInputElement>document.getElementById('txtddllstOrgGroups')).focus();
                                    }
                                    else {
                                        (<HTMLInputElement>document.getElementById('txtReasonCode')).focus();
                                    }
                                    let msg = AtParConstants.Created_Msg.replace("1%", 'Reason Code').replace("2%", this.newItem.REASON_CODE);
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                                    this.newItem = new TKIT_REASON_CODES();
                                    this.selectedOrgGroupId = "";

                                }
                                else {
                                    let msg = AtParConstants.Updated_Msg.replace("1%", 'Reason Code').replace("2%", this.newItem.REASON_CODE);
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                                    (<HTMLInputElement>document.getElementById('txtDesc')).focus();
                                }
                                break;
                            }
                            case StatusType.Error: {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                break;
                            }
                            case StatusType.Warn: {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                break;
                            }
                        }

                    });
            } catch (exMsg) {
                this.clientErrorMsg(exMsg);
            }
        }
        else {

            try {
                let webresp = new AtParWebApiResponse<TKIT_REASON_CODES>();
                this.spinnerService.start();
                this.reasonCodeService.updateReasonCodes(this.newItem.REASON_CODE, this.newItem.REASON_DESCR)
                    .catch(this.httpService.handleError).then((resp: Response) => {
                        webresp = resp.json() as AtParWebApiResponse<TKIT_REASON_CODES>
                        this.spinnerService.stop();
                        switch (webresp.StatType) {
                            case StatusType.Success: {
                                this.growlMessage = [];
                                if (this.mode == ModeEnum[ModeEnum.Add].toString()) {
                                    let msg = AtParConstants.Created_Msg.replace("1%", 'Reason Code').replace("2%", this.newItem.REASON_CODE);
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                                    this.loading = false;
                                    this.newItem = new TKIT_REASON_CODES();
                                    this.reasonCodeStatus = null;
                                    this.descStatus = null;
                                    (<HTMLInputElement>document.getElementById('txtReasonCode')).focus();
                                }
                                else {
                                    let msg = AtParConstants.Updated_Msg.replace("1%", 'Reason Code').replace("2%", this.newItem.REASON_CODE);
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                                    (<HTMLInputElement>document.getElementById('txtDesc')).focus();
                                }
                                break;
                            }
                            case StatusType.Error: {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                break;
                            }
                            case StatusType.Warn: {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                break;
                            }
                        }

                    });
            } catch (exMsg) {
                this.clientErrorMsg(exMsg);
            }
        }


    }

    ddlOrgIDChanged() {
        if (this.newItem.REASON_CODE == null || this.newItem.REASON_CODE == undefined) {
            this.newItem.REASON_CODE = "";
        }
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == null || this.selectedOrgGroupId == "") {
                this.ddlOrgIDStatus = 1;
            }
            else {
                this.ddlOrgIDStatus = 0;
            }
        }
        if (this.Title == "Update" || this.blnShowOrgGroupLabel) {
            this.ddlOrgIDStatus = 0;
        }
        if (this.reasonCodeStatus == 0 && this.ddlOrgIDStatus == 0 && this.newItem.REASON_CODE != "") {
            if (this.descStatus == null || this.descStatus == undefined || this.descStatus == 0) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        else {
            this.loading = true;
        }

    }



    async dataFilter(evtdata, filed, filterMatchMode) {
        let filterData;
        this.growlMessage = [];

        this.lstReasonCodes.length = 0;

        if (this.statusType.toString() == "true") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == true)
        } else if (this.statusType.toString() == "false") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == false)
        } else {
            filterData = this.mainlstGridData
        }
        if (filterData != null) {
            for (let x = 0; x < filterData.length; x++) {
                let lstSetupcodeDetails = new TKIT_REASON_CODES();
                lstSetupcodeDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                lstSetupcodeDetails.REASON_CODE = filterData[x].REASON_CODE;
                lstSetupcodeDetails.REASON_DESCR = filterData[x].REASON_DESCR;

                lstSetupcodeDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                lstSetupcodeDetails.UPDATE_USERID = filterData[x].UPDATE_USERID;
                lstSetupcodeDetails.STATUS = filterData[x].STATUS;

                this.lstReasonCodes.push(lstSetupcodeDetails);
            }

        }
    }

} 