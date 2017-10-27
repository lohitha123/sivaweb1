import { NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { AtParConstants } from "../Shared/AtParConstants";
import { SetupCostCentersServices } from "../../app/Init/atpar-setup-cost-centers.services";
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { PAR_MNGT_COST_CENTER } from "../../app/Entities/PAR_MNGT_COST_CENTER";
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { MT_POU_DEPT } from '../../app/Entities/MT_POU_DEPT';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenEntry_Enum, StatusType, ModeEnum } from '../Shared/AtParEnums'
import { Message, SelectItem } from './../components/common/api';
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { ATPAR_VALIDATION_RULES } from '../../app/entities/atpar_validation_rules';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}
@Component({

    templateUrl: 'atpar-setup-add-modify-costcenter.component.html',
    providers: [SetupCostCentersServices, AtParConstants]
})

export class SetupCostCentersCrud {
    ccstatus: number;
    descstatus: number;
    loading: boolean = true;

    public newItem: any = new PAR_MNGT_COST_CENTER();
    statusCode: number;
    _deviceTokenEntry: string[] = [];
    mode: string;
    orgGroupList: MT_ATPAR_ORG_GROUPS[];
    deptList: any[] = [];
    orgGroupId: string;
    orgGroupName: string;
    //loading = false;
    statusMesssage: string;
    bindSymbal: string;
    hasMultipleOrgGroups = false;
    orgGroupData: SelectItem[] = [];
    screenTitle: string;
    submitButtonTitle: string;
    filteredDepartments: any;
    isEditMode: boolean = false;
    department: any;
    msgs: Message[] = [];
    breadCrumbMenu: Menus;

    public constructor(
        private setupCostCentersServices: SetupCostCentersServices,
        private router: Router,
        private spinnerService: SpinnerService,
        private route: ActivatedRoute,
        private atParConstant: AtParConstants,
        private atParSharedDataService: AtParSharedDataService

    ) {
        this.breadCrumbMenu = new Menus();
    }

    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    navigateToCostCenterHome() {
        // Navigate to Cost Center Parent route

        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        let navigationExtras: NavigationExtras = {

            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    }

    ddlOrgGrpIdChanged($event) {
        this.btnEnableDisable();
    }

    /**
    * Enable and Disable Add/Update button 
    */
    btnEnableDisable() {

        if (this.ccstatus == 0 && this.newItem.COST_CENTER_CODE !== undefined && this.newItem.COST_CENTER_CODE !== "" && this.newItem.COST_CENTER_CODE !== null && (this.descstatus == 0 || this.descstatus == undefined) && this.newItem.ORG_ID !== -1 && ((this.newItem.ORG_ID !== "" && this.newItem.ORG_ID !== undefined) || (this.orgGroupId !== "" && this.orgGroupId !== undefined))) {
            this.loading = false;
        }
        else {
            this.loading = true;
        }
    }

    bindModelDataChange(event: any) {
        try {
            if ("costcentercode" == event.TextBoxID.toString()) {
                this.ccstatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("description" == event.TextBoxID.toString()) {
                this.descstatus = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.submitButtonTitle == "Update") {
                if (this.descstatus == undefined || this.descstatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }

            }

            if (this.submitButtonTitle == "Save") {
                this.btnEnableDisable();
            }

        } catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }

    }


    async ngOnInit() {
        try {
            this.newItem = new PAR_MNGT_COST_CENTER();
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.spinnerService.start();
            this.department = new MT_POU_DEPT();
            this.msgs = [];
            await this.setupCostCentersServices.getDepartments().forEach(async resp => {
                this.msgs = [];
                switch (resp.StatType) {
                    case StatusType.Success:
                        var deptobj: any = {};
                        for (let dept of resp.DataList) {
                            deptobj.DEPT_ID = dept.DEPT_ID;
                            deptobj.DEPT_NAME = dept.DEPT_NAME
                            deptobj.DEPARTMENT = dept.DEPARTMENT;
                            this.deptList.push(deptobj);
                            deptobj = {};
                        }
                        break;
                    case StatusType.Error:
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    case StatusType.Warn:
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                }
            });

            await this.setupCostCentersServices.getOrgGroupList(this._deviceTokenEntry[TokenEntry_Enum.UserID]).forEach(resp => {
                this.msgs = [];
                switch (resp.StatType) {
                    case StatusType.Success:
                        this.orgGroupList = resp.DataList;
                        this.statusCode = resp.StatusCode;
                        if (this.orgGroupList.length > 1) {
                            this.hasMultipleOrgGroups = true;
                            this.orgGroupData.push({ label: 'Select One', value: -1 })
                            for (let i = 0; i < this.orgGroupList.length; i++) {
                                if (this.orgGroupList[i].ORG_GROUP_ID != "All") {
                                    this.orgGroupData.push({ label: this.orgGroupList[i].ORG_GROUP_ID + ' - ' + this.orgGroupList[i].ORG_GROUP_NAME, value: this.orgGroupList[i].ORG_GROUP_ID })
                                }
                            }

                        } else {
                            this.orgGroupId = this.orgGroupList[0].ORG_GROUP_ID + ' - ' + this.orgGroupList[0].ORG_GROUP_NAME;
                            this.orgGroupName = this.orgGroupList[0].ORG_GROUP_NAME;
                            this.newItem.ORG_ID = this.orgGroupId;
                        }
                        break;
                    case StatusType.Error:
                        this.spinnerService.stop();
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    case StatusType.Warn:
                        this.msgs = [];
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                }

            });

            this.mode = this.atParSharedDataService.storage.mode;
            if (this.mode == (ModeEnum.Add).toString()) {
                this.screenTitle = "Setup Cost Center";
                this.isEditMode = false;
                this.submitButtonTitle = "Save";
                this.bindSymbal = "floppy-o";
                this.loading = true;
                this.newItem.UPDATE_USER_ID = this._deviceTokenEntry[TokenEntry_Enum.UserID];
                this.newItem.STATUS = false;
                this.department = new MT_POU_DEPT();
                this.department.DEPT_ID = '';

            }
            else if (this.mode == (ModeEnum.Edit).toString()) {
                this.screenTitle = "Setup Cost Center";
                this.submitButtonTitle = "Update";
                this.bindSymbal = "check";
                this.isEditMode = true;
                this.loading = false;
                this.newItem = this.atParSharedDataService.storage.costCenterData;

                if (this.orgGroupData != undefined && this.orgGroupData != null) {
                    for (let i = 0; i < this.orgGroupData.length; i++) {
                        if (this.orgGroupData[i].value != "ALL" && this.orgGroupData[i].value == this.newItem.ORG_ID) {
                            this.orgGroupId = this.orgGroupData[1].label;
                            break;
                        }
                    }
                }

                this.newItem.UPDATE_USER_ID = this._deviceTokenEntry[TokenEntry_Enum.UserID];
                this.department = new MT_POU_DEPT();
                this.department.DEPT_ID = this.newItem.DEPT_ID;
                this.department.DEPTNAME = this.newItem.DEPTNAME;

            }

            if (this.mode == (ModeEnum.Add).toString()) {
                if (this.hasMultipleOrgGroups == false) {
                    document.getElementById('costcentercode').focus();
                }
            }
            else if (this.mode == (ModeEnum.Edit).toString()) {
                if (this.hasMultipleOrgGroups == false || this.isEditMode == true) {
                    document.getElementById('description').focus();
                }
            }

            this.spinnerService.stop();
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    filterDepartment(event) {
        let query = event.query;
        this.filteredDepartments = this.filterByDepartment(query, this.deptList);

    }

    filterByDepartment(query, deptList: any[]): any[] {

        let filtered: any[] = [];
        if (query == "%") {
            for (let i = 0; i < deptList.length; i++) {
                let dept = deptList[i];
                filtered.push(dept.DEPARTMENT);
            }
        } else {
            for (let i = 0; i < deptList.length; i++) {
                let dept = deptList[i];
                if (dept.DEPT_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 || dept.DEPT_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(dept.DEPARTMENT);
                }
            }
        }

        return filtered;
    }

    isDepartmentExists(element, array): boolean {
        return array.some(x => x.DEPT_ID === element);

    }

    submitCostCenterData(): void {
        if (this.department.DEPT_ID != null && this.department.DEPT_ID != undefined && this.department.DEPT_ID != '') {
            if (!this.isDepartmentExists(this.department.DEPT_ID.split(' - ')[0], this.deptList)) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dept ID' });
                return;
            } else {
                this.msgs = [];
            }
        }
        try {
            if (this.mode == (ModeEnum.Add).toString()) {
                //creat              

                if (this.department.DEPT_ID != null) {
                    this.newItem.DEPT_ID = this.department.DEPT_ID.split(" - ")[0].trim();
                }
                else {

                }
                if (this.newItem.ORG_ID != null && this.newItem.ORG_ID != undefined && this.newItem.ORG_ID != -1) {
                    let orgId = this.newItem.ORG_ID;
                    if (!this.hasMultipleOrgGroups) {
                        let splitorgid = this.newItem.ORG_ID.split(" - ");
                        this.newItem.ORG_ID = splitorgid[0].trim();
                    }
                    this.setupCostCentersServices.createCostCenter(this.newItem).forEach(resp => {
                        this.msgs = [];
                        switch (resp.StatType) {
                            case StatusType.Success:

                                this.statusMesssage = AtParConstants.Created_Msg.replace("1%", "CostCenter").replace("2%", this.newItem.COST_CENTER_CODE);
                                this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                                this.newItem = new PAR_MNGT_COST_CENTER();
                                this.newItem.ORG_ID = orgId;

                                this.department = new MT_POU_DEPT();
                                this.department.DEPT_ID = this.newItem.DEPT_ID;
                                if (this.hasMultipleOrgGroups && !this.isEditMode) {
                                    document.getElementById('txtddlOrgGroup').focus();
                                }
                                else {
                                    document.getElementById('costcentercode').focus();
                                }
                                this.loading = true;
                                break;

                            case StatusType.Error:
                                this.statusMesssage = resp.StatusMessage;
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            case StatusType.Warn:
                                this.statusMesssage = resp.StatusMessage;
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                break;
                        }
                    });
                }
                else {
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "select Org Group ID" });
                }
            } else if (this.mode == (ModeEnum.Edit).toString()) {
                this.newItem.DEPT_ID = this.department.DEPT_ID;
                if (this.newItem.ORG_ID != "") {
                    this.setupCostCentersServices.updateCostCenter(this.newItem).forEach(resp => {
                        this.msgs = [];
                        switch (resp.StatType) {
                            case StatusType.Success:
                                //this.statusMesssage = "Cost Center Updated Successfully";
                                this.statusMesssage = AtParConstants.Updated_Msg.replace("1%", "CostCenter").replace("2%", this.newItem.COST_CENTER_CODE);
                                this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                                let ccCode = this.newItem.COST_CENTER_CODE;
                                let ccDesc = this.newItem.DESCRIPTION;
                                this.newItem = new PAR_MNGT_COST_CENTER();
                                this.newItem.COST_CENTER_CODE = ccCode;
                                this.newItem.DESCRIPTION = ccDesc;
                                if (this.hasMultipleOrgGroups && !this.isEditMode) {
                                    document.getElementById('txtddlOrgGroup').focus();
                                }
                                else {
                                    document.getElementById('description').focus();
                                }
                                break;
                            case StatusType.Error:
                                this.statusMesssage = resp.StatusMessage;
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            case StatusType.Warn:
                                this.statusMesssage = resp.StatusMessage;
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                break;
                        }
                    });
                }
                else {
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "select Org Group ID" });
                }
            } else {
                this.newItem = new PAR_MNGT_COST_CENTER();


            }
        } catch (ex) {
            this.clientErrorMsg(ex, "submitCostCenterData");
        }
    }

    ngOnDestroy() {
        this.statusCode = -1;
        this._deviceTokenEntry = null;
        this.mode = null;
        this.orgGroupList = null;
        this.deptList = null;
        this.orgGroupId = null;
        this.loading = null;
        this.statusMesssage = null;
        this.hasMultipleOrgGroups = null;
        this.orgGroupData = null;
        this.screenTitle = null;
        this.submitButtonTitle = null;
        this.filteredDepartments = null;
        this.isEditMode = null;
        this.newItem = null;
        this.msgs = [];
        // this.atParSharedDataService.storage = {};
    }

}
