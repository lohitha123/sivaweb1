import {
    NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy,
    Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style,
    transition, animate
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from "@angular/http";
import { PAR_MNGT_COST_CENTER } from "../../app/Entities/PAR_MNGT_COST_CENTER";
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { AtParConstants } from "../Shared/AtParConstants";
import { setupStorageLocationGroupServices } from "../../app/Init/atpar-setup-storage-location-groups.component.service";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType, ModeEnum, StatusType } from '../Shared/AtParEnums';
import { SelectItem, Message } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { DataTable } from '../components/datatable/datatable';
import { MT_ATPAR_STORAGE_ZONE } from '../../app/Entities/MT_ATPAR_STORAGE_ZONE';
import { MT_ATPAR_ZONE_STORAGE_LEVELS } from '../../app/Entities/MT_ATPAR_ZONE_STORAGE_LEVELS';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { BusinessType } from '../Shared/AtParEnums';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'atpar-setup-storage-location-groups.component.addzone.html',
    providers: [setupStorageLocationGroupServices, AtParConstants, AtParCommonService]
})

export class SetupStorageLocationAddZoneComponent {

    lstDBData: MT_ATPAR_ZONE_STORAGE_LEVELS[];
    public newItem: any = new MT_ATPAR_STORAGE_ZONE();
    deviceTokenEntry: string[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    recordsPerPageSize: number;
    startIndex: number;
    lstOrgGroups: SelectItem[] = [];
    EndIndex: number;
    blnShowOrgGroupDD: boolean = false;
    growlMessage: Message[] = [];
    blnShowOrgGroupLabel: boolean = false;
    lstFilteredBUnits: any = [];
    lstBUnits: any = [];
    orgGrpId: string;
    showGrid: boolean = false;
    selectedBunit: string = "";
    selectedArea: string = "";
    selectedOrgGroupId: string = "";
    strOrgGrpId: string = "";
    selectedZone: string = "";
    selectedDescription: string = "";
    OrgGroupID: string = "";
    loading: boolean = true;
    ccstatus: number;
    descstatus: number;
    ddlOrgGpStatus: number;
    focus: boolean = false;
    breadCrumbMenu: Menus;
    public constructor(
        private httpService: HttpService,
        private router: Router,
        private spinnerService: SpinnerService,
        private route: ActivatedRoute,
        private atParConstant: AtParConstants,
        private commonService: AtParCommonService,
        private storageLocationService: setupStorageLocationGroupServices,
        private atParSharedDataService: AtParSharedDataService

    ) {
        this.breadCrumbMenu = new Menus();
    }

    ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.bindOrgGroups();
        this.focus = true;
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + " " + "-" + " " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.spinnerService.stop();
                                break;

                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.showGrid = false;
                                this.lstOrgGroups = [];
                                this.lstOrgGroups.push({ label: "Select One", value: "" });
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " " + "-" + " " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }

                });





        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    ddlOrgGpChange() {
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == "Select Org" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == null || this.selectedOrgGroupId == "") {
                this.ddlOrgGpStatus = 1;
            }
            else {
                this.ddlOrgGpStatus = 0;
            }
        }
        else if (this.blnShowOrgGroupLabel) {
            this.ddlOrgGpStatus = 0;
        }
        if (this.ccstatus == 0 && this.ddlOrgGpStatus == 0 && (this.selectedZone != "" && this.selectedZone != undefined && this.selectedZone != null)) {
            if (this.descstatus == 0 || this.descstatus == undefined) {
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

    bindModelDataChange(event: any) {
        //this.descstatus = null;
        try {
            if ("Zone" == event.TextBoxID.toString()) {
                this.ccstatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("Description" == event.TextBoxID.toString()) {
                this.descstatus = event.validationrules.filter(x => x.status == false).length;
            }
            this.ddlOrgGpChange();
            //validations satisfies r not 
            if (this.ccstatus == 0 && this.ddlOrgGpStatus == 0) {
                if (this.descstatus == 0 || this.descstatus == undefined) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            else {
                this.loading = true;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }

    }

    async createZones() {
        this.spinnerService.start();
        if (this.blnShowOrgGroupLabel == true) {
            this.OrgGroupID = this.orgGrpId.split("-")[0];
        }
        else {
            this.OrgGroupID = this.selectedOrgGroupId;
        }
        if (this.OrgGroupID == "" || this.OrgGroupID == "Select One") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Org Group ID" });
            this.spinnerService.stop();
            return false;
        }
        if (this.selectedZone == "" || this.selectedZone == undefined) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Zone" });
            this.spinnerService.stop();
            return false;
        }
        try {
            await this.storageLocationService.InsertStorageZoneGroups(this.selectedZone, this.selectedDescription, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.OrgGroupID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showGrid = true;
                            let statusMessage = AtParConstants.Created_Msg.replace("1%", "Zone").replace("2%", this.selectedZone);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                            this.focus = true;
                            if (this.blnShowOrgGroupDD) {
                                (<HTMLInputElement>document.getElementById("txtddllstOrgGroups")).focus();
                            }
                            else {
                                (<HTMLInputElement>document.getElementById("Zone")).focus();
                            }
                            this.selectedOrgGroupId = "";
                            this.selectedZone = "";
                            this.selectedDescription = "";
                            this.loading = true;
                            this.ccstatus = null;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            if (data.StatusMessage === "already Exists") {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Zone " + this.selectedZone + " for Org Group " + this.toTitleCase(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]) + " " + data.StatusMessage });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            document.getElementById("Zone").focus();
                            this.selectedOrgGroupId = "";
                            this.selectedZone = "";
                            this.selectedDescription = "";
                            this.loading = true;
                            this.ccstatus = null;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.selectedOrgGroupId = "";
                            this.selectedZone = "";
                            this.selectedDescription = "";
                            this.loading = true;
                            this.ccstatus = null;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.selectedOrgGroupId = "";
                            this.selectedZone = "";
                            this.selectedDescription = "";
                            this.loading = true;
                            this.ccstatus = null;
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "createZones");
        }
    }
    toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    navigateToStorageLocationsHome() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        let navigationExtras: NavigationExtras = {

            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    }
    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;

    }

}