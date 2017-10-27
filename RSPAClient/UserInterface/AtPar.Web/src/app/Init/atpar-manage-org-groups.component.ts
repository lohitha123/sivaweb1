import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response } from '@angular/http';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { TokenEntry_Enum, ClientType, StatusType, EnumApps, Enable_Lot_Serial_Tracking, YesNo_Enum } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../entities/mt_atpar_org_group_bunits';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { MT_ATPAR_APP } from '../entities/mt_atpar_app';
import { VM_MT_ATPAR_ORG_GROUP_PARAMETERS } from '../entities/vm_mt_atpar_org_group_parameters';
import { MT_ATPAR_ORG_GROUP_PARAMETERS } from '../entities/mt_atpar_org_group_parameters';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Message } from './../components/common/api';
import { ManageOrgGroupsService } from './atpar-manage-org-groups.service';
import { regExpValidator } from '../components/atpartext/Validators';
import { DataTable } from '../components/datatable/datatable';
import { AtParConstants } from '../Shared/AtParConstants';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'atpar-manage-org-groups.component.html',
    providers: [ManageOrgGroupsService, AtParCommonService],
})

export class ManageOrgGroupsComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    lnkbtnBUnit: boolean = false;
    lnkbtnParams: boolean = false;
    MOG: boolean = true;
    pop: boolean = false;
    menu: boolean = true;
    orgGroupGrd: boolean = false;
    breadCrumbMenu: Menus;

    //variables
    @Input() appId: string;
    deviceTokenEntry: string[] = [];
    orgGroupLst: MT_ATPAR_ORG_GROUPS[];
    orgGrpIdSearchLst: MT_ATPAR_ORG_GROUPS[];
    orgGroNameSearchLst: MT_ATPAR_ORG_GROUPS[];
    orgGroupBunitsLst: MT_ATPAR_ORG_GROUP_BUNITS[];
    atParAppsLst: MT_ATPAR_APP[];
    atParOrgGrpParametersLst: VM_MT_ATPAR_ORG_GROUP_PARAMETERS[];
    statusMsgs: Message[] = [];

    assignParamLst: Array<MT_ATPAR_ORG_GROUP_PARAMETERS>;
    mngOrgGrpBunitsLst: Array<MT_ATPAR_ORG_GROUP_BUNITS>;
    auditSecurityLst: Array<MT_ATPAR_SECURITY_AUDIT>;
    lstgridfilterData: MT_ATPAR_ORG_GROUP_BUNITS[];
    assignParamEntity: MT_ATPAR_ORG_GROUP_PARAMETERS;
    mngOrgGrpBunitEntity: MT_ATPAR_ORG_GROUP_BUNITS;
    auditSecurity: MT_ATPAR_SECURITY_AUDIT;

    //string variables
    strUserID: string = undefined;
    pProfile: string = "";
    orgGroupId: string = "";
    orgGroupName: string = "";
    selectedorgGrpId: string = "";
    selectedorgGrpName: string = "";
    txtOrgGrpId: string = "";
    txtOrgGrpName: string = "";
    strOrgGrpID: string = "";
    strAudit: string = "";
    strAppId: string = "";
    lblOrgGrpId: string = "";
    strOldGrpName: string = "";
    pageDisplayName = "";//Manager Org Groups

    //boolean variables  
    divOrgParamsData: boolean = false;
    buttonEnableDisable: boolean = true;
    blnlblOrgGrpId: boolean = false;
    grdMngOrgGrpBunits: boolean = false;
    btnMngOrgGrpButton: boolean = true;

    statType: any;
    statMsg: any;
    selectedApp: any;
    ddlApps: any;

    recordsPerPageSize: number;
    intAppId: number;
    statusCode: number = -1;
    statusType: number = -1;
    defaultNoOfRecs: number = 0;
    txtOrgGrpIdStatus: number;
    txtOrgGrpNameStatus: number;

    startIndex: number;
    EndIndex: number;

    blnsortbycolumn: boolean = true;
    sortCol: string = "";

    dataCheckedSorting: MT_ATPAR_ORG_GROUP_BUNITS[] = [];
    dataUncheckedSorting: Array<MT_ATPAR_ORG_GROUP_BUNITS>;
    sortedcheckedrec: MT_ATPAR_ORG_GROUP_BUNITS[];
    sorteduncheckedrec: MT_ATPAR_ORG_GROUP_BUNITS[];
    homeurl() {
        this.leftBarAnimationsewrvice.isHomeClicked = false;
        this.leftBarAnimationsewrvice.isHide();
        this.router.navigate(['atpar']);
    }

    constructor(private leftBarAnimationsewrvice: LeftBarAnimationService,
        private router: Router,
        private route: ActivatedRoute,
        private spnrService: SpinnerService,
        private httpService: HttpService,
        private mngOrgGroupsService: ManageOrgGroupsService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants) {
        this.breadCrumbMenu = new Menus();
    }

    clicked(event) {
        try {
            this.statusMsgs = [];
            event.preventDefault();
            var target = event.target || event.srcElement || event.currentTarget;
            var idAttr = target.attributes.id;
            var value = idAttr.nodeValue;
            if (value == "lnkbtnBUnit") {
                this.lnkbtnBUnit = true;
                this.lnkbtnParams = false;
                this.MOG = false;
            } else if (value == "lnkbtnParams") {
                this.lnkbtnParams = true;
                this.lnkbtnBUnit = false;
                this.MOG = false;
            } else if (value == "add") {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Create Org Group';
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu))
                this.txtOrgGrpId = "";
                this.txtOrgGrpName = "";
                this.buttonEnableDisable = true;
                this.txtOrgGrpNameStatus = null;
                this.txtOrgGrpIdStatus = null;
                this.blnlblOrgGrpId = false;
                this.menu = false;
                this.pop = true;
                this.orgGroupGrd = false;
            } else if (value == "close") {
                this.breadCrumbMenu.SUB_MENU_NAME = '';
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                this.menu = true;
                this.pop = false;
                this.orgGroupGrd = false;
            }
            else {
                this.pageDisplayName = ""; //Manager Org Groups
                this.lnkbtnBUnit = false;
                this.lnkbtnParams = false;
                this.MOG = true;
                this.menu = true;
                this.breadCrumbMenu.SUB_MENU_NAME = '';
                this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "clicked");
        }
    }

    async ngOnInit() {
        try {
            this.intAppId = parseInt(this.appId);
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.mngOrgGrpBunitsLst = new Array<MT_ATPAR_ORG_GROUP_BUNITS>();
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            await this.page_Load();

        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async page_Load() {
        try {
            this.selectedorgGrpId = "";
            this.selectedorgGrpName = "";
            this.strUserID = this.deviceTokenEntry[TokenEntry_Enum.UserID];
            //'Give Application and menu id's here
            if (typeof this.appId == 'undefined') {
                this.intAppId = 0;
            } else {
                this.intAppId = parseInt(this.appId);
            }
            this.orgGroupGrd = false;
            await this.checkAuditAllowed();
        } catch (ex) {
            this.clientErrorMsg(ex, "page_Load");
        }
    }

    async checkAuditAllowed() {
        try {
            this.statusMsgs = [];
            this.strAudit = "";
            this.spnrService.start();
            let screenName = localStorage.getItem("menuCode");
            if (screenName == null) {
                screenName = "mt_atpar_manage_org_groups.aspx";
            }
            await this.commonService.getAuditAllowed(this.intAppId.toString(), screenName.toString()).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.strAudit = data.Data.toString();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex, "checkAuditAllowed");
        }
    }

    async bindDataGrid() {
        try {
            if (this.dataTableComponent != null) {
                this.dataTableComponent.reset();
            }
            this.statusMsgs = [];
            this.orgGroupId = this.selectedorgGrpId;
            this.orgGroupName = this.selectedorgGrpName;

            this.spnrService.start();
            await this.commonService.getOrgGrpIDs(this.orgGroupId, this.orgGroupName, this.deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.orgGroupLst = res.json().DataList,

                        this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.orgGroupLst == null || this.orgGroupLst.length == 0) {
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: "No data for the search criteria entered" });
                            }
                            else {
                                for (var i = 0; i < this.orgGroupLst.length; i++) {
                                    this.orgGroupLst[i].ORG_GROUP_NAME = this.orgGroupLst[i].ORG_GROUP_NAME.replace(/\%20/g, ' ');
                                }
                                this.orgGroupGrd = true;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

            this.spnrService.start();
            await this.commonService.getMyPreferences("RECORDS_PER_PAGE", this.deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.defaultNoOfRecs = parseInt(data.DataVariable.toString());
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.defaultNoOfRecs == 0) {
                                if (this.orgGroupLst.length > 0) {
                                } else {
                                }
                            } else {

                            }
                            this.pProfile = this.deviceTokenEntry[TokenEntry_Enum.ProfileID];
                            this.orgGroupId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
                            //To Disable BUnits Link for "All" OrgGroupID
                            for (var i = 0; i <= this.orgGroupLst.length - 1; i++) {
                                let orgId = this.orgGroupLst[i].ORG_GROUP_ID;//this.orgId
                                if (orgId == "All") {
                                    if (this.pProfile != undefined) {
                                        if (this.pProfile != "admin" || this.orgGroupId != "All") {
                                        }
                                    }
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex, "bindDataGrid");
        }
    }

    async btnGo_Clicked(event) {
        try {
            // lblUpdateFlag.Text = "N";
            this.orgGroupGrd = false;
            await this.bindDataGrid();
        } catch (ex) {
            this.clientErrorMsg(ex, "btnGo_Clicked");
        }
    }

    searchAutoCompleteOrgID(event) {
        try {
            this.statusMsgs = [];
            let query = event.query;
            if (this.orgGroupLst != null && this.orgGroupLst.length > 0) {
                this.orgGrpIdSearchLst = this.orgGroupLst;
                this.orgGrpIdSearchLst = this.filterOrgGroupIds(query, this.orgGrpIdSearchLst);
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "searchAutoCompleteOrgID");
        }
    }

    filterOrgGroupIds(query, orgGroupIds: any[]): any[] {
        try {
            let filtered : any[] = [];
            if (query == "%") {
                if (orgGroupIds != null && orgGroupIds.length > 0) {
                    for (let i = 0; i < orgGroupIds.length; i++) {
                        let orgGrpIdsvalue = orgGroupIds[i];
                        filtered.push(orgGrpIdsvalue.ORG_GROUP_ID);
                    }
                }
            } else {
                if (query.length >= 1) {
                    if (orgGroupIds != null && orgGroupIds.length > 0) {
                        for (let i = 0; i < orgGroupIds.length; i++) {
                            let orgGrpIdsvalue = orgGroupIds[i];
                            if (orgGrpIdsvalue.ORG_GROUP_ID.toString().toUpperCase().indexOf(query.toString().toUpperCase()) == 0) {
                                filtered.push(orgGrpIdsvalue.ORG_GROUP_ID);
                            }
                        }
                    }
                }
            }
            return filtered;
        } catch (ex) {
            this.clientErrorMsg(ex, "filterOrgGroupIds");
        }
    }

    searchAutoCompleteOrgName(event) {
        try {
            let query = event.query;
            if (this.orgGroupLst != null && this.orgGroupLst.length > 0) {
                this.orgGrpIdSearchLst = this.orgGroupLst;
                this.orgGrpIdSearchLst = this.filterOrgGroupIds(query, this.orgGrpIdSearchLst);
            }
            //this.orgGroNameSearchLst = this.orgGroupLst;
            //this.orgGroNameSearchLst = this.filterOrgGrpNames(query, this.orgGroNameSearchLst)

        } catch (ex) {
            this.clientErrorMsg(ex, "searchAutoCompleteOrgName");
        }
    }

    filterOrgGrpNames(query, orgGrpNames: any[]): any[] {
        try {
            let filtered : any[] = [];
            if (query == "%") {
                for (let i = 0; i < orgGrpNames.length; i++) {
                    let orgGrpNameValue = orgGrpNames[i];
                    filtered.push(orgGrpNameValue.ORG_GROUP_NAME);
                }

            } else {
                if (query.length >= 1) {
                    for (let i = 0; i < orgGrpNames.length; i++) {
                        let orgGrpNameValue = orgGrpNames[i];
                        if (orgGrpNameValue.ORG_GROUP_NAME.toString().toUpperCase().indexOf(query.toString().toUpperCase()) == 0) {
                            filtered.push(orgGrpNameValue.ORG_GROUP_NAME);
                        }
                    }
                }
            }
            return filtered;
        } catch (ex) {
            this.clientErrorMsg(ex, "filterOrgGrpNames");
        }
    }

    async btn_SaveOrgGroupsInfo(event) {
        try {
            this.statusMsgs = [];
            if (!this.blnlblOrgGrpId) {
                if (this.txtOrgGrpId != "" && this.txtOrgGrpName != "") {
                    this.spnrService.start();
                    await this.mngOrgGroupsService.saveOrgGroupsInfo(this.txtOrgGrpId, this.txtOrgGrpName, "", this.strUserID).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let response = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                            this.statusCode = response.StatusCode;
                            this.spnrService.stop();
                            switch (response.StatType) {
                                case StatusType.Success: {
                                    this.orgGroupGrd = false;
                                    let msg = AtParConstants.Created_Msg.replace("1%", "Org Group").replace("2%", this.txtOrgGrpId);
                                    this.statusMsgs.push({
                                        severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg
                                    });
                                    this.txtOrgGrpId = "";
                                    this.txtOrgGrpName = "";
                                    this.buttonEnableDisable = true;
                                    this.txtOrgGrpNameStatus = null;
                                    this.txtOrgGrpIdStatus = null;
                                    this.blnlblOrgGrpId = false;
                                    document.getElementById('txtOrgGrpId').focus();
                                    break;
                                }
                                case StatusType.Warn: {
                                    var s = response.StatusMessage.includes("(OrgID)");
                                    if (s == true) {
                                        response.StatusMessage = response.StatusMessage.replace('Org ID', 'Org');
                                        response.StatusMessage = response.StatusMessage.replace('(OrgID)', this.txtOrgGrpId);
                                    }
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    break;
                                }
                                case StatusType.Error: {
                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    break;
                                }
                                case StatusType.Custom: {
                                    if (this.statusCode == AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION) {
                                        response.StatusMessage = "Organization GroupID " + this.txtOrgGrpId + " already exists "
                                        this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    } else {
                                        this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    }

                                    break;
                                }
                            }
                        });

                    this.spnrService.stop();
                } else if (this.txtOrgGrpId == "" && this.txtOrgGrpName != "") {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter Org Group ID" });
                } else if (this.txtOrgGrpName == "" && this.txtOrgGrpId != "") {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: " Please enter Org Group Name" });
                } else {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter Org Group Id and Org Group Name" });
                }
            } else {
                let statusType = null;
                let statusMessags = null;
                if (this.txtOrgGrpName != "") {
                    this.spnrService.start();
                    await this.mngOrgGroupsService.updateOrgGroupsInfo(this.txtOrgGrpName, this.lblOrgGrpId, this.strUserID).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let response = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                            this.statusCode = response.StatusCode;
                            statusType = response.StatType;
                            statusMessags = response.StatusMessage;
                            document.getElementById('txtOrgGrpName').focus();
                            this.spnrService.stop();
                        });

                    this.spnrService.stop();
                } else if (this.txtOrgGrpName == "") {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: " Please enter Org Group Name" });
                }

                if (statusType != null) {
                    switch (statusType) {
                        case StatusType.Success: {
                            let screenName = localStorage.getItem("menuCode");
                            this.auditSecurityLst = new Array<MT_ATPAR_SECURITY_AUDIT>();
                            if (this.strOldGrpName != this.txtOrgGrpName) {
                                this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                this.auditSecurity.OLD_VALUE = this.strOldGrpName;
                                this.auditSecurity.NEW_VALUE = this.txtOrgGrpName;
                                this.auditSecurity.FIELD_NAME = "ORG_GROUP_NAME";
                                this.auditSecurity.KEY_1 = this.lblOrgGrpId;
                                this.auditSecurity.KEY_2 = "";
                                this.auditSecurity.KEY_3 = "";
                                this.auditSecurity.KEY_4 = "";
                                this.auditSecurity.KEY_5 = "";
                                this.auditSecurityLst.push(this.auditSecurity);

                                this.spnrService.start();
                                await this.commonService.insertAuditData(this.auditSecurityLst, this.strUserID, screenName).
                                    catch(this.httpService.handleError).then((res: Response) => {
                                        let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;
                                        this.spnrService.stop();
                                        switch (response.StatType) {
                                            case StatusType.Success: {
                                                break;
                                            }
                                            case StatusType.Warn: {
                                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                                break;
                                            }
                                            case StatusType.Error: {
                                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                                break;
                                            }
                                            case StatusType.Custom: {
                                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                                break;
                                            }
                                        }
                                    });
                            }
                            this.buttonEnableDisable = false;
                            let msg = AtParConstants.Updated_Msg.replace("1%", "Org Group").replace("2%", this.lblOrgGrpId);
                            this.statusMsgs.push({
                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg
                            });

                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: statusMessags });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: statusMessags });
                            break;
                        }
                        case StatusType.Custom: {
                            if (this.statusCode == AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION) {
                                statusMessags = "Organization GroupID " + this.lblOrgGrpId + " already exists "
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: statusMessags });
                            } else {
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: statusMessags });
                            }

                            break;
                        }
                    }
                }

            }
        } catch (ex) {
            this.clientErrorMsg(ex, "btn_SaveOrgGroupsInfo");
        }
    }

    async lnkbtnBUnit_Click(event, selectedRowData) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Business Units';
            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.pageDisplayName = "->Manage Org Group Business Units";
            this.statusMsgs = [];
            event.preventDefault();
            var target = event.target || event.srcElement || event.currentTarget;
            var idAttr = target.attributes.id;
            var value = idAttr.nodeValue;
            if (value == "lnkbtnBUnit") {
                this.lnkbtnBUnit = true;
                this.lnkbtnParams = false;
                this.MOG = false;
            }
            this.strOrgGrpID = selectedRowData.ORG_GROUP_ID;
            await this.bindManageOrgGrpBunits();
        } catch (ex) {
            this.clientErrorMsg(ex, "lnkbtnBUnit_Click");
        }
    }

    async bindManageOrgGrpBunits() {
        try {
            this.dataCheckedSorting = [];
            this.dataUncheckedSorting = [];

            this.statusMsgs = [];
            this.btnMngOrgGrpButton = false;
            this.grdMngOrgGrpBunits = false;
         let sortedCheckedData: MT_ATPAR_ORG_GROUP_BUNITS[];
           let sortedUnCheckedData: MT_ATPAR_ORG_GROUP_BUNITS[];
            this.mngOrgGrpBunitsLst = new Array<MT_ATPAR_ORG_GROUP_BUNITS>();
            this.spnrService.start();
            await this.commonService.getOrgBUnits(this.strOrgGrpID, this.deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.orgGroupBunitsLst = res.json().DataList;
                    this.lstgridfilterData = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.orgGroupBunitsLst != null && this.orgGroupBunitsLst.length > 0) {
                                this.grdMngOrgGrpBunits = true;
                                this.btnMngOrgGrpButton = true;
                                for (let i = 0; i < this.orgGroupBunitsLst.length; i++) {
                                    this.mngOrgGrpBunitEntity = new MT_ATPAR_ORG_GROUP_BUNITS();
                                    this.mngOrgGrpBunitEntity.BUSINESS_UNIT = this.orgGroupBunitsLst[i].BUSINESS_UNIT.toString().trim();

                                    if (this.orgGroupBunitsLst[i].CHK_VALUE == "1") {
                                        this.mngOrgGrpBunitEntity.CHK_VALUE = true;
                                        this.dataCheckedSorting.push(this.orgGroupBunitsLst[i]);
                                    } else {
                                        this.mngOrgGrpBunitEntity.CHK_VALUE = false;
                                        this.dataUncheckedSorting.push(this.orgGroupBunitsLst[i]);
                                    }

                                    if (this.orgGroupBunitsLst[i].BU_TYPE == "I") {
                                        this.mngOrgGrpBunitEntity.BU_TYPE = "Inventory";
                                    } else {
                                        this.mngOrgGrpBunitEntity.BU_TYPE = "Purchasing";
                                    }

                                    this.mngOrgGrpBunitEntity.LAST_UPDATE_DATE = this.orgGroupBunitsLst[i].LAST_UPDATE_DATE;
                                    this.mngOrgGrpBunitEntity.LAST_UPDATE_USERID = this.orgGroupBunitsLst[i].LAST_UPDATE_USERID;
                                    this.mngOrgGrpBunitEntity.ORG_GROUP_ID = this.orgGroupBunitsLst[i].ORG_GROUP_ID;
                                    this.mngOrgGrpBunitEntity.CHK_PrvStatus = this.orgGroupBunitsLst[i].CHK_VALUE;
                                    this.mngOrgGrpBunitEntity.Description = this.orgGroupBunitsLst[i].Description.toString().trim();
                                    this.mngOrgGrpBunitsLst.push(this.mngOrgGrpBunitEntity);
                                }

                               sortedCheckedData = [];
                               sortedUnCheckedData = [];
                              sortedCheckedData = asEnumerable(this.mngOrgGrpBunitsLst).OrderByDescending(x => x.BUSINESS_UNIT).ToArray();//.OrderBy(x => x.Description).ToArray();
                               sortedUnCheckedData = asEnumerable(sortedCheckedData).OrderBy(x => x.CHK_VALUE).ToArray();
                                this.mngOrgGrpBunitsLst = new Array<MT_ATPAR_ORG_GROUP_BUNITS>();
                               this.mngOrgGrpBunitsLst = sortedUnCheckedData.reverse();//.concat(sortedCheckedData.reverse());

                               
                               

                            } else {
                                this.btnMngOrgGrpButton = true;
                                this.grdMngOrgGrpBunits = false;
                            }

                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.btnMngOrgGrpButton = true;
                            break;
                        }
                        case StatusType.Error: {
                            this.grdMngOrgGrpBunits = false;
                            this.btnMngOrgGrpButton = true;
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.btnMngOrgGrpButton = true;
                            break;
                        }
                    }
                });
           sortedCheckedData = [];
            sortedUnCheckedData = [];
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex, "bindManageOrgGrpBunits");
        }
    }

    async orgGrpBUnitChkboxChanged(lstData, event) {
        try {
            if (event != null && event != undefined) {
                lstData.CHK_VALUE = event;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "orgGrpBUnitChkboxChanged");
        }
    }

    async updateMngOrgGrpBunitslst() {
        try {
            this.statusMsgs = [];
            let boolAudit: boolean = false;
            this.auditSecurityLst = new Array<MT_ATPAR_SECURITY_AUDIT>();
            for (let intCnount = 0; intCnount <= this.mngOrgGrpBunitsLst.length - 1; intCnount++) {
                //Check once
                //if (this.chkbCntrlValue != null) {
                if (this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE != null) {
                    //intIndex = ((Label)_with1.FindControl("rowIndex")).Text;

                    //update only when changes are done to the datagrid  this.chkbCntrlValue == "Y"
                    if (this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE.toString() == "true") {
                        this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE = "1";


                        if (this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE.toString() != this.mngOrgGrpBunitsLst[intCnount].CHK_PrvStatus.toString()) {
                            boolAudit = true;
                            this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                            this.auditSecurity.KEY_1 = this.orgGroupId;//Check Once   dRowAudit("KEY_1") = strOrgId;
                            this.auditSecurity.KEY_2 = this.mngOrgGrpBunitsLst[intCnount].BUSINESS_UNIT;
                            this.auditSecurity.KEY_3 = "";
                            this.auditSecurity.KEY_4 = "";
                            this.auditSecurity.KEY_5 = "";
                            this.auditSecurity.FIELD_NAME = "BUSINESS_UNIT";
                            this.auditSecurity.OLD_VALUE = "N";
                            this.auditSecurity.NEW_VALUE = "Y";
                            this.auditSecurityLst.push(this.auditSecurity);

                        }
                    } else {
                        this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE = "0";
                        if (this.mngOrgGrpBunitsLst[intCnount].CHK_VALUE.toString() != this.mngOrgGrpBunitsLst[intCnount].CHK_PrvStatus.toString()) {
                            boolAudit = true;
                            this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                            this.auditSecurity.KEY_1 = this.orgGroupId;//Check Once   dRowAudit("KEY_1") = strOrgId;
                            this.auditSecurity.KEY_2 = this.mngOrgGrpBunitsLst[intCnount].BUSINESS_UNIT;
                            this.auditSecurity.KEY_3 = "";
                            this.auditSecurity.KEY_4 = "";
                            this.auditSecurity.KEY_5 = "";
                            this.auditSecurity.FIELD_NAME = "BUSINESS_UNIT";
                            this.auditSecurity.OLD_VALUE = "Y";
                            this.auditSecurity.NEW_VALUE = "N";
                            this.auditSecurityLst.push(this.auditSecurity);

                        }
                    }
                }
            }

            // Session["dsAllocBUnits"] = dsAllocBUnits;
            this.strUserID = this.deviceTokenEntry[TokenEntry_Enum.UserID];

            if (boolAudit == true && this.strAudit == "Y") {
                let screenName = localStorage.getItem("menuCode");
                // let strScreenName = "mt_atpar_manage_org_groups.aspx";
                //strFieldName = "ORG_GROUP_ID";
                this.spnrService.start();
                await this.commonService.insertAuditData(this.auditSecurityLst, this.strUserID, screenName).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;
                        this.spnrService.stop();
                        switch (response.StatType) {
                            case StatusType.Success: {

                                break;
                            }
                            case StatusType.Warn: {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                break;
                            }
                        }
                    });
                this.spnrService.stop();
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "updateMngOrgGrpBunitslst");
        }
    }

    async btnAssignBUints_Click(event) {
        try {
            this.statusMsgs = [];
            this.grdMngOrgGrpBunits = false;
            this.btnMngOrgGrpButton = false;
            for (let i = 0; i < this.mngOrgGrpBunitsLst.length; i++) {

                if (this.mngOrgGrpBunitsLst[i].BU_TYPE == "Inventory") {
                    this.mngOrgGrpBunitsLst[i].BU_TYPE = "I";
                } else {
                    this.mngOrgGrpBunitsLst[i].BU_TYPE = "P";
                }
            }

            await this.updateMngOrgGrpBunitslst();
            let response;
            this.spnrService.start();
            await this.mngOrgGroupsService.saveOrgGroupsBUnits(this.strUserID, this.strOrgGrpID, this.mngOrgGrpBunitsLst).
                catch(this.httpService.handleError).then((res: Response) => {
                    response = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                });
            switch (response.StatType) {
                case StatusType.Success: {
                    this.lstgridfilterData = [];
                    await this.bindManageOrgGrpBunits();
                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Business Units Updated Successfully." });
                    break;
                }
                case StatusType.Warn: {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                    break;
                }
                case StatusType.Error: {
                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                    break;
                }
                case StatusType.Custom: {
                    this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                    break;
                }
            }

            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex, "btnAssignBUints_Click");
        }
    }

    checkAll() {
        try {
            this.statusMsgs = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length >0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].CHK_VALUE = true;
                }
            }
            else {
                if (this.EndIndex > this.mngOrgGrpBunitsLst.length) {
                    this.EndIndex = this.mngOrgGrpBunitsLst.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.mngOrgGrpBunitsLst[i].CHK_VALUE = true;
                }
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    unCheckAll() {
        try {
            this.statusMsgs = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].CHK_VALUE = false;
                }
            }
            else {
                if (this.EndIndex > this.mngOrgGrpBunitsLst.length) {
                    this.EndIndex = this.mngOrgGrpBunitsLst.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.mngOrgGrpBunitsLst[i].CHK_VALUE = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    filterMngOrgGrpBunitsLst(event) {
        this.statusMsgs = [];
        this.lstgridfilterData = new Array<MT_ATPAR_ORG_GROUP_BUNITS>();
        this.lstgridfilterData = event;
    }

    //second popup code starts
    async lnkbtnParams_Click(event, selectedRowData) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Parameters';
            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.pageDisplayName = "->Manage Org Group Parameters";
            this.statusMsgs = [];
            event.preventDefault();
            var target = event.target || event.srcElement || event.currentTarget;
            var idAttr = target.attributes.id;
            var value = idAttr.nodeValue;
            if (value == "lnkbtnParams") {
                this.lnkbtnParams = true;
                this.lnkbtnBUnit = false;
                this.MOG = false;
                this.divOrgParamsData = false;
            }
            this.selectedApp = "Select Product";
            this.strOrgGrpID = selectedRowData.ORG_GROUP_ID;
            this.strUserID = this.deviceTokenEntry[TokenEntry_Enum.UserID];
            this.spnrService.start();
            await this.commonService.getApps(this.strUserID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_APP>;
                    this.atParAppsLst = res.json().DataList,
                        this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddlApps = [];
                            this.ddlApps.push({ label: "Select Product", value: "0" });
                            if (this.atParAppsLst.length > 0) {
                                for (var i = 0; i <= this.atParAppsLst.length - 1; i++) {
                                    if (this.atParAppsLst[i].APP_NAME.toString().toLocaleUpperCase() != "ATPAR" && this.atParAppsLst[i].APP_ID != EnumApps.Reports) {
                                        this.ddlApps.push({ label: this.atParAppsLst[i].APP_NAME.toString(), value: this.atParAppsLst[i].APP_ID.toString() });
                                    }
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex, "lnkbtnParams_Click");
        }
    }

    async app_selectChanged(option, event) {
        try {
            this.statusMsgs = [];
            this.atParOrgGrpParametersLst = null;
            if (event != null && event != undefined) {
                this.selectedApp = event.value;
                let selectedProduct = event.label;
                this.divOrgParamsData = false;
                if (selectedProduct == "Select Product") {
                    return;
                }
                if (this.selectedApp != null && this.selectedApp != undefined && this.selectedApp != "0") {
                    this.divOrgParamsData = true;
                    let strAppIdName = event.label.toString();
                    this.strAppId = event.value.toString();

                    this.spnrService.start();
                    await this.commonService.getAppParameters(this.strUserID, this.strOrgGrpID, this.strAppId).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<VM_MT_ATPAR_ORG_GROUP_PARAMETERS>;
                            this.atParOrgGrpParametersLst = res.json().DataList;
                            this.addValidations(this.atParOrgGrpParametersLst);
                            this.spnrService.stop();
                            switch (data.StatType) {
                                case StatusType.Success: {
                                    for (let x = 0; x <= this.atParOrgGrpParametersLst.length - 1; x++) {
                                        this.atParOrgGrpParametersLst[x].OLD_PARAMETERVALUE = this.atParOrgGrpParametersLst[x].PARAMETER_VALUE;
                                        if (this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "CHECKBOX") {
                                            this.atParOrgGrpParametersLst[x].BLN_DISABLE = false;
                                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == "Y") {
                                                this.atParOrgGrpParametersLst[x].PARAMETER_VALUE = true;
                                            } else {
                                                this.atParOrgGrpParametersLst[x].PARAMETER_VALUE = false;
                                            }
                                            if (this.atParOrgGrpParametersLst[x].PARAMETER_ID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" ||
                                                this.atParOrgGrpParametersLst[x].PARAMETER_ID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
                                                // hdnParameterID.value = cbParam.ID;
                                                //cbParam.clientID
                                            }
                                            if (this.atParOrgGrpParametersLst[x].PARAMETER_ID == "PICK_ALLOC_STORAGE_LOC_REQ") {
                                                // cbParam.Attributes.Add("OnClick", "return setMultiPickChkBx(this);");
                                            }
                                            if (this.atParOrgGrpParametersLst[x].PARAMETER_ID == "VALIDATE_DEPT") {
                                                // hdnDeptParam.value = cbParam.ID;
                                            }
                                            if (this.atParOrgGrpParametersLst[x].PARAMETER_ID == "DEFAULT_LOC_AS_DEPT") {
                                                //cbParam.Attributes.Add("OnClick", "return setchkDept(this);");
                                            }

                                        }
                                        if (this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "RADIO") {
                                            if (this.atParOrgGrpParametersLst[x].PARAMETER_ID == "LOT_SERIAL_ENABLED" ||
                                                this.atParOrgGrpParametersLst[x].PARAMETER_ID == "PICK_ENABLE_LOT_SRL_TRACKING") {
                                                let paramVal = this.atParOrgGrpParametersLst[x].PARAMETER_VALUE;
                                                let filterItem = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS");
                                                let filterItem1 = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID == "SEND_LOT_SERIAL_INFO_TO_MMIS");
                                                if (paramVal == "MMIS") {
                                                    if (filterItem != null && filterItem.length > 0) {
                                                        if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                                            filterItem[0].PARAMETER_VALUE = true;
                                                            filterItem[0].BLN_DISABLE = true;
                                                        }
                                                    }
                                                    if (filterItem1 != null && filterItem1.length > 0) {
                                                        if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                                            filterItem1[0].PARAMETER_VALUE = true;
                                                            filterItem1[0].BLN_DISABLE = true;
                                                        }
                                                    }
                                                } else if (paramVal.toUpperCase() == "NONE") {

                                                    if (filterItem != null && filterItem.length > 0) {
                                                        if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                                            filterItem[0].BLN_DISABLE = false;
                                                        }
                                                    }
                                                    if (filterItem1 != null && filterItem1.length > 0) {
                                                        if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                                            filterItem1[0].PARAMETER_VALUE = false;
                                                            filterItem1[0].BLN_DISABLE = true;
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (filterItem != null && filterItem.length > 0) {
                                                        filterItem[0].BLN_DISABLE = false;
                                                    }
                                                    if (filterItem1 != null && filterItem1.length > 0) {
                                                        filterItem1[0].BLN_DISABLE = false;
                                                    }
                                                }
                                            }
                                        }

                                        if (this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXT" ||
                                            this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXTBOX") {
                                            let txtParams = "";
                                            txtParams = this.atParOrgGrpParametersLst[x].PARAMETER_ID;
                                            switch (this.atParOrgGrpParametersLst[x].PARAMETER_ID) {
                                                case "REASON_CODE":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=10";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Max=10";
                                                        }
                                                        break;
                                                    }
                                                case "ADJ_REASON_CODE":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=10";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Max=10";
                                                        }
                                                        break;
                                                    }
                                                case "PS_USER":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=10" + "," + "Mandatory";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Max=10" + "," + "Mandatory";
                                                        }
                                                        break;
                                                    }
                                                case "MAX_NO_OF_REC_DOWNLOAD":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=2" + "," + "Mandatory";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Max=2" + "," + "Mandatory";
                                                        }
                                                        break;
                                                    }
                                                case "FACTOR_OF_SAFETY":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=3";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Max=3";
                                                        }
                                                        break;
                                                    }
                                                case "DEFAULT_PRIORITY":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Mandatory";
                                                        }
                                                        break;
                                                    }
                                                case "RECALL_NOTIFICATION_EMAIL":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "EMAIL";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "EMAIL";
                                                        }

                                                        break;
                                                    }
                                                case "LIMIT_OF_LISTS":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Mandatory";
                                                        }
                                                        break;
                                                    }
                                                case "DEFAULT_LEAD_TIME":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory" + "," + "Max=3";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Mandatory" + "," + "Max=3";
                                                        }
                                                        break;
                                                    }
                                                case "DURATION_TRACKING_EXP":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory" + "," + "Max=3";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Mandatory" + "," + "Max=3";
                                                        }
                                                        break;
                                                    }
                                                case "PERCENTAGE_OPTIMUM_QTY":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory" + "," + "Max=3";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Mandatory" + "," + "Max=3";
                                                        }
                                                        break;
                                                    }
                                                case "NO_OF_REQUESTS_FOR_SAME_EQ_ITM":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory" + "," + "Max=4";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Mandatory" + "," + "Max=4";
                                                        }
                                                        break;
                                                    }

                                                case "BADGE_TRACK_INFO":
                                                    {
                                                        if (this.atParOrgGrpParametersLst[x].VALIDATION != null && this.atParOrgGrpParametersLst[x].VALIDATION != "") {
                                                            this.atParOrgGrpParametersLst[x].validationRules = this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory";
                                                        } else {
                                                            this.atParOrgGrpParametersLst[x].validationRules = "Mandatory";
                                                        }
                                                        break;
                                                    }
                                            }

                                            //For Text Area
                                            if ((this.atParOrgGrpParametersLst[x].PARAMETER_ID == "CUSTOM_SQL_DESTLOCATION")) {
                                                this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                            }
                                            if ((this.atParOrgGrpParametersLst[x].PARAMETER_ID == "CUSTOM_SQL_DEPT")) {
                                                this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                            }

                                        }
                                    }
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.statusMsgs = [];
                                    this.divOrgParamsData = false;
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case StatusType.Error: {
                                    this.statusMsgs = [];
                                    this.divOrgParamsData = false;
                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.statusMsgs = [];
                                    this.divOrgParamsData = false;
                                    this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                        });
                    this.spnrService.stop();
                }
            }

        } catch (ex) {
            this.divOrgParamsData = false;
            this.clientErrorMsg(ex, "app_selectChanged");
        }
    }

    async assignParameterChkBoxChanged(parameterLst, event) {
        try {
            if (event != null && event != undefined) {
                parameterLst.PARAMETER_VALUE = event;
                let val = parameterLst.PARAMETER_VALUE;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "assignParameterChkBoxChanged");
        }
    }

    assignParameterDropDownChanged(parameterLst, event) {
        try {
            if (event != null && event != undefined) {
                parameterLst.PARAMETER_VALUE = event;
                let val = parameterLst.PARAMETER_VALUE;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "assignParameterDropDownChanged");
        }
    }

    assignParameterRdbtnChanged(parameterLst, event) {
        try {
            if (event != null && event != undefined) {
                parameterLst.PARAMETER_VALUE = event;
                if (parameterLst.PARAMETER_ID == "LOT_SERIAL_ENABLED" ||
                    parameterLst.PARAMETER_ID == "PICK_ENABLE_LOT_SRL_TRACKING") {
                    let paramVal = parameterLst.PARAMETER_VALUE;
                    let filterItem = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS");
                    let filterItem1 = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID == "SEND_LOT_SERIAL_INFO_TO_MMIS");
                    if (paramVal == "MMIS") {
                        if (filterItem != null && filterItem.length > 0) {
                            if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem[0].PARAMETER_VALUE = true;
                                filterItem[0].BLN_DISABLE = true;
                            }
                        }
                        if (filterItem1 != null && filterItem1.length > 0) {
                            if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem1[0].PARAMETER_VALUE = true;
                                filterItem1[0].BLN_DISABLE = true;
                            }
                        }
                    } else if (paramVal.toUpperCase() == "NONE") {

                        if (filterItem != null && filterItem.length > 0) {
                            if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem[0].PARAMETER_VALUE = false;
                                filterItem[0].BLN_DISABLE = true;
                            }
                        }
                        if (filterItem1 != null && filterItem1.length > 0) {
                            if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem1[0].PARAMETER_VALUE = false;
                                filterItem1[0].BLN_DISABLE = true;
                            }
                        }
                    }
                    else {
                        if (filterItem != null && filterItem.length > 0) {
                            filterItem[0].BLN_DISABLE = false;
                        }
                        if (filterItem1 != null && filterItem1.length > 0) {
                            filterItem1[0].BLN_DISABLE = false;
                        }
                    }
                }



            }
        } catch (ex) {
            this.clientErrorMsg(ex, "assignParameterRdbtnChanged");
        }
    }

    async btnSaveParams_Click() {
        try {
            this.statusMsgs = [];
            let blnCheckValueAsNone: boolean = false;
            let blnCheckRadioValue: boolean = false;
            let boolAudit: boolean = false;
            let blnChkCustSQLDept: boolean = false;
            let blnChkBillingSystem: boolean = false;

            let strParamID: string = "";
            let strNewParamValue: any = "";
            let strOldParamValue: string = "";

            this.assignParamLst = new Array<MT_ATPAR_ORG_GROUP_PARAMETERS>();
            this.auditSecurityLst = new Array<MT_ATPAR_SECURITY_AUDIT>();

            ////For Disabling the checkbox
            // ScriptManager1.RegisterClientScriptBlock(this, this.GetType, "ReturnScript", "DisableCheckBox('" + ddlApps.SelectedItem.Text + "');", true);

            if (this.strAppId == "15") {
                blnChkBillingSystem = this.checkBillingInformation();
            }

            for (var i = 0; i <= this.atParOrgGrpParametersLst.length - 1; i++) {
                this.assignParamEntity = new MT_ATPAR_ORG_GROUP_PARAMETERS();
                if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "RADIO") {
                    strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
                    this.assignParamEntity.PARAMETER_ID = strParamID;
                    if (strParamID == "PICK_ENABLE_LOT_SRL_TRACKING" || strParamID == "LOT_SERIAL_ENABLED") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == Enable_Lot_Serial_Tracking.MMIS.toString()) {
                            blnCheckRadioValue = true;
                        } else if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == Enable_Lot_Serial_Tracking.None.toString()) {
                            blnCheckValueAsNone = true;
                        } else {
                            blnCheckRadioValue = false;
                            blnCheckValueAsNone = false;
                        }
                    }
                }

                if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "CHECKBOX") {
                    let strOldChkValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
                    strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
                    this.assignParamEntity.PARAMETER_ID = strParamID;
                    if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true") {
                        this.assignParamEntity.PARAMETER_VALUE = "Y";
                        if (strOldChkValue != "Y") {
                            boolAudit = true;
                            this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                            this.auditSecurity.OLD_VALUE = "N";
                            this.auditSecurity.NEW_VALUE = "Y";
                            this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                            this.auditSecurity.KEY_1 = this.strOrgGrpID;
                            this.auditSecurity.KEY_2 = this.strAppId;
                            this.auditSecurity.KEY_3 = strParamID;
                            this.auditSecurity.KEY_4 = "";
                            this.auditSecurity.KEY_5 = "";
                            this.auditSecurityLst.push(this.auditSecurity);
                        }
                    } else {
                        this.assignParamEntity.PARAMETER_VALUE = "N";
                        if (strOldChkValue != "N") {
                            boolAudit = true;
                            this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                            this.auditSecurity.OLD_VALUE = "Y";
                            this.auditSecurity.NEW_VALUE = "N";
                            this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                            this.auditSecurity.KEY_1 = this.strOrgGrpID;
                            this.auditSecurity.KEY_2 = this.strAppId;
                            this.auditSecurity.KEY_3 = strParamID;
                            this.auditSecurity.KEY_4 = "";
                            this.auditSecurity.KEY_5 = "";
                            this.auditSecurityLst.push(this.auditSecurity);
                        }
                    }

                    if (blnCheckRadioValue) {
                        if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" || strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
                            this.assignParamEntity.PARAMETER_VALUE = "Y";
                        }
                    } else if (blnCheckValueAsNone) {
                        if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" || strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
                            this.assignParamEntity.PARAMETER_VALUE = "N";
                        }
                    }
                    if (strParamID == "VALIDATE_DEPT") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true") {
                            if (blnChkCustSQLDept) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please provide Custom SQL for Syncing Valid Departments." });
                                return;
                            }
                        }
                    }
                }

                if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTBOX" ||
                    this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTAREA") {
                    strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
                    strNewParamValue = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE;
                    let numaric_regex = "numeric";// "/^[0-9]+$/";
                    if (this.atParOrgGrpParametersLst[i].VALIDATION == YesNo_Enum[YesNo_Enum.Y].toString() &&
                        (this.atParOrgGrpParametersLst[i].PARAMETER_ID == "BADGE_TRACK_INFO")) {

                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE != "") {

                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Track Numbers - Please enter a positive numeric value." });
                                return;
                            }
                            if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() > 3 ||
                                this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() < 1) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "The valid Track Numbers used for reading info from Badge are 1,2,3" });
                                return;
                            }
                        } else {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Track Numbers - Please enter valid Swipe Card Track Number" });
                            return;
                        }
                    }

                    strOldParamValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();

                    this.assignParamEntity.PARAMETER_ID = strParamID;
                    this.assignParamEntity.PARAMETER_VALUE = strNewParamValue;

                    //RT 4353
                    if (strParamID == "CUSTOM_SQL_DESTLOCATION") {
                        this.assignParamEntity.PARAMETER_VALUE = strNewParamValue.replace("'", "''");
                    }

                    if (strParamID == "CUSTOM_VIEW_ERPUSER") {
                        this.assignParamEntity.PARAMETER_VALUE = strNewParamValue.replace("'", "''");
                    }

                    if (strParamID == "CUSTOM_SQL_DEPT") {
                        this.assignParamEntity.PARAMETER_VALUE = strNewParamValue.replace("'", "''");
                    }

                    if (strParamID == "DEFAULT_DURATION") {

                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Duration in days - Please enter a positive numeric value." });
                            return;
                        } else if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString().length > 2) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Duration in days - Number of digits cannot be more than 2" });
                            return;
                        }
                    }

                    if (strParamID == "DURATION_TRACKING_EXP") {
                        if (!regExpValidator(numaric_regex, strNewParamValue) || strNewParamValue == "" || strNewParamValue == null) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Duration Tracking Expiration in days - Please enter a positive numeric value." });
                            return;
                        } else if (strNewParamValue.toString().length > 3) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Duration Tracking Expiration in days - Number of digits cannot be more than 3" });
                            return;
                        }
                    }

                    if (strParamID == "FACTOR_OF_SAFETY") {
                        if (strNewParamValue != "") {
                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Factor of safety for recommended par - Please enter a positive numeric value." });
                                return;
                            } else if (strNewParamValue.toString().length > 3) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Factor of safety for recommended par - Number of digits cannot be more than 3" });
                                return;
                            }
                        }
                    }
                    if (strParamID == "RECORDS_PER_PAGE") {
                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of records per page - Please enter a positive numeric value." });
                            return;
                        } else if (strNewParamValue.toString().length > 4) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of records per page - Number of digits cannot be more than 4" });
                            return;
                        }
                    }

                    if (strParamID == "DEFAULT_DATE_RANGE") {
                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Date Range - Please enter a positive numeric value." });
                            return;
                        } else if (strNewParamValue.toString().length > 2) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Date Range - Number of digits cannot be more than 3" });
                            return;
                        }
                    }
                    if (strParamID == "MAX_NO_OF_REC_DOWNLOAD") {
                        if (!regExpValidator(numaric_regex, strNewParamValue) || strNewParamValue == "" || strNewParamValue == null) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Please enter a positive numeric value." });
                            return;
                        } else if (strNewParamValue.toString().length > 2) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Number of digits cannot be more than 2" });
                            return;
                        }
                        //NB-0003466
                        if (!(strNewParamValue.toString().length > 0)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Should not be less than 1." });
                            return;
                        }
                    }
                    if (strParamID == "PS_USER") {
                        let alphaNumaric_RegEx = "alpha_numeric_underscore_hyphen_notspace"; //= "/^[a- zA-Z0-9_-]+$/";
                        if (strNewParamValue.toString() == "" || strNewParamValue == null) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "User ID - Please enter characters or numbers or _." });
                            return;
                        } else if (!regExpValidator(alphaNumaric_RegEx, strNewParamValue)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "User ID - Please enter characters or numbers or _." });
                            return;
                        } else if (strNewParamValue.toString().length > 10) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "User ID - Number of characters cannot be more than 10" });
                            return;
                        }
                    }
                    if (strParamID == "DEFAULT_PRIORITY") {
                        if (!regExpValidator(numaric_regex, strNewParamValue) || strNewParamValue == "" || strNewParamValue == null) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Location Priority - Please enter a positive numeric value." });
                            return;
                        } else if (strNewParamValue.toString().length > 2) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Location Priority - Number of digits cannot be more than 2" });
                            return;
                        }
                    }
                    if (strParamID == "LIMIT_OF_LISTS") {
                        if (!regExpValidator(numaric_regex, strNewParamValue) || strNewParamValue == "" || strNewParamValue == null) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Limit number of downloaded pick plans - Please enter a positive numeric value." });
                            return;
                        } else if (strNewParamValue.toString().length > 2) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Limit number of downloaded pick plans - Number of digits cannot be more than 2" });
                            return;
                        }
                    }

                    if (strParamID == "DEFAULT_BUSINESS_UNIT") {
                        let char_RegEx = "alpha_underscore_hyphen"; // = "/^[a-zA-Z_-]+$/";
                        if (strNewParamValue.toString() == "") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Please enter characters or numbers or _." });
                            return;
                        } else if (!regExpValidator(char_RegEx, strNewParamValue)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Please enter characters or numbers or _." });
                            return;
                        } else if (strNewParamValue.toString().length > 10) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Number of characters cannot be more than 10" });
                            return;
                        }
                    }
                    if (strParamID == "REQUESTOR_EMAIL_TABLE" && strNewParamValue.toString().length > 50) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Table/view name to read Email ID for Requester - Number of characters cannot be more than 50" });
                        return;
                    }
                    if (strParamID == "B_MAX_STOR") {
                        if (strNewParamValue.toString() != "") {
                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Box Items - Please enter a positive numeric value." });
                                return;
                            } else if (strNewParamValue.toString().length > 4) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Box Items - Number of digits cannot be more than 4" });
                                return;
                            }
                        }
                    }
                    if (strParamID == "E_MAX_STOR") {
                        if (strNewParamValue.toString() != "") {
                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Equipment Items - Please enter a positive numeric value." });
                                return;
                            } else if (strNewParamValue.toString().length > 4) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Equipment Items - Number of digits cannot be more than 4" });
                                return;
                            }
                        }
                    }
                    if (strParamID == "F_MAX_STOR") {
                        if (strNewParamValue.toString() != "") {
                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Furniture Items - Please enter a positive numeric value." });
                                return;
                            } else if (strNewParamValue.toString().length > 4) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Furniture Items - Number of digits cannot be more than 4" });
                                return;
                            }
                        }
                    }

                    if (strParamID == "NO_OF_REQUESTS_FOR_SAME_EQ_ITM") {
                        if (!regExpValidator(numaric_regex, strNewParamValue) || strNewParamValue == "" || strNewParamValue == null) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - Please enter a positive numeric value." });
                            return;
                        } else if (strNewParamValue.toString().length > 4) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - Number of digits cannot be more than 4" });
                            return;
                        } else if (strNewParamValue.toString().length == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - should not be less than 1" });
                            return;
                        }
                    }

                    if (strParamID == "EMAILID_FOR_ALERTS") {
                        if (strNewParamValue.toString().length > 50) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email Id for alerts - Number of characters cannot be more than 50" });
                            return;
                        }
                    }

                    if (strParamID == "FREQUENCY_EMAIL_ALERTS") {
                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency of Email Alerts - Please enter a positive numeric value." });
                            return;
                        } else if (strNewParamValue.toString().length > 10) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency of Email Alerts - Number of digits cannot be more than 10" });
                            return;
                        }
                    }

                    if (strParamID == "PERCENTAGE_OPTIMUM_QTY") {
                        if (!regExpValidator(numaric_regex, strNewParamValue) || strNewParamValue == "" || strNewParamValue == null) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Percentage of Optimum quantity - Please enter a positive numeric value." });
                            return;
                        } else if (strNewParamValue.toString().length > 3) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Percentage of Optimum quantity - Number of digits cannot be more than 3" });
                            return;
                        }
                    }
                    if (strParamID == "REFRESH_DATA_PERIOD") {
                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Time period for scheduled refresh of ERP data - Please enter a positive numeric value." });
                            return;
                        } else if (strNewParamValue.toString().length > 10) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Time period for scheduled refresh of ERP data - Number of digits cannot be more than 10" });
                            return;
                        }
                    }
                    if (strParamID == "SYNC_FREQUENCY") {
                        if (strNewParamValue.toString() != "") {
                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency for Syncing - Please enter a positive numeric value." });
                                return;
                            } else if (strNewParamValue.toString().length > 2) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency for Syncing - Max. allowable Frequency value is 99" });
                                return;
                            }
                        }
                    }
                    if (strParamID == "CUSTOM_SQL_DEPT") {
                        if (strNewParamValue.toString() == "") {
                            blnChkCustSQLDept = true;
                        }
                    }

                    if (strParamID == "CUSTOM_VIEW_ERPUSER") {
                        if (strNewParamValue.toString() == "") {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter Sql View for Employee details" });
                            return;
                        }
                    }

                    if (strParamID == "RECALL_NOTIFICATION_EMAIL") {
                        let configData = 0;
                        let recallParameter = false;
                        //Check Once
                        //configData = AtparServiceObj.getCheckRecall(_deviceTokenEntry, RecallParameter);

                        await this.commonService.getCheckRecall().
                            catch(this.httpService.handleError).then((res: Response) => {
                                let data = res.json() as AtParWebApiResponse<boolean>;
                                //configData = res.json().DataList,
                                this.spnrService.stop();
                                switch (data.StatType) {
                                    case StatusType.Success: {
                                       
                                        if (recallParameter) {
                                            if (strNewParamValue.toString() == "") {
                                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email for Recall Notification is Mandatory when Recall Management is implemented" });
                                                return;
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

                        if (strNewParamValue.toString() != "") {
                            var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            let validate = (new RegExp(emailPattern)).test(strNewParamValue) ? true : false;
                            if (!validate) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Email ID in Email for Recall Notification Text box" });
                                return;
                            }
                        }
                    }

                    if (strParamID == "CATEGORY_CODE") {
                        if (strNewParamValue.toString() != "") {
                            let alphaNumaric_regex = "alpha_numeric_underscore_hyphen_notspace"; // = "/^[a-zA-Z0-9_-]+$/";
                            if (!regExpValidator(alphaNumaric_regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Category Code - Please enter characters or numbers or _." });
                                return;
                            } else if (strNewParamValue.toString().length > 50) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Category Code - Number of characters cannot be more than 50" });
                                return;
                            }
                        }
                    }

                    if (strParamID == "EXCLUDE_CHRG_CODE_ITEMS_BILING") {
                        let alphaNumaric_regex = "alpha_numeric_specialchar";// = "/^[a-zA-Z0-9,]*$/";
                        if (!regExpValidator(alphaNumaric_regex, strNewParamValue)) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Exclude Items for billing - Please enter characters or numbers" });
                            return;
                        }
                    }

                    if (strParamID == "ADT_BILLING_SEND_ADDRESS") {
                        if (blnChkBillingSystem == true) {
                            let Regex = "numeric_dot";
                            if (strNewParamValue.toString() == "") {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Send Address - Please enter numbers" });
                                return;
                            } else if (!regExpValidator(Regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Send Address - Please enter positive numbers" });
                                return;
                            }
                        }
                    }

                    if (strParamID == "ADT_BILLING_SEND_PORT") {
                        if (blnChkBillingSystem == true) {
                            if (strNewParamValue.toString() == "") {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Send Port - Please enter numbers" });
                                return;
                            } else if (!regExpValidator(numaric_regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Send Port - Please enter positive numbers" });
                                return;
                            }
                        }
                    }

                    if (strParamID == "ADT_RECEIVING_APPLICATION") {
                        let Regex = "alpha_numerics_nospace";
                        if (blnChkBillingSystem == true) {
                            if (strNewParamValue.toString() == "") {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receiving Application - Please enter characters or numbers" });
                                return;
                            } else if (!regExpValidator(Regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receiving Application - Please enter characters or numbers" });
                                return;
                            }
                        }
                    }

                    if (strParamID == "ADT_RECEIVING_FACILITY") {
                        let Regex = "alpha_numerics_nospace";
                        if (blnChkBillingSystem == true) {
                            if (strNewParamValue.toString() == "") {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receiving Facility - Please enter characters or numbers" });
                                return;
                            } else if (!regExpValidator(Regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receiving Facility - Please enter characters or numbers" });
                                return;
                            }
                        }
                    }

                    if (strParamID == "ADT_BILLING_THRESHOLD_VALUE") {
                        if (blnChkBillingSystem == true) {
                            if (strNewParamValue.toString() == "") {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Threshold value - Please enter numbers" });
                                return;
                            } else if (!regExpValidator(numaric_regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Threshold value - Please enter positive numbers" });
                                return;
                            }
                        }
                    }

                    if (strParamID == "EMAILID_FOR_LOWSTOCK_ALERTS") {
                        let Regex = "email_pattern";
                        if (strNewParamValue.toString() != "") {
                            if (!regExpValidator(Regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Email ID for Low Stock Alerts" });
                                return;
                            }
                        }
                    }

                    if (strParamID == "EMAILID_FOR_PRODUCT_EXP_ALERTS") {
                        let Regex = "email_pattern";
                        if (strNewParamValue.toString() != "") {
                            if (!regExpValidator(Regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Email ID for Product Expiration Alerts" });
                                return;
                            }
                        }
                    }
                    if (strParamID == "DEFAULT_LEAD_TIME") {
                        if (!regExpValidator(numaric_regex, strNewParamValue) || strNewParamValue == "" || strNewParamValue == null) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default lead time in days - Please enter a positive numeric value." });
                            return;
                        } else if (strNewParamValue.toString().length > 3) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default lead time in days  - Number of digits cannot be more than 3." });
                            return;
                        }
                    }
                    if (strParamID == "COUNT_QTY_THRESHOLD") {
                        if (strNewParamValue.toString() != "") {
                            let Regex = "numerics_doubleprecision";
                            if (!regExpValidator(Regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Please enter a positive numeric value." });
                                return;
                            } else if (parseInt(strNewParamValue) > 99999999999.99) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Max. allowable count quantity value is 99999999999.99" });
                                return;
                            } else if (parseInt(strNewParamValue) <= 0) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Can not be zero" });
                                return;
                            }
                        } else if (strNewParamValue.toString().length == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Please enter Numeric Value" });
                            return;
                        }
                    }
                    if (strParamID == "COUNT_DLR_VALUE_THRESHOLD") {
                        if (strNewParamValue.toString() != "") {
                            let Regex = "numerics_doubleprecision";
                            if (!regExpValidator(Regex, strNewParamValue)) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Please enter a positive numeric value." });
                                return;
                            } else if (parseInt(strNewParamValue.toString()) > 99999999999.99) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Max. allowable $ value is 99999999999.99" });
                                return;
                            } else if (parseInt(strNewParamValue.toString()) <= 0) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Can not be zero" });
                                return;
                            }
                        } else if (strNewParamValue.toString().length == 0) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Please enter Numeric Value" });
                            return;
                        }
                    }
                    if (strOldParamValue != strNewParamValue) {
                        boolAudit = true;
                        this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                        this.auditSecurity.OLD_VALUE = strOldParamValue;
                        this.auditSecurity.NEW_VALUE = strNewParamValue;
                        this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                        this.auditSecurity.KEY_1 = this.strOrgGrpID;
                        this.auditSecurity.KEY_2 = this.strAppId;
                        this.auditSecurity.KEY_3 = strParamID;
                        this.auditSecurity.KEY_4 = "";
                        this.auditSecurity.KEY_5 = "";
                        this.auditSecurityLst.push(this.auditSecurity);
                    }
                }
                if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "RADIO") {
                    strNewParamValue = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString();
                    strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString()
                    strOldParamValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
                    this.assignParamEntity.PARAMETER_ID = strParamID;
                    this.assignParamEntity.PARAMETER_VALUE = strNewParamValue;
                    if (strOldParamValue != strNewParamValue) {
                        boolAudit = true;
                        this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                        this.auditSecurity.OLD_VALUE = strOldParamValue;
                        this.auditSecurity.NEW_VALUE = strNewParamValue;
                        this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                        this.auditSecurity.KEY_1 = this.strOrgGrpID;
                        this.auditSecurity.KEY_2 = this.strAppId;
                        this.auditSecurity.KEY_3 = strParamID;
                        this.auditSecurity.KEY_4 = "";
                        this.auditSecurity.KEY_5 = "";
                        this.auditSecurityLst.push(this.auditSecurity);
                    }
                }
                this.assignParamLst.push(this.assignParamEntity);
            }
            this.spnrService.start();
            await this.commonService.saveAppParameters(this.assignParamLst, this.strOrgGrpID, this.strAppId, this.strUserID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_PARAMETERS>;
                    this.spnrService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            for (let x = 0; x < this.assignParamLst.length; x++) {
                                this.atParOrgGrpParametersLst[x].OLD_PARAMETERVALUE = this.assignParamLst[x].PARAMETER_VALUE;
                            }
                            this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Organization group Parameters Updated Successfully" });
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });

            this.spnrService.stop();

            if (boolAudit == true && this.strAudit == "Y") {

                let strScreenName = "mt_atpar_manage_org_groups.aspx";
                //strFieldName = "ORG_GROUP_ID";                  
                this.spnrService.start();
                await this.commonService.insertAuditData(this.auditSecurityLst, this.strUserID, strScreenName).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;
                        this.spnrService.stop();
                        switch (response.StatType) {
                            case StatusType.Success: {

                                break;
                            }
                            case StatusType.Warn: {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                break;
                            }
                        }
                    });
                this.spnrService.stop();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnSaveParams_Click");
        }
    }

    checkBillingInformation() {
        try {
            let parmId: string = "";
            for (var i = 0; i <= this.atParOrgGrpParametersLst.length - 1; i++) {

                if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTBOX") {
                    parmId = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
                    if (parmId == "ADT_BILLING_SEND_ADDRESS") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() != "") {
                            return true;
                        }
                    }
                    if (parmId == "ADT_RECEIVING_APPLICATION") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() != "") {
                            return true;
                        }
                    }

                    if (parmId == "ADT_RECEIVING_FACILITY") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() != "") {
                            return true;
                        }
                    }
                    if (parmId == "ADT_BILLING_SEND_PORT") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() != "") {
                            return true;
                        }
                    }
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "checkBillingInformation");
        }
    }

    bindModelDataChange(event: any) {
        if ("txtOrgGrpId" == event.TextBoxID.toString()) {
            this.txtOrgGrpIdStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtOrgGrpName" == event.TextBoxID.toString()) {
            this.txtOrgGrpNameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if (!this.blnlblOrgGrpId) {
            if (this.txtOrgGrpIdStatus == 0 && this.txtOrgGrpNameStatus == 0) {
                this.buttonEnableDisable = false;
            }
            else {
                this.buttonEnableDisable = true;
            }
        }
        else {
            if (this.txtOrgGrpNameStatus == 0) {
                this.buttonEnableDisable = false;
            }
            else {
                this.buttonEnableDisable = true;
            }
        }
    }

    async editOrgGroupLst(editOrgGroupData: MT_ATPAR_ORG_GROUPS) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Org Group';
            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.statusMsgs = [];
            this.blnlblOrgGrpId = true;
            this.lblOrgGrpId = editOrgGroupData.ORG_GROUP_ID;
            this.txtOrgGrpName = editOrgGroupData.ORG_GROUP_NAME.replace(/\%20/g, ' ');
            this.strOldGrpName = editOrgGroupData.ORG_GROUP_NAME.replace(/\%20/g, ' ');
            this.menu = false;
            this.pop = true;
            this.orgGroupGrd = false;
            this.buttonEnableDisable = false;

        } catch (ex) {
            this.clientErrorMsg(ex, "editOrgGroupLst");
        }
    }
    async addValidations(atParOrgGrpParametersLst) {
        try {
            if (this.atParOrgGrpParametersLst == null) {
                return;
            }

            for (let x = 0; x <= this.atParOrgGrpParametersLst.length - 1; x++) {

                if (this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXTBOX" ||
                    this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXT" ||
                    this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXTAREA") {

                    if (this.atParOrgGrpParametersLst[x].VALIDATION == "NUMBER") {
                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                    }
                    if (this.atParOrgGrpParametersLst[x].VALIDATION == "EMAIL") {
                        this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                    }
                    switch (this.atParOrgGrpParametersLst[x].PARAMETER_ID) {
                        case "MAX_NO_OF_REC_DOWNLOAD":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                break;
                            }
                        case "FACTOR_OF_SAFETY":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                break;
                            }


                        case "RECALL_NOTIFICATION_EMAIL":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                                break;
                            }
                        case "RECORDS_PER_PAGE":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                break;
                            }
                        case "DEFAULT_DATE_RANGE": {
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "DEFAULT_LEAD_TIME": {
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "PS_USER": {
                            this.atParOrgGrpParametersLst[x].Title = "Please enter a characters or numbers or _-";
                            break;
                        }
                        case "DEFAULT_PRIORITY": {
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "BADGE_TRACK_INFO":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                break;
                            }
                        case "LIMIT_OF_LISTS": {
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "DEFAULT_BUSINESS_UNIT": {
                            this.atParOrgGrpParametersLst[x].Title = "Please enter a characters or numbers or _-";

                            break;
                        }
                        case "B_MAX_STOR": {
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "E_MAX_STOR": {
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "F_MAX_STOR": {
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "NO_OF_REQUESTS_FOR_SAME_EQ_ITM": {

                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "EMAILID_FOR_ALERTS": {
                            this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                            break;
                        }
                        case "FREQUENCY_EMAIL_ALERTS": {
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "PERCENTAGE_OPTIMUM_QTY": {
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "REFRESH_DATA_PERIOD": {
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "SYNC_FREQUENCY": {
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "EMAILID_FOR_LOWSTOCK_ALERTS": {

                            this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                            break;
                        }
                        case "EMAILID_FOR_PRODUCT_EXP_ALERTS":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                                break;
                            }

                        case "REQUESTOR_EMAIL_TABLE": {
                            this.atParOrgGrpParametersLst[x].Title = "Table/view name to read Email ID for Requestor - Number of characters cannot be more than 50";
                            break;
                        }


                        case "ADT_BILLING_SEND_ADDRESS":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                break;
                            }
                        case "ADT_BILLING_SEND_PORT":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                break;
                            }
                        case "ADT_BILLING_THRESHOLD_VALUE":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                break;
                            }
                        case "ADT_RECEIVING_APPLICATION":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Allow the Alphabets and Numbers";
                                break;
                            }
                        case "ADT_RECEIVING_FACILITY":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Allow the Alphabets and Numbers";
                                break;
                            }
                        case "COUNT_QTY_THRESHOLD":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Allows numerics,a double precision value";
                                break;
                            }
                        case "COUNT_DLR_VALUE_THRESHOLD":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Allows numerics,a double precision value";
                                break;
                            }
                        case "CUSTOM_SQL_DESTLOCATION":
                            {
                                this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                break;
                            }
                        case "CUSTOM_SQL_DEPT":
                            {
                                this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                break;
                            }

                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "addValidations");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spnrService, strExMsg.toString(), funName, this.constructor.name);
    }

    


    public customSort(event, field) {
        try {
            let checkedData: any
            let unCheckedData: any
            var element = event;
            if (this.sortCol == element.field) {
                this.blnsortbycolumn = !this.blnsortbycolumn;
            } else {
                this.blnsortbycolumn = true;
            }
            this.sortCol = element.field
            let result = null;
            let order: boolean;


            checkedData = [];
            unCheckedData = [];
              checkedData = asEnumerable(this.mngOrgGrpBunitsLst).Where(a => a.CHK_VALUE == 1).ToArray();
              unCheckedData = asEnumerable(this.mngOrgGrpBunitsLst).Where(a => a.CHK_VALUE == 0).ToArray();

              try {
                  this.sortedcheckedrec = checkedData.sort(function (a, b) {
                      if (a[element.field] == null && b[element.field] != null)
                          result = -1;
                      else if (a[element.field] != null && b[element.field] == null)
                          result = 1;
                      else if (a[element.field] == null && b[element.field] == null)
                          result = 0;
                      else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                          result = a[element.field].localeCompare(b[element.field]);
                      else
                          result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;

                      return (element.order * result);
                  });

                  this.sorteduncheckedrec = unCheckedData.sort(function (a, b) {
                      if (a[element.field] == null && b[element.field] != null)
                          result = -1;
                      else if (a[element.field] != null && b[element.field] == null)
                          result = 1;
                      else if (a[element.field] == null && b[element.field] == null)
                          result = 0;
                      else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                          result = a[element.field].localeCompare(b[element.field]);
                      else
                          result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;

                      return (element.order * result);
                  });
              }
              catch (ex) {
                  this.clientErrorMsg(ex, "customSort");
              }

              this.mngOrgGrpBunitsLst = [];
              this.mngOrgGrpBunitsLst = checkedData.concat(unCheckedData);
              this.sortedcheckedrec = [];
              this.sorteduncheckedrec = [];

            
        } catch (exMsg) {
            this.clientErrorMsg(exMsg, "onSort");
        }
        }
 
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.mngOrgGrpBunitsLst = null;
        this.orgGroupLst = null;
        this.orgGrpIdSearchLst = null;
        this.orgGroNameSearchLst = null;
        this.orgGroupBunitsLst = null;
        this.atParAppsLst = null;
        this.atParOrgGrpParametersLst = null;
        this.assignParamLst = null;
        this.assignParamEntity = null;
        this.mngOrgGrpBunitsLst = null;
        this.auditSecurityLst = null;
        this.ddlApps = null;
        this.recordsPerPageSize = null;
        this.strUserID = null;
        this.pProfile = null;
        this.orgGroupId = null;
        this.selectedorgGrpId = null;
        this.selectedorgGrpName = null;
        this.strOrgGrpID = null;
        this.strAudit = null;
        this.orgGroupName = null;
        this.strAppId = null;
        this.divOrgParamsData = null;
        this.intAppId = null;
        this.statusCode = null;
        this.statusType = null;
        this.strAppId = null;
        this.txtOrgGrpIdStatus = null;
        this.txtOrgGrpNameStatus = null;
        this.grdMngOrgGrpBunits = null;
        this.btnMngOrgGrpButton = null;
    }
}

