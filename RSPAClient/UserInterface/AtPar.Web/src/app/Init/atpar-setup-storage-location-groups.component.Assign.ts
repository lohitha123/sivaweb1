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
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}
@Component({


    templateUrl: 'atpar-setup-storage-location-groups.component.Assign.html',
    providers: [setupStorageLocationGroupServices, AtParConstants, AtParCommonService]
})

export class SetupStorageLocationAssign {

    lstDBData: MT_ATPAR_ZONE_STORAGE_LEVELS[];
    lstDBMainDetails: MT_ATPAR_ZONE_STORAGE_LEVELS[];
    public newItem: any = new MT_ATPAR_STORAGE_ZONE();
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    startIndex: number;
    EndIndex: number;
    growlMessage: Message[] = [];
    lstFilteredBUnits: any = [];
    lstBUnits: any = [];
    orgGrpId: string;
    showGrid: boolean = false;
    selectedBunit: string = "";
    selectedArea: string = "";
    lstCheckedData: Array<MT_ATPAR_ZONE_STORAGE_LEVELS>;
    lstUnCheckedData: Array<MT_ATPAR_ZONE_STORAGE_LEVELS>;
    sortedcheckedrec: MT_ATPAR_ZONE_STORAGE_LEVELS[];
    sorteduncheckedrec: MT_ATPAR_ZONE_STORAGE_LEVELS[];
    blnsortbycolumn: boolean = true;
    preField: string = "";
    lstgridfilterData: MT_ATPAR_ZONE_STORAGE_LEVELS[];
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
        this.newItem = this.atParSharedDataService.storage.zoneRowData;
        this.orgGrpId = this.newItem.ORG_GROUP_ID;
        this.GetOrgName();
        this.GetBusinessUnits();

    }

    async GetOrgName() {
        try {
            this.spinnerService.start();
            await this.commonService.getOrgGrpName(this.newItem.ORG_GROUP_ID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.newItem.ORG_GROUP_ID = this.newItem.ORG_GROUP_ID + " " + "-" + " " + data.Data;
                            this.spinnerService.stop();
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
            this.clientErrorMsg(ex, "GetOrgName");
        }
    }
    async GetBusinessUnits() {

        try {

            this.spinnerService.start();
            await this.commonService.getOrgBusinessUnits(this.orgGrpId, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstFilteredBUnits = data.DataList;
                            this.spinnerService.stop();

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
            this.clientErrorMsg(ex, "GetBusinessUnits");
        }
    }


    async fillBUnitsAuto(event) {

        this.lstFilteredBUnits = [];
        let query = event.query;
        try {

            await this.commonService.getOrgBusinessUnits(this.orgGrpId, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstBUnits = data.DataList;
                            this.lstFilteredBUnits = this.filterBusinessUnits(query, this.lstBUnits)

                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "fillBUnitsAuto");
        }
    }

    filterBusinessUnits(query, businessunits: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < businessunits.length; i++) {
                let Bunitvalue = businessunits[i];
                filtered.push(Bunitvalue);
            }

        } else {
            if (query.length >= 0) {
                for (let i = 0; i < businessunits.length; i++) {
                    let Bunitvalue = businessunits[i];
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }
        return filtered;
    }

    async GetZoneStorageLevelDetails() {
        this.spinnerService.start();
        if (this.selectedBunit == "") {
            this.showGrid = false;
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Org ID" });
            this.spinnerService.stop();
            return false;
        }

        try {
            this.lstDBMainDetails = [];

            await this.storageLocationService.GetZoneStorageLevelDetails(this.orgGrpId, this.newItem.STORAGE_ZONE_ID, this.selectedBunit, this.selectedArea, this.deviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ZONE_STORAGE_LEVELS>;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showGrid = true;
                            this.lstDBData = data.DataList;
                            this.lstCheckedData = [];
                            this.lstUnCheckedData = [];
                            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                this.lstDBData[i].SNo = i + 1;
                                if (this.lstDBData[i].CHK_VALUE == 1) {
                                    this.lstCheckedData.push(this.lstDBData[i]);
                                    this.lstDBData[i].checkvalue = true;
                                }
                                else {
                                    this.lstDBData[i].checkvalue = false;
                                    this.lstUnCheckedData.push(this.lstDBData[i]);
                                }


                            }
                            for (let k = 0; k < this.lstDBData.length; k++) {
                                this.lstDBMainDetails.push(this.lstDBData[k]);
                            }

                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "GetZoneStorageLevelDetails");
        }

    }

    selectedRow(selectedRowData: MT_ATPAR_ZONE_STORAGE_LEVELS, event) {
        if (event == true) {
            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (selectedRowData.SNo == this.lstDBData[i].SNo) {
                    this.lstDBData[i].CHK_VALUE = 1;
                }
            }
        }
        else {
            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (selectedRowData.SNo == this.lstDBData[i].SNo) {
                    this.lstDBData[i].CHK_VALUE = 0;
                }
            }
        }
    }

    checkAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstDBData[i].checkvalue = true;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    unCheckAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;

                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstDBData[i].checkvalue = false;
                }
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    async InsertZoneStorageLevels() {
        for (let i = 0; i <= this.lstDBData.length - 1; i++) {
            if (this.lstDBData[i].CHK_VALUE == 1 && this.lstDBData[i].CHK_ALLOCATED == "0") {
                this.lstDBData[i].PERFORM_ACTION = 1;
            }
            else if (this.lstDBData[i].CHK_VALUE == 0 && this.lstDBData[i].CHK_ALLOCATED == "1") {
                this.lstDBData[i].PERFORM_ACTION = 2;
            }
            else {
                this.lstDBData[i].PERFORM_ACTION = 0;
            }
        }
        this.lstDBData = this.lstDBData.filter(x => x.PERFORM_ACTION > 0);
        try {
            await this.storageLocationService.InsertZoneStorageLevels(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGrpId, this.newItem.STORAGE_ZONE_ID, this.lstDBMainDetails).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ZONE_STORAGE_LEVELS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showGrid = false;
                            let statusMessage = AtParConstants.Updated_Msg.replace("1%", "Zone").replace("2%", this.newItem.STORAGE_ZONE_ID);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                            this.selectedBunit = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.selectedBunit = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.selectedBunit = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.selectedBunit = "";
                            this.spinnerService.stop();
                            break;
                        }
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "InsertZoneStorageLevels");
        }
    }
    customSort(event, field) {
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            } else {
                element.order = 1;
            }
            // element.order = !element.order;

        } else {
            element.order = 1;
        }
        this.preField = element.field;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        let result = null;
        let order: boolean;

        try {
            this.sortedcheckedrec = this.lstCheckedData.sort(function (a, b) {
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

            this.sorteduncheckedrec = this.lstUnCheckedData.sort(function (a, b) {
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

        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }
    filterdata(event) {
        this.lstgridfilterData = new Array<MT_ATPAR_ZONE_STORAGE_LEVELS>();
        console.log(event);
        this.lstgridfilterData = event;
    }

    navigateToStorageLocationsHome() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        let navigationExtras: NavigationExtras = {

            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    }
    clientErrorMsg(strExMsg, funname) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funname, this.constructor.name);
    }
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }
}