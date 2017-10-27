/// <reference path="../shared/atparstatuscodes.ts" />
import { Component, OnDestroy, Input } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { Message } from '../components/common/api';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { ReleaseCasesServiceComponent } from './pou-release-cases.component.service'
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParConstants } from '../Shared/AtParConstants';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { MT_POU_DEPT } from '../../app/Entities/MT_POU_DEPT';
import { MT_ATPAR_TRANSACTION } from '../../app/Entities/MT_ATPAR_TRANSACTION';
import { MT_POU_CASE_CART_HEADER } from '../../app/Entities/MT_POU_CASE_CART_HEADER';
import { StatusType } from '../Shared/AtParEnums';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { EnumApps } from '../Shared/AtParEnums';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { ConfirmationService } from '../components/common/api';
import { AtparStatusCodes } from "../Shared/AtParStatusCodes";
declare var module: {
    id: string;
}
@Component({

    templateUrl: 'pou-release-cases.component.html',
    providers: [datatableservice, AtParCommonService, ReleaseCasesServiceComponent, AtParConstants, AtParSharedDataService, ConfirmationService]
})

export class ReleaseCasesComponent {
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    selectedDeptID: string = "";
    selectedCaseID: string = "";
    searchedDeptID: string = "";
    searchedCaseID: string = "";
    lstDBDeptData: MT_POU_DEPT[];
    lstDBCaseData: MT_POU_CASE_CART_HEADER[];
    lstDBData: MT_ATPAR_TRANSACTION[];
    lstgridfilterData: MT_ATPAR_TRANSACTION[];
    lstCases: MT_ATPAR_TRANSACTION[];
    showGrid: boolean = false;
    lstFilteredDepts: any = [];
    lstFilteredCases: any = [];
    transactionIdlist: number[] = [];
    tranId: number;
    tranBoolean: boolean;
    startIndex: number;
    EndIndex: number;
    msgBoolean: boolean = false;

    constructor(private httpService: HttpService, private _http: Http, public dataservice: datatableservice,
        private commonService: AtParCommonService,
        private releaseCasesService: ReleaseCasesServiceComponent,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private router: Router,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private atParSharedDataService: AtParSharedDataService) {

    }
    ngOnInit() {
        this.spinnerService.start();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        setTimeout(() => {
            this.spinnerService.stop();
        }, 2000);

    }

    async fillDepartmentsAuto(event) {

        this.lstFilteredDepts = [];
        let query = event.query;
        try {
            await this.releaseCasesService.GetDeptUsers(this.deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_DEPT>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {

                            this.lstDBDeptData = data.DataList;
                            this.lstFilteredDepts = this.filterDepartments(query, this.lstDBDeptData)

                            this.spinnerService.stop();
                            break;
                        }
                        //    case StatusType.Warn: {


                        //        if (data.StatusCode = AtparStatusCodes.E_NORECORDFOUND) {
                        //            this.growlMessage = [];
                        //        }
                        //        else {
                        //            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        //        }
                        //        this.spinnerService.stop();
                        //        break;
                        //    }
                        //    case StatusType.Error: {

                        //        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });

                        //        this.selectedDeptID = "";

                        //        this.spinnerService.stop();
                        //        break;
                        //    }
                        //    case StatusType.Custom: {

                        //        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });

                        //        this.selectedDeptID = "";

                        //        this.spinnerService.stop();
                        //        break;
                        //    }
                    }
                });



        }
        catch (ex) {

            this.clientErrorMsg(ex);
            this.spinnerService.stop();
        }
    }
    async fillCasesAuto(event) {
        this.lstDBCaseData = [];
        this.lstFilteredCases = [];
        let query = event.query;
        try {
            await this.releaseCasesService.GetCases(this.deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_CASE_CART_HEADER>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {

                            this.lstDBCaseData = data.DataList;
                            this.lstFilteredCases = this.filterCases(query, this.lstDBCaseData);
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {

                            if (data.StatusCode = AtparStatusCodes.E_NORECORDFOUND) {
                                this.growlMessage = [];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }


                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {

                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });

                            this.selectedDeptID = "";

                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {

                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.selectedDeptID = "";
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });



        }
        catch (ex) {

            this.clientErrorMsg(ex);
            this.spinnerService.stop();
        }
    }

    filterDepartments(query, departments: MT_POU_DEPT[]): any[] {

        let filtered : any[] = [];
        this.lstDBDeptData = [];
        this.lstDBDeptData = asEnumerable(departments).Where(x => x.DEPT_ID.toUpperCase().startsWith(query.toUpperCase()) || x.DEPT_ID.toUpperCase().endsWith(query.toUpperCase()) || x.DEPT_NAME.toUpperCase().endsWith(query.toUpperCase()) || x.DEPT_NAME.toUpperCase().startsWith(query.toUpperCase())).ToArray();
        if (query == "%") {
            for (let i = 0; i <= departments.length - 1; i++) {
                if ((departments[i].DEPT_ID != null && departments[i].DEPT_NAME != null) || (departments[i].DEPT_ID != null && departments[i].DEPT_NAME !== "")) {

                    let Bunitvalue = departments[i].DEPT_ID + " - " + departments[i].DEPT_NAME;
                    filtered.push(Bunitvalue);

                }
                else {
                    let Bunitvalue = departments[i].DEPT_ID;
                    filtered.push(Bunitvalue);

                }
            }

        } else {
            if (query.length >= 0) {

                for (let i = 0; i <= this.lstDBDeptData.length - 1; i++) {
                    if ((this.lstDBDeptData[i].DEPT_ID != null && this.lstDBDeptData[i].DEPT_NAME != null) || (this.lstDBDeptData[i].DEPT_ID != null && this.lstDBDeptData[i].DEPT_NAME !== "")) {

                        let Bunitvalue = this.lstDBDeptData[i].DEPT_ID + " - " + this.lstDBDeptData[i].DEPT_NAME;
                        filtered.push(Bunitvalue);

                    }
                    else {
                        let Bunitvalue = this.lstDBDeptData[i].DEPT_ID;
                        filtered.push(Bunitvalue);

                    }

                }
            }
        }


        return filtered;
    }

    filterCases(query, cases: MT_POU_CASE_CART_HEADER[]): any[] {

        let filtered : any[] = [];
        //this.lstDBCaseData = [];
        this.lstDBCaseData = asEnumerable(cases).Where(x => x.CASE_ID.toUpperCase().startsWith(query.toUpperCase()) || x.CASE_ID.toUpperCase().endsWith(query.toUpperCase()) || x.DESCRIPTION.toUpperCase().endsWith(query.toUpperCase()) || x.DESCRIPTION.toUpperCase().startsWith(query.toUpperCase())).ToArray();
        //this.lstDBCaseData = asEnumerable(this.lstDBCaseData).Where(x => x.DEPT_ID.toUpperCase().startsWith(this.selectedDeptID.toUpperCase()) || x.DEPT_ID.toUpperCase().endsWith(this.selectedDeptID.toUpperCase())).ToArray();
        if (this.selectedDeptID != "") {
            let splitSelDepId = this.selectedDeptID.split(" - ");
            this.lstDBCaseData = asEnumerable(this.lstDBCaseData).Where(x => x.DEPT_ID.toUpperCase().startsWith(splitSelDepId[0].toUpperCase()) || x.DEPT_ID.toUpperCase().endsWith(splitSelDepId[0].toUpperCase())).ToArray();
        }
        if (query == "%") {
            for (let i = 0; i <= cases.length - 1; i++) {
                if (cases[i].DESCRIPTION != null && cases[i].DESCRIPTION !== "") {
                    let Bunitvalue = cases[i].CASE_ID + " - " + cases[i].DESCRIPTION;

                    filtered.push(Bunitvalue);

                }
                else {
                    let Bunitvalue = cases[i].CASE_ID;

                    filtered.push(Bunitvalue);

                }
            }

        } else {
            if (query.length >= 0) {
                for (let i = 0; i <= this.lstDBCaseData.length - 1; i++) {
                    if (this.lstDBCaseData[i].DESCRIPTION != null && this.lstDBCaseData[i].DESCRIPTION !== "") {
                        let Bunitvalue = this.lstDBCaseData[i].CASE_ID + " - " + this.lstDBCaseData[i].DESCRIPTION;

                        filtered.push(Bunitvalue);

                    }
                    else {
                        let Bunitvalue = this.lstDBCaseData[i].CASE_ID;

                        filtered.push(Bunitvalue);

                    }

                }
            }
        }


        return filtered;
    }

    async GetCasesOnGoClick() {

        this.lstgridfilterData = null;
        this.tranId = 0;
        this.tranBoolean = false;
        this.transactionIdlist = [];
        if (this.selectedDeptID !== "") {
            this.searchedDeptID = this.selectedDeptID;
            this.searchedDeptID = this.searchedDeptID.split("-")[0];
        }
        if (this.selectedCaseID !== "") {
            this.searchedCaseID = this.selectedCaseID;
            this.searchedCaseID = this.searchedCaseID.split("-")[0];
        }
        await this.GetCases();

    }

    async GetCases() {
        this.showGrid = false;
        this.spinnerService.start();
        if (this.selectedDeptID == "") {
            this.searchedDeptID = "";
        }
        if (this.selectedCaseID == "") {
            this.searchedCaseID = "";
        }
        try {
            await this.releaseCasesService.ProcessReleaseCases(this.tranBoolean, this.tranId, this.searchedDeptID, this.searchedCaseID, this.deviceTokenEntry, this.transactionIdlist).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_TRANSACTION>;


                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showGrid = true;
                            this.lstDBData = data.DataList;
                            //this.searchedDeptID = "";
                            //this.searchedCaseID = "";
                            if (this.msgBoolean == false) {
                                this.growlMessage = [];
                            }
                            this.msgBoolean = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.searchedDeptID = "";
                            this.searchedCaseID = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.searchedDeptID = "";
                            this.searchedCaseID = "";


                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.searchedDeptID = "";
                            this.searchedCaseID = "";


                            this.spinnerService.stop();
                            break;
                        }
                    }
                });



        }
        catch (ex) {

            this.clientErrorMsg(ex);
            this.spinnerService.stop();
        }
    }

    unlockRow(event, lstRowData: MT_ATPAR_TRANSACTION) {

        this.spinnerService.start();

        if (event == true) {

            this.transactionIdlist.push(lstRowData.TRANSACTION_ID);
            this.spinnerService.stop();
        }

        else {
            var index = this.transactionIdlist.indexOf(lstRowData.TRANSACTION_ID, 0);
            if (index > -1) {
                this.transactionIdlist.splice(index, 1);
            }
            this.spinnerService.stop();
        }


    }




    async UnlockSelectedRecords() {
        this.tranBoolean = true;
        if (this.transactionIdlist.length == 0) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select case(s) to release" });
            return;
        }
        this.confirmationService.confirm({
            message: "Are you sure you want to unlock the Case(s) ?",
            accept: async () => {
                await this.GetCases();
                this.msgBoolean = true;
                this.growlMessage = [];
                setTimeout(() => {
                    this.spinnerService.stop();
                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Case(s) Released Successfully" });

                }, 500);
                
            },
            reject: () => {
                return;
            }
        })




    }

    filterdata(event) {

        this.lstgridfilterData = new Array<MT_ATPAR_TRANSACTION>();
        this.lstgridfilterData = event;

    }

    checkAll() {

        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {

            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }

            for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {

                this.lstgridfilterData[i].Status = true;
                this.transactionIdlist.push(this.lstgridfilterData[i].TRANSACTION_ID);

            }

        }
        else {

            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }

            for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstDBData[i].Status = true;
                this.transactionIdlist.push(this.lstDBData[i].TRANSACTION_ID);


            }

        }



    }

    uncheckAll() {
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");


        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {

            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }

            for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {

                this.lstgridfilterData[i].Status = false;
                var index = this.transactionIdlist.indexOf(this.lstgridfilterData[i].TRANSACTION_ID, 0);
                if (index > -1) {
                    this.transactionIdlist.splice(index, 1);
                }
            }

        }
        else {

            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }

            for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstDBData[i].Status = false;
                var index = this.transactionIdlist.indexOf(this.lstDBData[i].TRANSACTION_ID, 0);
                if (index > -1) {
                    this.transactionIdlist.splice(index, 1);
                }


            }

        }

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