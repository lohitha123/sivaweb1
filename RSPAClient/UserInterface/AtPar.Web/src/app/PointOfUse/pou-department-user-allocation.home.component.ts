/// <reference path="../entities/mt_pou_dept.ts" />
import { Component, OnDestroy, Input } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { Message } from '../components/common/api';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { DepartmentUserAllocationServiceComponent } from './pou-department-user-allocation.component.service'
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParConstants } from '../Shared/AtParConstants';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { MT_POU_DEPT } from '../../app/Entities/MT_POU_DEPT';
import { StatusType } from '../Shared/AtParEnums';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { EnumApps } from '../Shared/AtParEnums';
import { Menus } from '../AtPar/Menus/routepath';
import { ModeEnum } from '../Shared/AtParEnums'

declare var module: {
    id: string;
}
@Component({

    selector:'atpar-pou-departmentuserallocation',
    templateUrl: 'pou-department-user-allocation.home.component.html',
 
    providers: [datatableservice, AtParCommonService, DepartmentUserAllocationServiceComponent, AtParConstants]
})

export class DepartmentUserAllocationHomeComponent {
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    selectedDeptID: string = "";
    selectedDescription: string = "";
    lstDBData: MT_POU_DEPT[];
    showGrid: boolean = false;
    NoofDepartmentsMessage: string = "";
    intAppID: number;
    @Input() appId: number;
    pageName: string = "";
    breadCrumbMenu: Menus;
    constructor(private httpService: HttpService, private _http: Http, public dataservice: datatableservice,
        private commonService: AtParCommonService,
        private deptUserAllocationService: DepartmentUserAllocationServiceComponent,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private router: Router,
        private route: ActivatedRoute,
        private atParSharedDataService: AtParSharedDataService) {
        this.breadCrumbMenu = new Menus();
    }
    ngOnInit() {
        this.intAppID = this.appId;
        this.spinnerService.start();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.spinnerService.stop();
        if (isNaN(this.intAppID)) {
            this.intAppID = EnumApps.PointOfUse;
            this.pageName = "Point of Use - Department User Allocation";
        }
        else {
            if (this.intAppID != EnumApps.PointOfUse) {
                this.pageName = "AtPaRx - Department User Allocation";
            }
            else {
                this.pageName = "Point of Use - Department User Allocation";
            }
        }

    }
    async BindGrid() {
        this.showGrid = false;
        this.spinnerService.start();
        this.selectedDeptID = this.selectedDeptID.trim();
        this.selectedDescription = this.selectedDescription.trim();
        try {
            await this.deptUserAllocationService.GetDeptUsers(this.selectedDeptID, this.selectedDescription, this.toTitleCase(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_DEPT>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showGrid = true;
                            this.lstDBData = data.DataList;
                            this.NoofDepartmentsMessage = data.DataList.length.toString() + " Department(s) Found";
                            //this.selectedDeptID = "";
                            //this.selectedDescription = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.NoofDepartmentsMessage = "";
                            this.selectedDeptID = "";
                            this.selectedDescription = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.NoofDepartmentsMessage = "";
                            this.selectedDeptID = "";
                            this.selectedDescription = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.NoofDepartmentsMessage = "";
                            this.selectedDeptID = "";
                            this.selectedDescription = "";
                            this.spinnerService.stop();
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
    async DepartmentUserCollection(Departmentdata: MT_POU_DEPT) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Allocate Users';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

        //this.atParSharedDataService.storage = { "Departmentdata": Departmentdata, "AppId": this.intAppID };
        this.atParSharedDataService.setStorage({ "Departmentdata": Departmentdata, "AppId": this.intAppID });
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Add,
            },
            relativeTo: this.route

        };
        this.router.navigate(['assign'], navigationExtras);

    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstDBData = null;
        this.growlMessage = null;

    }
}