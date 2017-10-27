import { Component, OnDestroy, ViewChild } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { TKIT_ITEM_TYPE } from "../Entities/TKIT_ITEM_TYPE";
import { TKIT_EQ_INDICATOR } from "../Entities/TKIT_EQ_INDICATOR";
import { ManageEqTypeService } from './tkit-manage-equipment-type.service';
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
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { SelectItem } from '../components/common/api';
declare var module: {
    id: string;
}
@Component({
    templateUrl: 'tkit-manage-equipment-type.component.html',
    providers: [datatableservice, ManageEqTypeService, HttpService, AtParCommonService, AtParConstants]
})


export class ManageEquipmentTypeComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    equipmentIDSearch: string = "";
    showAddButton: boolean = true;
    mode: string;
    pop: boolean = false;
    table: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    sales: Employee[];
    ven: any;
    Title: string = "";
    bindSymbal: string = "";
    loading: boolean = true;
    equipmentStatus: number;
    descStatus: number;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    showTextBox: boolean = false;
    showLable: boolean = false;
    departmentID: string = "";
    public newItem = new TKIT_ITEM_TYPE();
    growlMessage: Message[] = [];
    _deviceTokenEntry: string[] = [];
    lstDepts: TKIT_ITEM_TYPE[];
    templstDepts: TKIT_ITEM_TYPE[];
    pageSize: number;
    menuCode: string;
    appID: string;
    auditSatus: string = "";
    changeDeptStatus: string;
    checkvalue: boolean = false;
    lstOrgGroups: SelectItem[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    orgGrpId: string = "";
    selectedOrgGroupId: string = "";
    selectedIndicator: string = "";
    orgGroupIDForDBUpdate: string;
    ddlIndicatorList: any;
    ddlOrgGpStatus: number;
    ddlindicatorStatus: number;
    equipmentType: string = "";
    showEquipmentTypelbl: boolean = false;
    showIndicatorlbl: boolean = false;
    Indicator: string = "";
    statusList: any;
    statusType: string;
    breadCrumbMenu: Menus;
    blnSortByColumn: boolean = true;
    preField: string = "";

    constructor(public dataservice: datatableservice,
        private mngEqTypeService: ManageEqTypeService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private leftBarAnimationService: LeftBarAnimationService) {       
        this.ven = new Employee();
        this.departmentID = "dept1";
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.breadCrumbMenu = new Menus();
    }


    async fillIndicatorDD() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            await this.mngEqTypeService.getEqIndicators().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<TKIT_EQ_INDICATOR>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {

                            this.ddlIndicatorList = [];

                            this.ddlIndicatorList.push({ label: "Select Indicator", value: "Select Indicator" })
                            for (var i = 0; i < data.DataList.length; i++) {
                                this.ddlIndicatorList.push({ label: data.DataList[i].EQ_INDICATOR + ' ( ' + data.DataList[i].EQ_DESC + ' ) ', value: data.DataList[i].EQ_INDICATOR })
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

    customSort(event, field) {
        this.blnSortByColumn = !this.blnSortByColumn;
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            } else {
                element.order = 1;
            }
        } else {
            element.order = 1;
        }
        this.preField = element.field;
       // this.sortedcheckedrec = [];
        //this.sorteduncheckedrec = [];
        let result = null;
        let order: boolean;
        if (element.field == 'ORG_GROUP_ID') {
            this.lstDepts = this.templstDepts;
            let filterlist = asEnumerable(this.lstDepts).Distinct(x => x.ORG_GROUP_ID).ToArray();
            if (filterlist != null || filterlist.length == 1) {
                return;
            }
        }
        try {
         
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    addEquipment() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Equipment Type';
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
        this.equipmentStatus = null;
        this.descStatus = null;
        this.ddlOrgGpStatus = null;
        this.ddlindicatorStatus = null;
        this.loading = true;
        this.newItem = new TKIT_ITEM_TYPE();
        this.equipmentIDSearch = "";
        this.bindOrgGroups();
        this.fillIndicatorDD();
        this.showEquipmentTypelbl = false;
        this.showIndicatorlbl = false;
        this.selectedIndicator = "";
        this.selectedOrgGroupId = "";

    }

    tbl() {
        this.form = false;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.table = true;
    }

    edit(data) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Equipment Type';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = false;
        this.showLable = true;
        this.form = true;
        this.table = false;
        this.showAddButton = false;
        this.showEquipmentTypelbl = true;
        this.showIndicatorlbl = true;
        this.Title = "Update";
        this.bindSymbal = "check";
        this.newItem = data;
        this.mode = ModeEnum[ModeEnum.Edit].toString();
        this.loading = false;
        this.equipmentIDSearch = "";
        this.equipmentType = data.ITEM_TYPE;
        this.Indicator = data.ITEM_TYPE_INDICATOR;
        this.orgGrpId = data.ORG_GROUP_ID;
        this.blnShowOrgGroupLabel = true;
        this.blnShowOrgGroupDD = false;
       // this.bindOrgGroups();
        this.fillIndicatorDD();
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
        this.newItem = new TKIT_ITEM_TYPE();
        this.equipmentIDSearch = "";
        this.selectedOrgGroupId = "";
        this.selectedIndicator = "";
        this.growlMessage = [];
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    ngOnInit(): void {
        this.table = false;
        this.showAddButton = true;
        this.newItem = new TKIT_ITEM_TYPE();
        this.pageSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.menuCode = localStorage.getItem("menuCode") != null ? localStorage.getItem("menuCode") : 'mt_tkit_manage_equipment_type.aspx';
        this.appID = (EnumApps.TrackIT).toString();
        this.checkAuditAllowed();
        this.fillSerachIndicatorDD();
        this.statusType = null;
    }

    fillSerachIndicatorDD() {
        this.statusList = [];
        this.statusList.push({ label: 'All', value: null });
        this.statusList.push({ label: 'B (BOX)', value: 'B (BOX)' });
        this.statusList.push({ label: 'E (EQUIPMENT)', value: 'E (EQUIPMENT)' });
        this.statusList.push({ label: 'F (FURNITURE)', value: 'F (FURNITURE)' });
    }

    ngOnDestroy() {
        this.equipmentIDSearch = null;
        this.mode = null;
        this.Title = null;
        this.bindSymbal = null;
        this.equipmentStatus = null;
        this.descStatus = null;
        this.ddlOrgGpStatus = null;
        this.ddlindicatorStatus = null;
        this.departmentID = null;
        this.newItem = null;
        this.growlMessage = null;
        this._deviceTokenEntry = null;
        this.lstDepts = null;
        this.pageSize = null;
        this.menuCode = null;
        this.appID = null;
        this.auditSatus = null;
        this.changeDeptStatus = null;
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            await this.commonService.getUserOrgGroups(this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            // this.blnStatusMsg = false;

                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupDD = false;;
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + ' - ' + this.orgGroupData[0].ORG_GROUP_NAME;
                                break;

                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.blnShowOrgGroupLabel = false;
                                this.lstOrgGroups = [];
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

    ddlOrgGpChange() {
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == null || this.selectedOrgGroupId == "") {
                this.ddlOrgGpStatus = 1;
            }
            else {
                this.ddlOrgGpStatus = 0;
            }
        }
        else if (this.blnShowOrgGroupLabel) {
            this.ddlOrgGpStatus = 0;
        }

        if (this.showIndicatorlbl) {
            this.ddlindicatorStatus = 0;
        }
        else {
            if (this.selectedIndicator == "Select Indicator" || this.selectedIndicator == undefined || this.selectedIndicator == null || this.selectedIndicator == "") {
                this.ddlindicatorStatus = 1;
            }
            else {
                this.ddlindicatorStatus = 0;
            }
        }

        if (this.equipmentStatus == 0 && this.descStatus == 0 && this.ddlindicatorStatus == 0 && this.ddlOrgGpStatus == 0 && (this.newItem.ITEM_TYPE != "" || this.newItem.ITEM_TYPE != undefined || this.newItem.ITEM_TYPE != null) && (this.newItem.ITEM_TYPE_DESCR != "" || this.newItem.ITEM_TYPE_DESCR != undefined || this.newItem.ITEM_TYPE_DESCR != null)) {
            this.loading = false;
        }
        else {
            this.loading = true;
        }

        this.newItem.ORG_GROUP_ID = this.selectedOrgGroupId;
    }

    // Add and Update button validations
    bindModelDataChange(event: any) {
        try {

            if ("txtEquipment" == event.TextBoxID.toString()) {
                this.equipmentStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtDesc" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(x => x.status == false).length;
            }

            this.ddlOrgGpChange();

            if (this.mode == ModeEnum[ModeEnum.Add].toString()) {
                if (this.equipmentStatus == 0 && this.descStatus == 0 && this.ddlindicatorStatus == 0 && this.ddlOrgGpStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }

            if (this.mode == ModeEnum[ModeEnum.Edit].toString()) {
                if (this.descStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    async BindGrid() {
        if (this.table == true) {
            this.dataTableComponent.reset();
        }

        try {
            this.statusType = null;
            this.table = false;
            if (this.mode == "Edit") {
                this.showAddButton = true;
            }

            this.spinnerService.start();
            if (this.equipmentIDSearch == null || this.equipmentIDSearch == undefined || this.equipmentIDSearch === "") {
                this.equipmentIDSearch = "";
            }

            await this.mngEqTypeService.getEquipmentTypes("", this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.equipmentIDSearch)
                .catch(this.httpService.handleError)
                .then((resp: Response) => {
                    let webresp = resp.json() as AtParWebApiResponse<TKIT_ITEM_TYPE>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {

                            this.growlMessage = [];
                            this.lstDepts = [];
                            this.lstDepts = webresp.DataList;
                            this.templstDepts = webresp.DataList;
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

        this.newItem.ITEM_TYPE_INDICATOR = this.selectedIndicator;
        this.newItem.ORG_GROUP_ID = this.orgGroupIDForDBUpdate;
        if (this.Title == "Save") {
            try {
                let webresp = new AtParWebApiResponse<TKIT_ITEM_TYPE>();
                this.spinnerService.start();

                this.mngEqTypeService.saveEqTypeData(this.newItem)
                    .catch(this.httpService.handleError).then((resp: Response) => {
                        webresp = resp.json() as AtParWebApiResponse<TKIT_ITEM_TYPE>
                        this.spinnerService.stop();
                        switch (webresp.StatType) {
                            case StatusType.Success: {
                                this.growlMessage = [];
                                let msg = AtParConstants.Created_Msg.replace("1%", 'Equipment Type').replace("2%", this.newItem.ITEM_TYPE);
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                                this.equipmentStatus = null;
                                this.descStatus = null;
                                this.ddlOrgGpStatus = null;
                                this.ddlindicatorStatus = null;
                                this.loading = true;
                                this.selectedOrgGroupId = "";
                                this.newItem = new TKIT_ITEM_TYPE();
                                if (this.blnShowOrgGroupDD) {
                                    (<HTMLInputElement>document.getElementById('txtddllstOrgGroups')).focus();
                                }
                                else {
                                    (<HTMLInputElement>document.getElementById('txtEquipment')).focus();
                                }
                                this.selectedIndicator = "Select Indicator";
                                this.selectedOrgGroupId = "";
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
                let webresp = new AtParWebApiResponse<TKIT_ITEM_TYPE>();
                this.spinnerService.start();
                this.mngEqTypeService.updateEqTypeData(this.newItem)
                    .catch(this.httpService.handleError).then((resp: Response) => {
                        webresp = resp.json() as AtParWebApiResponse<TKIT_ITEM_TYPE>
                        this.spinnerService.stop();
                        switch (webresp.StatType) {
                            case StatusType.Success: {
                                this.growlMessage = [];

                                let msg = AtParConstants.Updated_Msg.replace("1%", 'Equipment Type').replace("2%", this.newItem.ITEM_TYPE);
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                                this.loading = false;
                                //this.newItem = new TKIT_ITEM_TYPE();
                                (<HTMLInputElement>document.getElementById('txtDesc')).focus();
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

    filterStatus(value, field, mode) {
        if (value == null) {
            this.lstDepts = this.templstDepts;
        }
        else {
            this.lstDepts = asEnumerable(this.templstDepts).Where(x => x.ITEM_TYPE_INDICATOR_DESC === value).Select(x => x).ToArray();
        }
    }

    private ddlIndicatorChange() {
        this.newItem.ITEM_TYPE_INDICATOR = this.selectedIndicator;
        this.ddlOrgGpChange();
    }
}

