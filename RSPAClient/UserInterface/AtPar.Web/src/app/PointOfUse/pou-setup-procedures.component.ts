import { NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Message } from './../components/common/api';
import { SetupProcedureServices } from "../../app/PointOfUse/pou-setup-procedures.services";
import { StatusType, TokenEntry_Enum, ModeEnum, YesNo_Enum } from './../Shared/AtParEnums';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { MT_POU_REASON_CODE } from '../Entities/MT_POU_REASON_CODE';
import { MT_POU_PROCEDURE_CODE } from '../../app/Entities/MT_POU_PROCEDURE_CODE';
import { HttpService } from '../Shared/HttpService';
import { AtParConstants } from '../Shared/AtParConstants';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { ConfirmationService } from '../components/common/api';
import { MT_POU_SPECIALTY_CODE } from '../../app/Entities/MT_POU_SPECIALTY_CODE';
import { AtparStatusCodes } from './../Shared/AtParStatusCodes'
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}


@Component({
  
    templateUrl: 'pou-setup-procedures.component.html',
    providers: [datatableservice, SetupProcedureServices, ConfirmationService, AtParConstants]
})

export class SetupProceduresComponent {
    procedureCodeList: MT_POU_PROCEDURE_CODE[];
    pop: boolean = false;
    page: boolean = true;
    addData: boolean = false;
    editform: boolean = false;
    sales: Employee[];
    ven: any;
    loading: boolean = false;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    msgs: Message[] = [];
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    intAppId: number;
    growlMessage: Message[] = [];
    isVisible: boolean = true;
    specialityCodes: any[] = [];
    systemData: any[] = [];
    pCode: string;
    sCode: string;
    descr: string;
    codeType: string = 'procedures';
    pCodeNew: string = '';
    descrNew: string = '';
    mode: string;
    ProcedureCodeStatus: number;
    isDuplicateExists: boolean = false;
    pageSize: number;
    proceduresCount: any;
    breadCrumbMenu: Menus;

    constructor(public dataservice: datatableservice, private setupProcedureServices: SetupProcedureServices, private httpService: HttpService,
        private spinnerService: SpinnerService, private confirmationService: ConfirmationService, private atParConstant: AtParConstants) {
        this.breadCrumbMenu = new Menus();

        //   this.dataservice.getdetails().then(countries => { this.sales = countries; });
        //this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        // this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        // this.intAppId = parseInt(this.appId);
    }

    async  ngOnInit() {
        this.spinnerService.start();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        await this.getSpecialityCodes();
        this.spinnerService.stop();

    }


    async  go() {
        this.mode = "";
        this.growlMessage = [];
        this.pop = false;
        this.bindDataGrid();
    }


    async   add() {

        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Procedure Code';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.loading = true;
        this.mode = "Add";
        this.addData = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.pCode = '';
        this.sCode = '';
        this.descr = '';
        this.pCodeNew = '';
        this.descrNew = '';
        //   await this.getSpecialityCodes();
        this.ProcedureCodeStatus = undefined;
        this.descStatus = undefined;
    }

    edit(record) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Procedure Code';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.editform = true;
        this.addData = false;
        this.page = false;
        this.pop = false;
        this.pCodeNew = '';
        this.descrNew = '';
        this.pCode = record.PROCEDURE_CODE;
        this.sCode = record.SPECIALTY_CODE;
        this.descr = record.DESCRIPTION;
    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.addData = false;
        this.page = true;
        this.pop = false;
        this.editform = false;
        this.pCodeNew = '';
        this.descrNew = '';
    }



    async bindDataGrid() {

        await this.getProcedureCodes(this.codeType, '', '');

    }
    async getProcedureCodes(codeType: string, code: string, desr: string) {
        this.spinnerService.start();
        try {

            await this.setupProcedureServices.GetProcedureCodes(
                codeType, this.pCodeNew, this.descrNew)
                .catch(this.httpService.handleError).then((resp: Response) => {
                    let data = resp.json() as AtParWebApiResponse<MT_POU_PROCEDURE_CODE>;
                    this.spinnerService.stop();
                    let griddata = data.DataList;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.page = true;
                            if (griddata.length > 0) {
                                this.procedureCodeList = griddata;
                                let count = this.procedureCodeList.length;
                                this.proceduresCount = count;
                                this.proceduresCount = this.proceduresCount + " Procedure Code(s) Found";

                                this.pop = true;
                                break;
                            }
                            else {
                                this.pop = false;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (this.mode == "delete") {
                                this.pop = false;
                                break;
                            }
                            else {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                this.pop = false;
                                this.isVisible = false;

                            }


                            break;
                        }
                        case StatusType.Error: {
                            this.pop = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.pop = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }

                    }

                });


        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }


    async getSpecialityCodes() {

        this.spinnerService.start();
        try {
            this.mode = "";
            await this.setupProcedureServices.GetSpecialtyCodes(this.codeType, '', '')
                .catch(this.httpService.handleError).then((resp: Response) => {
                    let data = resp.json() as AtParWebApiResponse<MT_POU_SPECIALTY_CODE>;
                    this.spinnerService.stop();
                    this.systemData = data.DataList;
                    this.specialityCodes = [];
                    this.specialityCodes.push({ label: "Select Specialty / Service", value: null })
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.systemData.length > 0) {
                                for (var i = 0; i < this.systemData.length; i++) {
                                    this.specialityCodes.push({ label: this.systemData[i].CODE, value: this.systemData[i].CODE });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            // this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });

                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            // this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            // this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                    this.spinnerService.stop();
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async addProcedureCodes() {
        this.mode = "";
        //if (this.isDuplicateExists) {
        //    this.growlMessage = [];
        //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Procedures code already exists " });
        //    this.isDuplicateExists = false;
        //    return;
        //}

        this.spinnerService.start()
        try {
            if (this.sCode == null)
            {
                this.sCode = "";
            }
            this.growlMessage = [];
            await this.setupProcedureServices.AddCodes(this.codeType, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.pCode, this.descr, this.sCode).forEach(resp => {

                this.spinnerService.stop()
                switch (resp.StatType) {
                    case StatusType.Success: {

                        //this.specialityCodes = [];
                        //this.specialityCodes.push({ label: "Please Specialty / Servicee", value: " " })
                        this.loading = true;
                        // this.pop = true;
                        // this.bindDataGrid();
                        let statusMessage = AtParConstants.Created_Msg.replace("1%", "Procedure").replace("2%", this.pCode);

                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                        this.page = false;
                        this.addData = true;
                        this.pCode = "";
                        this.descr = "";
                        this.specialityCodes = [];
                        this.sCode = " ";
                        this.getSpecialityCodes();
                        (<HTMLInputElement>document.getElementById('pCodeAdd')).focus();
                        break;
                    }

                    case StatusType.Warn: {
                        this.growlMessage = [];
                        let statusMessage: string = resp.StatusMessage;
                        if (resp.StatusCode == AtparStatusCodes.ATPAR_E_ALREADY_EXISTS) {
                            let statusMessage = AtParConstants.AlreadyExist_Msg.replace("1%", "Procedure Code").replace("2%", this.pCode);
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: statusMessage });
                            //this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Procedure Code" + statusMessage.split("1%")[1] + this.pCode });

                        }
                        else {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });

                        }
                        this.isVisible = false;
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
                this.spinnerService.stop();
            });
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex);
        }
    }

    async updateProcedureCodes() {
        this.spinnerService.start();
        try {
           
            this.mode = "";
            if (this.sCode == null) {
                this.sCode = "";
            }
            this.setupProcedureServices.UpdateCodes(this.codeType, this.pCode, this.descr, this.sCode).forEach(resp => {
                this.spinnerService.stop();
                switch (resp.StatType) {
                    case StatusType.Success: {
                        // this.close();
                        // this.bindDataGrid();
                        this.ProcedureCodeStatus = null;
                        this.descStatus = null;
                        this.growlMessage = [];
                        let statusMessage = AtParConstants.Updated_Msg.replace("1%", "Procedure").replace("2%", this.pCode);
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                        (<HTMLInputElement>document.getElementById('txtsCode')).focus();
                        break;
                    }

                    case StatusType.Warn: {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        this.isVisible = false;
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
                this.spinnerService.stop();
            });
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex);
        }
    }

    async deleteProcedureCodes(record) {
        this.spinnerService.start();
        try {
            this.mode = "delete";
            this.setupProcedureServices.DeleteCodes(this.codeType, record.PROCEDURE_CODE, record.DESCRIPTION).forEach(resp => {
                this.spinnerService.stop();
                switch (resp.StatType) {
                    case StatusType.Success: {
                        this.page = true;
                        this.pop = true;


                        let statusMessage = AtParConstants.Deleted_Msg.replace("1%", "Procedure").replace("2%", record.PROCEDURE_CODE);
                        this.growlMessage.push({
                            severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage

                        });
                        this.bindDataGrid();
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        this.isVisible = false;
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
                this.spinnerService.stop();
            });
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex);
        }
    }

    confirmDelete(setupProcedure) {
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete this Code?',
                accept: () =>
                { this.deleteProcedureCodes(setupProcedure); }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    bindModelDataChange(event) {
        try {

            if ("pCodeAdd" == event.TextBoxID.toString()) {
                this.ProcedureCodeStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("DepartmentID" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.ProcedureCodeStatus == 0) {
                if (this.descStatus == 0 || this.descStatus == undefined) {
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
        catch (exMsg) {

            this.clientErrorMsg(exMsg);
        }
    }



    ngOnDestroy() {
 
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.pop = null;
        this.page = null;
        this.spinnerService.stop();
        this.pageSize = null;
        this.pCode = null;
        this.sCode = null;
        this.descr = null;
        this.codeType = null;
        this.pCodeNew = null;
        this.descrNew = null;
        this.descrNew = null;
        this.descrNew = null;
        this.addData = null;
        this.descStatus = null;      
        this.deviceIDStatus = null;
        this.loading = null;
        this.mode = null;
        this.editform = null;
        this.macAddressStatus = null;
        this.intAppId = null;
        this.isVisible = null;
        this.proceduresCount = null;

    }


}