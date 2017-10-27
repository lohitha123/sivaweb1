import { Component } from '@angular/core';
import { MT_DELV_EXCLUDE_LOC } from '../../app/Entities/MT_DELV_EXCLUDE_LOC';
import { ExcludeLocationsService } from '../../app/Deliver/deliver-exclude-locations.services';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from "@angular/http";
import { TokenEntry_Enum, ClientType, StatusType, BusinessType } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { SelectItem, Message } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { ConfirmationService } from '../components/common/api';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'deliver-exclude-locations.component.html',
    providers: [ExcludeLocationsService, HttpService, AtParCommonService, AtParConstants, ConfirmationService]
})

export class ExcludeLocationsComponent {
    appID: number = 10;
    lstBUnits: any[];
    lstDBData: MT_DELV_EXCLUDE_LOC[];
    lstgridfilterData: MT_DELV_EXCLUDE_LOC[];
    deviceTokenEntry: string[] = [];
    lstCheckedLocations: Array<MT_DELV_EXCLUDE_LOC>;
    selectedSetID: string = "";
    dataCheckedSorting: MT_DELV_EXCLUDE_LOC[] = [];
    dataUncheckedSorting: Array<MT_DELV_EXCLUDE_LOC>;
    sortedcheckedrec: MT_DELV_EXCLUDE_LOC[];
    sorteduncheckedrec: MT_DELV_EXCLUDE_LOC[];
    startIndex: number;
    EndIndex: number;
    selectedLocation: string = "";
    isVisible: boolean = false;
    growlMessage: Message[] = [];
    lstLocations: any = [];
    lstFilteredLocation: any;
    blnsortbycolumn: boolean = true;
    custom: string = "custom";
    pazeSize: number;

    public constructor(
        private excludeLocationsService: ExcludeLocationsService,
        private spinnerService: SpinnerService,
        public atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private confirmationService: ConfirmationService
    ) {

    }

    ngOnInit(): void {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            this.lstCheckedLocations = new Array<MT_DELV_EXCLUDE_LOC>();
            this.dataCheckedSorting = new Array<MT_DELV_EXCLUDE_LOC>();
            this.dataUncheckedSorting = new Array<MT_DELV_EXCLUDE_LOC>();
            this.lstFilteredLocation = new Array<MT_DELV_EXCLUDE_LOC>();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    selectedRow(values: any, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }
            for (var i = 0; i < this.lstCheckedLocations.length; i++) {
                if (this.lstCheckedLocations[i].SETID === values.SETID) {
                    var index = this.lstCheckedLocations.indexOf(this.lstCheckedLocations[i], 0)
                    this.lstCheckedLocations.splice(index, 1);
                }
            }
            this.lstCheckedLocations.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    }

    checkAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstCheckedLocations.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstCheckedLocations.push(this.lstDBData[i]);
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
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstCheckedLocations.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstCheckedLocations.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    BindDataGrid() {
        try {
            var lstDBDataList;
            this.growlMessage = [];
            this.dataCheckedSorting = [];
            this.dataUncheckedSorting = [];

            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                    this.dataCheckedSorting.push(this.lstDBData[i]);
                }
                else {
                    this.dataUncheckedSorting.push(this.lstDBData[i]);
                }
            }

            if (this.lstDBData != null && this.lstDBData.length > 0) {
                this.isVisible = true;
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
            }
            this.spinnerService.stop();
            this.lstCheckedLocations = new Array<MT_DELV_EXCLUDE_LOC>();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    }

    filterdata(event) {
        try {
            this.lstgridfilterData = [];
            this.lstgridfilterData = new Array<MT_DELV_EXCLUDE_LOC>();
            this.lstgridfilterData = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterdata");
        }
    }

    customSort(event) {
        try {
            var element = event;
            this.lstDBData = [];
            this.blnsortbycolumn = !this.blnsortbycolumn;

            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];

            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });

            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });

            if (this.blnsortbycolumn == false) {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
            }
            else {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
            this.lstCheckedLocations = new Array<MT_DELV_EXCLUDE_LOC>();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    }

    async getAllLocations() {
        this.isVisible = false;
        this.lstgridfilterData = null;
        this.growlMessage = [];
        try {
            this.lstDBData = new Array<MT_DELV_EXCLUDE_LOC>();
            this.spinnerService.start();
            await this.excludeLocationsService.getAllLocations(this.selectedSetID, this.selectedLocation, this.deviceTokenEntry)
                .forEach((response) => {
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.lstDBData = [];
                            this.lstDBData = response.DataList;
                            this.lstLocations = [];
                            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                this.lstLocations.push(this.lstDBData[i].SETID);
                                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                                    this.lstDBData[i].checkvalue = true;
                                }
                                else {
                                    this.lstDBData[i].checkvalue = false;
                                }
                            }
                            this.BindDataGrid();
                            break;
                        }
                        case StatusType.Warn: {
                            this.isVisible = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.isVisible = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.isVisible = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getAllLocations");
        }
    }

    async excludeLocatons() {
        try {
            this.spinnerService.start();
            this.excludeLocationsService.excludeLocs(this.lstCheckedLocations, this.deviceTokenEntry)
                .subscribe((response) => {
                    this.growlMessage = [];
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            this.selectedLocation = "";
                            this.selectedSetID = "";
                            this.lstCheckedLocations = new Array<MT_DELV_EXCLUDE_LOC>();
                            this.isVisible = false;
                            this.spinnerService.stop();
                            this.lstDBData = [];
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            this.isVisible = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            this.isVisible = false;
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "excludeLocatons");
        }
    }

    confirm() {
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure Do you want to Submit the Changes ?',
                accept: () => {
                    this.excludeLocatons();
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirm");
        }
    }

    async fillLocationsAuto(event) {
        this.lstFilteredLocation = [];
        let query = event.query;
        this.lstFilteredLocation = this.filteredLoations(query, this.lstLocations)
    }

    filteredLoations(query, deslocatiions: any[]): any[] {
        try {
            let filtered : any[] = [];
            if (query == "%") {
                for (let i = 0; i < deslocatiions.length; i++) {
                    let desLocValue = deslocatiions[i];
                    filtered.push(desLocValue);
                }
            } else {
                if (query.length >= 1) {
                    for (let i = 0; i < deslocatiions.length; i++) {
                        let desLocValue = deslocatiions[i];
                        if (desLocValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(desLocValue);
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filteredLoations");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstBUnits = null;
        this.lstFilteredLocation = null;
        this.lstCheckedLocations = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.appID = -1;
        this.selectedLocation = null;
    }
} 
