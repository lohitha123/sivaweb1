import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { Http, Response } from "@angular/http";
import { HttpServiceUtility } from '../shared/atparhttputilityservice';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Message } from '../components/common/api';
import { StatusType } from '../Shared/AtParEnums';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { SelectItem } from '../components/common/api';
import { AtParConstants } from '../Shared/AtParConstants';
import { setupStorageLocationGroupServices } from "../../app/Init/atpar-setup-storage-location-groups.component.service";
import { MT_ATPAR_STORAGE_ZONE } from '../../app/Entities/MT_ATPAR_STORAGE_ZONE';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from '../components/common/api';
import { Menus } from '../AtPar/Menus/routepath';
import { ModeEnum } from '../Shared/AtParEnums'

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-setup-storage-location-groups.component.home.html',
    providers: [datatableservice, AtParCommonService, AtParConstants, setupStorageLocationGroupServices, ConfirmationService],
})

export class SetupStorageLocationGroupsHomeComponent {
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    startIndex: number;
    EndIndex: number;
    growlMessage: Message[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupLabel: boolean = false;
    orgGrpId: string = "";
    OrgGroupID: string = "";
    blnShowOrgGroupDD: boolean = false;
    lstOrgGroups: SelectItem[] = [];
    selectedZone: string = "";
    selectedDescription: string = "";
    selectedOrgGroupId: string = "";
    strOrgGrpId: string = "";
    showGrid: boolean = false;
    lstDBData: MT_ATPAR_STORAGE_ZONE[];
    cartsAllocatedMsg: string = "";
    createDeleteMsg: string = "";
    blnDeleteMessage: boolean = false;
    breadCrumbMenu: Menus;

    constructor(private httpService: HttpService, private _http: Http, public dataservice: datatableservice,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private storageLocationService: setupStorageLocationGroupServices,
        private atParSharedDataService: AtParSharedDataService,
        private atParConstant: AtParConstants,
        private router: Router,
        private confirmationService: ConfirmationService,
        private route: ActivatedRoute,
    ) {
        this.breadCrumbMenu = new Menus();
    }

    ngOnInit() {

        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.bindOrgGroups();


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
                                //this.GetData("");
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

    async GetData() {
        this.showGrid = false;

        if (this.blnShowOrgGroupLabel == true) {
            this.OrgGroupID = this.orgGrpId.split("-")[0];

        }
        else {
            this.OrgGroupID = this.selectedOrgGroupId;
        }

        this.spinnerService.start();
        if (this.OrgGroupID == "" || this.OrgGroupID == "Select User" || this.OrgGroupID == undefined) {
            this.growlMessage = [];
            this.showGrid = false;
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            this.spinnerService.stop();
            return false;
        }
        try {
            await this.storageLocationService.GetStorageZoneGroups(this.selectedZone, this.selectedDescription, this.OrgGroupID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE>;


                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showGrid = true;
                            if (this.blnDeleteMessage == false) {
                                this.growlMessage = [];
                            }

                            this.lstDBData = data.DataList;
                            this.spinnerService.stop();
                            this.blnDeleteMessage = false;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.blnDeleteMessage = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.blnDeleteMessage = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.blnDeleteMessage = false;
                            this.spinnerService.stop();
                            break;
                        }
                    }

                });



        }
        catch (ex) {
            this.clientErrorMsg(ex, "GetData");
        }
    }

    ddlChnage() {
        this.showGrid = false;
    }

    async createZones(event) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Create Storage Location Group';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Add,
            },
            relativeTo: this.route
        };
        this.router.navigate(['addZone'], navigationExtras);
    }

    async deleteZones(deleteData: MT_ATPAR_STORAGE_ZONE, event) {
        this.createDeleteMsg = event.target.id;

        await this.deleteConfirm(deleteData);
    }

    async deleteConfirm(deleteData: MT_ATPAR_STORAGE_ZONE) {
        if (this.blnShowOrgGroupLabel == true) {
            this.strOrgGrpId = this.orgGrpId;
        }
        else {
            this.strOrgGrpId = this.selectedOrgGroupId;
        }

        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: "Are you sure you want to delete  " + deleteData.STORAGE_ZONE_ID + "?",
                accept: () => {
                    this.storageLocationService.UpdateZones(deleteData.STORAGE_ZONE_ID, deleteData.STORAGE_ZONE_DESCR, 0, deleteData.ORG_GROUP_ID).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE>;
                            this.growlMessage = [];

                            switch (data.StatType) {
                                case StatusType.Success: {
                                    this.showGrid = true;
                                    this.blnDeleteMessage = true;
                                    let statusMessage = AtParConstants.Deleted_Msg.replace("1%", "Zone").replace("2%", deleteData.STORAGE_ZONE_ID);
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                    this.selectedZone = "";
                                    this.selectedDescription = "";
                                    // this.GetData();
                                    for (var i = 0; i < this.lstDBData.length; i++) {
                                        if (this.lstDBData[i].STORAGE_ZONE_ID == deleteData.STORAGE_ZONE_ID && this.lstDBData[i].STORAGE_ZONE_DESCR == deleteData.STORAGE_ZONE_DESCR && this.lstDBData[i].ORG_GROUP_ID == deleteData.ORG_GROUP_ID) {
                                            var index = this.lstDBData.indexOf(this.lstDBData[i], 0)
                                            this.lstDBData.splice(index, 1);

                                        }
                                    }
                                    this.spinnerService.stop();
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.showGrid = false;
                                    this.blnDeleteMessage = false;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                                }
                                case StatusType.Error: {
                                    this.showGrid = false;
                                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    this.blnDeleteMessage = false;
                                    this.spinnerService.stop();
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.showGrid = false;
                                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    this.blnDeleteMessage = false;
                                    this.spinnerService.stop();
                                    break;
                                }
                            }

                        });

                }
            });

        } catch (ex) {
            this.clientErrorMsg(ex, "deleteConfirm");
        }
    }

    clientErrorMsg(strExMsg, funname) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funname, this.constructor.name);
    }


    async AssignStorageLocation(zoneRowData: MT_ATPAR_STORAGE_ZONE) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Manage Zone Storage Location';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.atParSharedDataService.storage = { "zoneRowData": zoneRowData };
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Edit,
            },
            relativeTo: this.route

        };
        this.router.navigate(['assign'], navigationExtras);


    }
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstOrgGroups = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;

    }

}