import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ManageCarriersService } from './recv-manage-carriers.service';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { MT_RECV_MANAGE_CARRIERS } from "../Entities/MT_RECV_MANAGE_CARRIERS";
import { HttpService } from '../Shared/HttpService';
import { AtparStatusCodes, } from '../Shared/AtParStatusCodes';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { Message } from './../components/common/api';
import { TokenEntry_Enum, EnumApps, ModeEnum, YesNo_Enum, StatusType, } from '../Shared/AtParEnums'
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { Http, Response } from "@angular/http";

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'recv-manage-carriers.component.html',
    providers: [datatableservice, ManageCarriersService, HttpService, AtParCommonService, AtParConstants]
})

export class ManageCarriersComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    form: boolean = false;
    table: boolean = true;
    mode: string;
    pageSize: number;
    deviceTokenEntry: string[] = [];
    ddlStatusType: any[] = [];
    growlMessage: Message[] = [];
    loading: boolean = true;
    txtSearchStringStatus: number;
    txtStartpositionStatus: number;
    txtCarrierStatus: number;
    changeCarrierStatus: number;
    lblSearchString: string;
    txtEditStartPosition: string;
    txtEditCarrier: string;
    disableSearchString: boolean;
    lstManageCarriers: MT_RECV_MANAGE_CARRIERS[] = [];
    manageCarriers: MT_RECV_MANAGE_CARRIERS;
    showAddButton: boolean = true;
    txtCarrierSearch: string;
    breadCrumbMenu: Menus;

    constructor(public dataservice: datatableservice,
        private mngCarriersService: ManageCarriersService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants) {
        this.breadCrumbMenu = new Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }

    addCarrier() {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Carrier';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.txtSearchStringStatus = undefined;
            this.txtStartpositionStatus = undefined;
            this.txtCarrierStatus = undefined;
            this.growlMessage = [];
            this.table = false;
            this.form = true;
            this.loading = true;
            this.showAddButton = false;
            this.mode = ModeEnum[ModeEnum.Add].toString();
            this.disableSearchString = false;
            this.manageCarriers = new MT_RECV_MANAGE_CARRIERS();
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "addCarrier");
        }
    }

    editCarrier(carriers) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Carrier';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.txtStartpositionStatus = 0;
            this.txtCarrierStatus = 0;
            this.growlMessage = [];
            this.showAddButton = false;
            this.table = false;
            this.form = true;
            this.loading = false;
            this.manageCarriers = new MT_RECV_MANAGE_CARRIERS();
            this.mode = ModeEnum[ModeEnum.Edit].toString();
            this.disableSearchString = true;
            this.manageCarriers.SEARCH_STRING = carriers.SEARCH_STRING;
            this.manageCarriers.START_POSITION = carriers.START_POSITION;
            this.manageCarriers.CARRIER = carriers.CARRIER;
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "editCarrier");
        }
    }

    async  close() {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.form = false;
            this.growlMessage = [];
            this.showAddButton = true;
            this.txtCarrierSearch = "";
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "close");
        }
    }

    async ngOnInit() {
        try {
            this.table = false;
            this.ddlStatusType.push({ label: 'All', value: null });
            this.ddlStatusType.push({ label: 'Active', value: true });
            this.ddlStatusType.push({ label: 'Inactive', value: false });
            this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "ngOnInit");
        }
    }

    async bindGrid() {
        if (this.table == true) {
            this.dataTableComponent.reset();
        }
        try {
            this.spinnerService.start();
            if (this.txtCarrierSearch == null || this.txtCarrierSearch == undefined || this.txtCarrierSearch === "") {
                this.txtCarrierSearch = "";
            }
            await this.mngCarriersService.getCarriersData(this.txtCarrierSearch)
                .catch(this.httpService.handleError)
                .then((resp: Response) => {
                    let webresp = resp.json() as AtParWebApiResponse<MT_RECV_MANAGE_CARRIERS>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.table = true;
                            this.lstManageCarriers = webresp.DataList;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "warn", summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                            this.table = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "info", summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                            this.table = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "error", summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            this.table = false;
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindGrid");
        }
    }

    bindModelDataChange(event: any) {
        try {
            if ("SEARCHSTRNG" == event.TextBoxID.toString()) {
                this.txtSearchStringStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("STARTPOS" == event.TextBoxID.toString()) {
                this.txtStartpositionStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("CARRIER" == event.TextBoxID.toString()) {
                this.txtCarrierStatus = event.validationrules.filter(x => x.status == false).length;
            }
            //validations satisfies r not 
            if (this.mode == ModeEnum[ModeEnum.Add].toString()) {
                if (this.txtSearchStringStatus == 0 && this.txtStartpositionStatus == 0 && this.txtCarrierStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            if (this.mode == ModeEnum[ModeEnum.Edit].toString()) {
                if (this.txtStartpositionStatus == 0 && this.txtCarrierStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    }

    async  saveOrUpdateCarriers() {
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            this.changeCarrierStatus = 1;
            await this.mngCarriersService.updateCarriers(this.mode, this.manageCarriers.SEARCH_STRING, this.manageCarriers.START_POSITION, this.manageCarriers.CARRIER, this.changeCarrierStatus)
                .subscribe((resp: Response) => {
                    let webresp = resp.json();
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            if (this.mode == ModeEnum[ModeEnum.Add]) {


                                let statusMessage = AtParConstants.Created_Msg.replace("1%", "Carrier").replace("2%", this.manageCarriers.CARRIER);
                                this.growlMessage.push({
                                    severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage
                                });
                                this.manageCarriers = new MT_RECV_MANAGE_CARRIERS();
                                (<HTMLInputElement>document.getElementById('SEARCHSTRNG')).focus();
                                this.loading = true;

                                this.txtSearchStringStatus = 1;
                                this.txtStartpositionStatus = 1;
                                this.txtCarrierStatus = 1;

                            }
                            if (this.mode == ModeEnum[ModeEnum.Edit]) {
                                let statusMessage = AtParConstants.Updated_Msg.replace("1%", "Carrier").replace("2%", this.manageCarriers.CARRIER);
                                this.growlMessage.push({
                                    severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage
                                });
                                (<HTMLInputElement>document.getElementById('STARTPOS')).focus();
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            if (webresp.StatusCode == AtparStatusCodes.S_DATAEXISTS_INTABLE) {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Search String already exists" });
                            }
                            else {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            if (webresp.StatusCode == AtparStatusCodes.S_DATAEXISTS_INTABLE) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Search String already exists" });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                            }
                            break;
                        }
                    }
                    this.spinnerService.stop();
                });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "saveOrUpdateCarriers");
        }
    }

    changeStatus(carriers) {
        if (carriers.STATUS == true) {
            this.changeCarrierStatus = 0;
        }
        else {
            this.changeCarrierStatus = 1;
        }
        this.growlMessage = [];
        this.spinnerService.start();
        this.lblSearchString = carriers.SEARCH_STRING;
        this.txtEditStartPosition = carriers.START_POSITION;
        this.txtEditCarrier = carriers.CARRIER;
        try {
            this.mode = "Status";
            var webresp = new AtParWebApiResponse<string>();
            this.mngCarriersService.updateCarriers(this.mode, this.lblSearchString, this.txtEditStartPosition, this.txtEditCarrier, this.changeCarrierStatus)
                .subscribe(async (resp: Response) => {
                    let webresp = resp.json();
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            await this.bindGrid();
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Carrier " + carriers.CARRIER + " Updated Successfully" });
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
                    }
                    this.spinnerService.stop();
                });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "changeStatus");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.ddlStatusType = [];
        this.growlMessage = [];
        this.txtSearchStringStatus = 1;
        this.txtStartpositionStatus = 1;
        this.txtCarrierStatus = 1;
        this.changeCarrierStatus = 1;
        this.lblSearchString = '';
        this.txtEditStartPosition = '';
        this.txtEditCarrier = '';
        this.disableSearchString = false;
        this.lstManageCarriers = [];
        this.manageCarriers = null;
        this.spinnerService.stop();
    }
}
