import { Component, Injectable, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { TokenEntry_Enum, ClientType, ModeEnum } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { MT_ATPAR_APP } from '../entities/mt_atpar_app';
import { MT_ATPAR_SETUP_PRO_PRINTERES } from '../entities/mt_atpar_setup_pro_printeres';
import { StatusType, EnumApps } from '../Shared/AtParEnums';
import { ConfirmDialogModule } from '../components/confirmdialog/confirmdialog';
import { ConfirmationService, Confirmation } from '../components/common/api';
import { MaintainPrinterServices } from '../../app/Init/atpar-maintain-printers.service';
import { MT_ATPAR_APP_LINKED_LABELS } from '../entities/mt_atpar_app_linked_labels';
import { MT_ATPAR_LABELS_DATA } from '../entities/mt_atpar_labels_data';
import { AtParConstants } from '../Shared/AtParConstants';
import { Observable } from 'rxjs/Rx';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { DOCUMENT } from '@angular/platform-browser';
import { asEnumerable } from 'linq-es5';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'atpar-maintain-printers.component.html',
    providers: [AtParCommonService, ConfirmationService, MaintainPrinterServices, AtParConstants]
})

export class MaintainPrinters {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    _deviceTokenEntry: any;
    growlMessage: Message[] = [];
    pazeSize: number;
    lstAppsData: SelectItem[] = [];
    selectedApp: any;
    printerName: any;
    lstPrinters: MT_ATPAR_SETUP_PRO_PRINTERES[] = [];
    lstFilterPrinters: MT_ATPAR_SETUP_PRO_PRINTERES[] = [];
    showMainPage: boolean = true;
    ven: any;
    lstPrinterModels: SelectItem[] = [];
    lstFunctionalities: SelectItem[] = [];
    lstModels: SelectItem[] = [];
    lstPrinterTypes: SelectItem[] = [];
    PrinterData = new MT_ATPAR_SETUP_PRO_PRINTERES();
    editPrinterData: any;
    lstPrinterData: MT_ATPAR_SETUP_PRO_PRINTERES[] = [];
    lstPrinterModelsData: any = [];
    lstFunctionalitiesData: any = [];
    lstModelsData: any = [];
    lstLinkedFunctionalities: MT_ATPAR_APP_LINKED_LABELS[] = [];
    showIPAddressRow: boolean = true;
    labelHeight: string;
    labelWidth: string;
    showNewModel: boolean = false;
    showMultipleModel: boolean = false;
    showExistedImage: boolean = false;
    lstModelImages: MT_ATPAR_LABELS_DATA[] = [];
    Mode: string;
    blnCheckPrinterExists: boolean = false;
    blnFileUpload: boolean = true;
    strLvx: string;
    strPnl: string;
    getModels: string;
    lstFiles: any = [];
    goNext: boolean = true;
    txtIPadd: number = undefined;
    txtPort: number = undefined;
    txtFriendlyName: number = undefined;
    txtHeight: number = undefined;
    txtWidth: number = undefined;
    buttonEnableDisable: boolean = true;
    oldFriendlyName: string = '';
    ddlStatusType: SelectItem[] = [];
    focusdropdown: boolean = true;
    refstatus: boolean = false;
    selectedFile: string='';
    breadCrumbMenu: Menus;
    btnupdate: boolean = false;
    selectedsrpstatus: string = "";
    selectedStatusValue: string = "";
    grdstatus: boolean = false;

    constructor(
        private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private confirmationService: ConfirmationService,
        private maintainPrinterServices: MaintainPrinterServices,
        private atParConstant: AtParConstants,
        @Inject(DOCUMENT) private document,
        private http: Http
    ) {
        this.breadCrumbMenu = new Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }

    ngOnInit() {
        this.pazeSize = +this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.getApps();
        // this.GetStatusdrp();
        this.ddlStatusType = [];
        this.ddlStatusType.push({ label: 'All', value: '' });
        this.ddlStatusType.push({ label: 'Active', value: true });
        this.ddlStatusType.push({ label: 'InActive', value: false });
    }
    //============= GETTING DROPDOWN DATA=============//
    async getApps() {
        try {
            this.spinnerService.start();
            await this.atParCommonService.getApps(this._deviceTokenEntry[TokenEntry_Enum.UserID]).then((result) => {
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.spinnerService.stop();
                this.lstAppsData = [];
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.lstAppsData.push({ label: 'Select One', value: 'Select One' });
                        for (var i = 0; i < res.DataList.length; i++) {
                            if (i != 0) {
                                if (res.DataList[i].APP_ID != EnumApps.Reports) {
                                    this.lstAppsData.push({ label: (res.DataList[i].APP_NAME), value: res.DataList[i].APP_ID })
                                }
                            }
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getApps");
        }

    }
    //============= GETTING DROPDOWN DATA END=========//
    //GetStatusdrp() {
    //    this.ddlStatusType = [];
    //    this.ddlStatusType.push({ label: 'All', value: null });
    //    this.ddlStatusType.push({ label: 'Active', value: true });
    //    this.ddlStatusType.push({ label: 'InActive', value: false });
    //}

    ddlAppChnage() {
        this.lstPrinters = [];
        this.grdstatus = false;
    }

    async btnGo_Click() {
        try {
            this.grdstatus = false;
            //this.ddlStatusType = [];
            this.selectedsrpstatus = "";
            this.selectedStatusValue = "";
            // this.GetStatusdrp();
            if (this.dataTableComponent != undefined) {
                this.dataTableComponent.reset();
            }
            this.spinnerService.start();
            if (this.selectedApp == undefined || this.selectedApp == 'Select One') {
                this.selectedApp = ''
            }
            if (this.printerName == undefined) {
                this.printerName = ''
            }
            await this.atParCommonService.getPrintersData(this.selectedApp, this.printerName).then((result) => {
                let res = result.json() as AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES>;
                this.lstPrinters = []
                this.spinnerService.stop();
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.grdstatus = true;
                        if (this.refstatus == false) {
                            this.growlMessage = [];
                        }
                        else {
                            this.refstatus = false;
                            //  this.btnupdate = false;
                            //this.growlMessage = [];
                        }
                        this.lstPrinters = res.DataList;
                        for (var i = 0; i < this.lstPrinters.length; i++) {
                            this.lstPrinters[i].ActiveStatus = this.lstPrinters[i].STATUS == "1" ? true : false;
                             
                        }
                        this.lstFilterPrinters = this.lstPrinters;
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }

            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGo_Click");
        }
    }

    async selectItemtoChangeStatus(e, item) {
        var status;
        if (e) {
            item.ActiveStatus = true;
            status = 1;
        } else {
            item.ActiveStatus = false;
            status = 0;
        }
        await this.updatePrinterStatus(item.APP_ID, item.FRIENDLY_NAME, item.LABEL_TYPE, status);
    }

    async btnAdd_Click() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Setup Printer';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showMainPage = false;
        this.Mode = 'Add';
        this.showMultipleModel = false;
        this.showNewModel = false;
        this.showExistedImage = false;
        this.PrinterData = new MT_ATPAR_SETUP_PRO_PRINTERES();
        this.lstPrinterModels.push({ label: 'Select One', value: 'Select One' });
        this.lstFunctionalities.push({ label: 'Select One', value: 'Select One' });
        this.lstModels.push({ label: 'Select One', value: 'Select One' });
        this.lstPrinterTypes.push({ label: 'Select One', value: 'Select One' });
        this.buttonEnableDisable = true;
        this.focusdropdown = true;
        this.grdstatus = false;
        await this.getPrinterModels();
    }

    async getPrinterModels() {
        try {
            await this.maintainPrinterServices.getPrinterModels().then((result) => {
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.spinnerService.stop();
                this.lstPrinterModels = [];
                this.lstPrinterModelsData = []
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.lstPrinterModelsData = res.DataList;
                        this.lstPrinterModels.push({ label: 'Select One', value: 'Select One' });
                        for (var i = 0; i < res.DataList.length; i++) {
                            this.lstPrinterModels.push({ label: res.DataList[i].NAME, value: res.DataList[i].CODE })
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }
            })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getPrinterModels");
        }
    }

    async getFunctionalities(selectedProduct) {
        try {
            await this.maintainPrinterServices.getFunctionalities(selectedProduct).then((result) => {
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.lstFunctionalitiesData = [];
                this.lstFunctionalities = [];

                switch (res.StatType) {
                    case StatusType.Success: {
                        this.lstFunctionalitiesData = res.DataList;
                        this.lstFunctionalities.push({ label: 'Select One', value: 'Select One' });
                        for (var i = 0; i < res.DataList.length; i++) {
                            this.lstFunctionalities.push({ label: res.DataList[i].LABEL_DESCRIPTION, value: res.DataList[i].LABEL_TYPE })
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }
            })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getFunctionalities");
        }
    }

    async ddlProduct_SelectedIndexChanged(selectedProduct) {
        try {
            this.txtIPadd = undefined;
            this.txtPort = undefined;
            this.txtFriendlyName = undefined;
            //this.buttonEnableDisable = true;

            if (selectedProduct != 'Select One') {
                this.lstFunctionalities = [];
                await this.getFunctionalities(selectedProduct);
                this.PrinterData.PRINTER_CODE = '';
                this.lstPrinterTypes = [];
                this.PrinterData.NETWORK_TYPE = '';
                this.lstPrinterTypes.push({ label: 'Select One', value: 'Select One' });
                this.PrinterData.IP_ADDRESS = '';
                this.PrinterData.PORT_NO = '';// '';
                this.PrinterData.FRIENDLY_NAME = '';
                this.PrinterData.LABEL_TYPE = 0//'';
                this.lstLinkedFunctionalities = [];
                this.lstModels = [];
                this.lstModels.push({ label: 'Select One', value: 'Select One' });
                this.PrinterData.MODEL = '';
                this.showExistedImage = false;
                this.showMultipleModel = false;
                this.showNewModel = false;
                this.labelHeight = '';
                this.labelWidth = '';
            }
            else {
                this.PrinterData.LABEL_TYPE = 'Select One';
            }
            this.buttonEnableDisable = this.dropDownValidations();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlProduct_SelectedIndexChanged");
        }
    }

    async ddlPrinterModel_SelectedIndexChanged(selectedPModel) {
        try {
            this.txtIPadd = undefined;
            this.txtPort = undefined;
            this.txtFriendlyName = undefined;
            if (selectedPModel != 'Select One') {
                this.PrinterData.NETWORK_TYPE = '';
                this.PrinterData.IP_ADDRESS = '';
                this.PrinterData.PORT_NO = '';
                this.PrinterData.FRIENDLY_NAME = '';
                this.PrinterData.LABEL_TYPE = 0;//printer Model
                this.lstModels = [];
                this.PrinterData.MODEL = '';
                this.lstModels.push({ label: 'Select One', value: 'Select One' });
                //m_dsPrinterModels = ViewState("m_dsPrinterModels")

                this.lstPrinterTypes = [];
                this.showExistedImage = false;
                this.showNewModel = false;
                this.showMultipleModel = false;
                await this.bindPrinterType(selectedPModel);
            }
            else {
                this.PrinterData.NETWORK_TYPE = 'Select One';
            }
            this.buttonEnableDisable = this.dropDownValidations();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlPrinterModel_SelectedIndexChanged");
        }
    }

    ddlPrinterType_SelectedIndexChanged(selectedPrinterType) {

        if (selectedPrinterType != 'Select One') {
            if (selectedPrinterType == 'BlueTooth') {
                this.showIPAddressRow = false;
                this.PrinterData.IP_ADDRESS = '';
            } else {
                this.showIPAddressRow = true;
            }
        }
        this.buttonEnableDisable = this.dropDownValidations();
    };

    async ddlFunctionality_SelectedIndexChanged(e) {

        var selectedFunctionality = e.label;
        this.PrinterData.FUNCTIONALITY = e.label;
        this.PrinterData.MODEL = 'Select One';
        this.showExistedImage = false;
        this.showNewModel = false;
        this.showMultipleModel = false;

        if (selectedFunctionality != 'Select One') {
            await this.bindLinkFunctionalities(selectedFunctionality);
        }
        this.buttonEnableDisable = this.dropDownValidations();
    };

    async bindLinkFunctionalities(selectedFunctionality) {
        try {
            for (var i = 0; i < this.lstFunctionalitiesData.length; i++) {
                if (this.lstFunctionalitiesData[i].LABEL_DESCRIPTION == selectedFunctionality) {
                    await this.getLinkedFunctionalities(this.lstFunctionalitiesData[i].APP_ID, this.lstFunctionalitiesData[i].LABEL_TYPE);
                    break;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindLinkFunctionalities");
        }
    }

    async  getLinkedFunctionalities(appID, labelType) {
        try {
            let result1: any;
            await this.maintainPrinterServices.getLinkedFunctionalities(appID, labelType).then((result) => {
                let res = result.json() as AtParWebApiResponse<MT_ATPAR_APP_LINKED_LABELS>;
                this.growlMessage = [];
                this.lstLinkedFunctionalities = [];
                result1 = res.StatType;
                switch (res.StatType) {
                    case StatusType.Success: {
                        // ViewState("dsListBox2") = _dsListBox2
                        this.lstLinkedFunctionalities = res.DataList;
                        for (var i = 0; i < this.lstLinkedFunctionalities.length; i++) {
                            this.lstLinkedFunctionalities[i].WIDTH_ID = 'txtWidth' + i;
                            this.lstLinkedFunctionalities[i].HEIGHT_ID = 'txtHeight' + i;
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }
            });
            if (result1 == StatusType.Success) {
                if (this.PrinterData.PRINTER_CODE == '' || this.PrinterData.PRINTER_CODE == undefined || this.PrinterData.PRINTER_CODE == 'Select One') {
                    this.PrinterData.PRINTER_CODE = '-1';
                }
                await this.bindModels(this.PrinterData.APP_ID, this.PrinterData.LABEL_TYPE, this.PrinterData.PRINTER_CODE);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getLinkedFunctionalities");
        }
    }

    async ddlModel_SelectedIndexChanged(selectedModel) {
       
        if (selectedModel != 'Select One') {
            this.showNewModel = false;
            this.showMultipleModel = false;
            this.showExistedImage = false;
            if (selectedModel == 'New Model') {
                //ViewState("ListBox1") =ddlFunctionality.SelectedValue;// this.PrinterData.LABEL_TYPE;

                if (this.lstLinkedFunctionalities.length > 0) {
                    this.showNewModel = false;
                    this.showMultipleModel = true;

                } else {

                    this.labelHeight = '';
                    this.labelWidth = '';
                    this.showNewModel = true;
                }
            }
            else {
                await this.bindModelImage(this.PrinterData.APP_ID, this.PrinterData.MODEL, this.PrinterData.LABEL_TYPE, this.PrinterData.PRINTER_CODE);
            }
        }
        else {
            this.selectedFile = '';
            if (this.lstLinkedFunctionalities != null && this.lstLinkedFunctionalities != undefined) {
                if (this.lstLinkedFunctionalities.length > 0) {
                    this.lstLinkedFunctionalities[0].file = null;
                }
            }
            this.showNewModel = false;
            this.showMultipleModel = false;
            this.showExistedImage = false;
        }
        this.buttonEnableDisable = this.dropDownValidations();
    }

    async bindModelImage(appID, model, labelType, printerCode) {
        try {
            await this.maintainPrinterServices.getModelImage(appID, model, labelType, printerCode).then((result) => {
                let res = result.json() as AtParWebApiResponse<MT_ATPAR_LABELS_DATA>;
                this.growlMessage = [];
                this.lstModelImages = [];
                this.showExistedImage = true;
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.lstModelImages = res.DataList;
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }
            })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModelImage");
        }
    }

    async bindModels(appID, labelType, printerCode) {
        try {
            await this.maintainPrinterServices.getModels(appID, labelType, printerCode).then((result) => {
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.lstModels = [];
                this.lstModelsData = [];
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.lstModelsData = res.DataList;
                        this.lstModels.push({ label: 'Select One', value: 'Select One' });
                        for (var i = 0; i < res.DataList.length; i++) {
                            this.lstModels.push({ label: res.DataList[i], value: res.DataList[i] })
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }
                this.lstModels.push({ label: 'New Model', value: 'New Model' });
            })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModels");
        }
    }

    bindPrinterType(selectedPModel) {
        try {
            var filterRow;
            for (var i = 0; i < this.lstPrinterModelsData.length; i++) {
                if (this.lstPrinterModelsData[i].CODE == selectedPModel) {
                    filterRow = this.lstPrinterModelsData[i];
                    break;
                }
            }
            this.lstPrinterTypes = [];
            this.lstPrinterTypes.push({ label: 'Select One', value: 'Select One' });
            if (filterRow != undefined) {
                if (filterRow.TYPE == 'Mobile') {
                    this.lstPrinterTypes.push({ label: 'Mobile', value: 'Mobile' });
                    this.lstPrinterTypes.push({ label: 'BlueTooth', value: 'BlueTooth' });
                }
                else {
                    this.lstPrinterTypes.push({ label: filterRow.TYPE, value: filterRow.TYPE });
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindPrinterType");
        }
    }

    async btnEditPrinter_Click(editPrinter) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Printer';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.showMainPage = false;
            this.Mode = 'Edit';
            this.editPrinterData = editPrinter;
            this.oldFriendlyName = editPrinter.FRIENDLY_NAME;
            this.PrinterData = editPrinter;
            this.focusdropdown = false;
            this.buttonEnableDisable = false;
            this.spinnerService.start();

            await this.getPrinterModels();

            await this.getFunctionalities(this.PrinterData.APP_ID);

            //getAppName(this.PrinterData.APP_ID)        No NEED

            await this.bindPrinterType(this.PrinterData.PRINTER_CODE);

            if (this.PrinterData.NETWORK_TYPE == 'BlueTooth') {
                this.showIPAddressRow = false;
            }
            else {
                this.showIPAddressRow = true;
                this.txtIPadd = 0;
            }
            this.txtFriendlyName = 0;
            this.txtPort = 0;

            await this.bindLinkFunctionalities(editPrinter.FUNCTIONALITY);

            await this.bindModels(editPrinter.APP_ID, editPrinter.LABEL_TYPE, editPrinter.PRINTER_CODE);

            await this.bindModelImage(editPrinter.APP_ID, editPrinter.MODEL, editPrinter.LABEL_TYPE, editPrinter.PRINTER_CODE);
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnEditPrinter_Click");
        }
    }

    async btnSave_Click() {
        try {
            this.growlMessage = [];
            if (this.PrinterData.MODEL == 'New Model') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Upload the Model' });
                return;
            }
            this.spinnerService.start();
            this.saveOrUpdateDetails();
            let result1: any;
            await this.maintainPrinterServices.savePrinterDetails(this.lstPrinterData).then((result) => {
                this.growlMessage = [];
                this.spinnerService.stop();
                let res = result.json() as AtParWebApiResponse<any>;
                result1 = res.StatType;
                switch (res.StatType) {
                    case StatusType.Success: {

                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Printer Friendly Name - ' + this.PrinterData.FRIENDLY_NAME + ' Created Successfully' });
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }
                this.atParConstant.scrollToTop();
            });
            if (result1 == StatusType.Success) {
                this.txtIPadd = null;
                this.txtPort = null;
                this.txtFriendlyName = null;
                this.PrinterData.APP_ID = 'Select One';
                this.PrinterData.PRINTER_CODE = 'Select One';
                this.PrinterData.NETWORK_TYPE = 'Select One';
                this.PrinterData.MODEL = 'Select One';
                this.PrinterData.IP_ADDRESS = '';
                this.PrinterData.PORT_NO = '';
                this.PrinterData.FRIENDLY_NAME = '';
                this.lstFunctionalities = [];
                this.lstFunctionalities.push({ label: 'Select One', value: 'Select One' });
                this.showExistedImage = false;
                this.lstModelImages = [];
                this.lstLinkedFunctionalities = [];
                this.buttonEnableDisable = this.dropDownValidations();
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "btnSave_Click");
        }
    }

    async btnUpdate_Click() {
        try {
            this.growlMessage = [];
            if (this.PrinterData.MODEL == 'New Model') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Upload the Model' });
                return;
            }
            this.blnCheckPrinterExists = false;
            if (this.PrinterData.FRIENDLY_NAME != undefined) {
                if (this.oldFriendlyName != this.PrinterData.FRIENDLY_NAME) {
                    this.blnCheckPrinterExists = true;
                }
                this.saveOrUpdateDetails();
                this.spinnerService.start();
                this.maintainPrinterServices.updatePrinterDetails(this.oldFriendlyName, this.blnCheckPrinterExists, this.lstPrinterData).then((result) => {
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    let res = result.json() as AtParWebApiResponse<any>;
                    switch (res.StatType) {

                        case StatusType.Success: {
                            // this.btnupdate = true;
                            //  this.btnGo_Click();

                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Printer Friendly Name - ' + this.PrinterData.FRIENDLY_NAME + ' Updated Successfully' });
                            break;
                        }
                        case StatusType.Warn: {
                            if (res.StatusCode == AtparStatusCodes.S_DATAEXISTS_INTABLE) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage.split("1%")[0] + " " + this.PrinterData.FRIENDLY_NAME + " " + res.StatusMessage.split("1%")[1] });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            }

                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }
                    this.atParConstant.scrollToTop();
                })
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "btnUpdate_Click");
        }
    }

    saveOrUpdateDetails() {
        try {
            this.lstPrinterData = [];
            this.PrinterData.STATUS = "1";
            this.PrinterData.UPDATE_DATE = new Date();
            this.PrinterData.USER_ID = this._deviceTokenEntry[TokenEntry_Enum.UserID];
            if (this.lstLinkedFunctionalities.length > 0) {
                for (var i = 0; i < this.lstLinkedFunctionalities.length; i++) {
                    this.PrinterData.LABEL_FILE_NAME = this.PrinterData.APP_ID + "_" + this.PrinterData.PRINTER_CODE + "_" + this.lstLinkedFunctionalities[i].LABEL_LNK_TYPE + "_" + this.PrinterData.MODEL;
                    this.PrinterData.LABEL_TYPE = this.lstLinkedFunctionalities[i].LABEL_TYPE;
                    this.PrinterData.LINKED_LABEL_TYPE = this.lstLinkedFunctionalities[i].LABEL_LNK_TYPE;
                    this.lstPrinterData.push(this.PrinterData);
                }
            }
            else {
                this.PrinterData.LABEL_FILE_NAME = this.PrinterData.APP_ID + "_" + this.PrinterData.PRINTER_CODE + "_" + this.PrinterData.LABEL_TYPE + "_" + this.PrinterData.MODEL;
                this.PrinterData.LABEL_TYPE = this.PrinterData.LABEL_TYPE;
                this.PrinterData.LINKED_LABEL_TYPE = 0;
                this.PrinterData.FRIENDLY_NAME = (this.PrinterData.FRIENDLY_NAME).trim();
                this.PrinterData.IP_ADDRESS = (this.PrinterData.IP_ADDRESS).trim();
                this.lstPrinterData.push(this.PrinterData);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "saveOrUpdateDetails");
        }
    }

    async updatePrinterStatus(appID, friendlyName, labelType, status) {
        try {
            this.spinnerService.start();
            await this.maintainPrinterServices.updatePrinterStatus(appID, friendlyName, labelType, status).then(result => {
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.spinnerService.stop();

                switch (res.StatType) {
                    case StatusType.Success: {
                        //this.btnGo_Click();
                        //this.refstatus = true;
                        if (this.selectedStatusValue.toString() == 'Active') {
                            this.lstPrinters = asEnumerable(this.lstPrinters).Where(x => x.ActiveStatus == true).ToArray();
                        }
                        else if (this.selectedStatusValue.toString() == 'InActive') {
                            this.lstPrinters = asEnumerable(this.lstPrinters).Where(x => x.ActiveStatus == false).ToArray();
                        }
                        else {
                            this.lstPrinters = this.lstPrinters;
                        }
                        if (status == 3) {
                            for (var i = 0; i < this.lstPrinters.length; i++) {
                                if (this.lstPrinters[i].APP_ID == appID && this.lstPrinters[i].FRIENDLY_NAME == friendlyName && this.lstPrinters[i].LABEL_TYPE == labelType) {
                                    var index = this.lstPrinters.indexOf(this.lstPrinters[i], 0)
                                    this.lstPrinters.splice(index, 1);
                                }
                            }
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Printer Friendly Name - ' + friendlyName + " Deleted Successfully" });
                        }
                        else {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Printer Friendly Name - ' + friendlyName + "  Status Updated Successfully" });

                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }
            })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "updatePrinterStatus");
        }
    }

    btnDeletePrinter_Click(item) {
        this.confirmationService.confirm({
            message: 'Do you want to delete the Printer ' + item.PRINTER_NAME,
            accept: () => {
                this.updatePrinterStatus(item.APP_ID, item.FRIENDLY_NAME, item.LABEL_TYPE, 3);
            }
        });
    }

    async  btnBack_Click() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showMainPage = true;
        this.lstPrinters = [];
        this.selectedApp = '';
        this.printerName = '';
        this.lstLinkedFunctionalities = [];
        this.lstFunctionalities = [];
        this.lstModels = [];
        this.lstPrinterModels = [];
        this.lstPrinterTypes = [];
        this.showExistedImage = false;
        this.grdstatus = false;
       // await this.btnGo_Click();
        this.growlMessage = [];

    }

    selectFile(event) {
        let fileList: FileList = event.target.files;
        this.lstFiles = fileList;
        this.selectedFile = event.target.files[0].name;
    }

    selectMultipleFiles(event, item: MT_ATPAR_APP_LINKED_LABELS) {
        let file: FileList = event.target.files;
        item.file = file;
        item.SELECTED_FILE = event.target.files[0].name;
    }

    async fileUpload() {
        this.strLvx = "B";
        this.strPnl = "A";
        this.getModels = 'M' + (this.lstModelsData.length + 1);
        this.goNext = true;
        this.growlMessage = [];
        //if (this.Mode == 'Edit') {
        //    //InsertNewModels;
        //}
        if (this.PrinterData.PRINTER_CODE == '' || this.PrinterData.PRINTER_CODE == undefined || this.PrinterData.PRINTER_CODE == 'Select One') {
            this.PrinterData.PRINTER_CODE = '-1';
        }
        let formData: FormData = new FormData();
        let devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        let myConsystem: string;
        let userID: string;
        if (devicetoken != null) {
            myConsystem = devicetoken[TokenEntry_Enum.SystemId].toString();
            userID = devicetoken[TokenEntry_Enum.UserID].toString();
        }
        if (this.lstLinkedFunctionalities.length > 0) {
            this.lstFiles = [];
            for (var i = 0; i < this.lstLinkedFunctionalities.length; i++) {
                if (this.lstLinkedFunctionalities[i].file == undefined || this.lstLinkedFunctionalities[i].LABEL_Height == '' ||
                    this.lstLinkedFunctionalities[i].LABEL_WIDTH == '' || this.lstLinkedFunctionalities[i].LABEL_Height == undefined ||
                    this.lstLinkedFunctionalities[i].LABEL_WIDTH == undefined) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter the Label Size/Upload file' });
                    this.goNext = false;
                    break;
                }
                else {

                    formData.append('uploadFile', this.lstLinkedFunctionalities[i].file[0]);
                    formData.append('width', this.lstLinkedFunctionalities[i].LABEL_WIDTH);
                    formData.append('height', this.lstLinkedFunctionalities[i].LABEL_Height);
                    formData.append('labelLinkType', this.lstLinkedFunctionalities[i].LABEL_LNK_TYPE.toString());
                }

            }
            if (this.goNext) {
                try {
                    let headers = new Headers();
                    headers.append('Authorization', 'bearer');
                    headers.append('enctype', 'multipart/form-data');
                    let options = new RequestOptions({ headers: headers });
                    let apiUrl = this.httpService.BaseUrl + "/api/MaintainPrinter/UploadMultipleFiles?_strLvx=" + this.strLvx + "&_strPnl=" + this.strPnl + "&getModels=" + this.getModels
                        + "&appID=" + this.PrinterData.APP_ID + "&printerCode=" + this.PrinterData.PRINTER_CODE + "&functionality=" + this.PrinterData.LABEL_TYPE + "&userID=" + this._deviceTokenEntry[TokenEntry_Enum.UserID]
                        + "&conSystemID=" + myConsystem + "&UserId=" + userID;
                    this.spinnerService.start();
                    await this.http.post(apiUrl, formData, options)
                        .catch(error => Observable.throw(error))
                        .subscribe(
                        (result) => {
                            let res = result.json() as AtParWebApiResponse<any>;
                            this.spinnerService.stop();

                            switch (res.StatType) {
                                case StatusType.Success: {
                                    this.resetDropdowns(res.StatType);
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                    break;
                                }
                                case StatusType.Error: {
                                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                    break;
                                }
                            }

                            for (var i = 0; i < this.lstLinkedFunctionalities.length; i++) {
                                this.lstLinkedFunctionalities[i].SELECTED_FILE = '';
                            }


                        },
                        error => console.log(error)
                        );
                } catch (ex) {
                    this.clientErrorMsg(ex, "fileUpload");
                }
            }
        }
        else {
            if (this.labelWidth == undefined || this.labelWidth == '' || this.labelHeight == '' || this.labelHeight == undefined || this.lstFiles.length == 0) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter the Label Size/Upload file' });
            } else {
                if (this.lstFiles.length > 0) {
                    try {
                        let file: File = this.lstFiles[0];
                        formData.append('uploadFile', file, file.name);

                        let headers = new Headers();
                        headers.append('Authorization', 'bearer');
                        headers.append('enctype', 'multipart/form-data');
                        let options = new RequestOptions({ headers: headers });
                        let apiUrl = this.httpService.BaseUrl + "/api/MaintainPrinter/UploadSingleFile?_strLvx=" + this.strLvx + "&_strPnl=" + this.strPnl + "&getModels=" + this.getModels + "&labelWidth=" + this.labelWidth
                            + "&labelHeight=" + this.labelHeight + "&appID=" + this.PrinterData.APP_ID + "&printerCode=" + this.PrinterData.PRINTER_CODE + "&functionality=" + this.PrinterData.LABEL_TYPE + "&userID=" + this._deviceTokenEntry[TokenEntry_Enum.UserID]
                            + "&conSystemID=" + myConsystem + "&UserId=" + userID;
                        this.spinnerService.start();
                        await this.http.post(apiUrl, formData, options)
                            .catch(error => Observable.throw(error))
                            .subscribe(
                            (result) => {
                                let res = result.json() as AtParWebApiResponse<any>;
                                this.spinnerService.stop();
                                switch (res.StatType) {
                                    case StatusType.Success: {
                                        this.resetDropdowns(res.StatType);
                                        break;
                                    }
                                    case StatusType.Warn: {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case StatusType.Error: {
                                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case StatusType.Custom: {
                                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                                this.selectedFile = '';
                            },
                            error => console.log(error)

                            );
                    } catch (ex) {
                        this.clientErrorMsg(ex, "fileUpload");
                    }
                }
            }
        }
    }

    async resetDropdowns(status) {
        try {
            if (this.Mode != 'Edit') {
                this.PrinterData.LABEL_TYPE = this.PrinterData.LABEL_TYPE;
                var e = ({ 'label': this.PrinterData.FUNCTIONALITY });
                await this.ddlFunctionality_SelectedIndexChanged(e);
                this.PrinterData.MODEL = this.getModels;
                await this.ddlModel_SelectedIndexChanged(this.PrinterData.MODEL);
            } else {
                await this.getFunctionalities(this.PrinterData.APP_ID);
                await this.bindModels(this.PrinterData.APP_ID, this.PrinterData.LABEL_TYPE, this.PrinterData.PRINTER_CODE);
                this.PrinterData.MODEL = this.getModels;
                await this.bindModelImage(this.PrinterData.APP_ID, this.getModels, this.PrinterData.LABEL_TYPE, this.PrinterData.PRINTER_CODE);
                this.showMultipleModel = false;
                this.showNewModel = false;
                this.buttonEnableDisable = this.dropDownValidations();
            }
            if (status = StatusType.Success) {
                await this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'File Uploaded successfully' });
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "resetDropdowns");
        }
    }

    bindModelDataChange(event: any) {
        if ("IPadd" == event.TextBoxID.toString()) {
            this.txtIPadd = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Port" == event.TextBoxID.toString()) {
            this.txtPort = event.validationrules.filter(x => x.status == false).length;
        }
        if ("FriendlyName" == event.TextBoxID.toString()) {
            this.txtFriendlyName = event.validationrules.filter(x => x.status == false).length;
        }
        this.textBoxValidation();
    }

    textBoxValidation() {
        if (this.showNewModel || this.showMultipleModel) {
            this.buttonEnableDisable = true;
        }
        else {
            if (this.showIPAddressRow && this.txtIPadd == 0 && this.txtPort == 0 && this.txtFriendlyName == 0 && this.PrinterData.FRIENDLY_NAME.trim() != '' && this.PrinterData.IP_ADDRESS.trim() != '') {

                this.buttonEnableDisable = this.dropDownValidations();
            }
            else if (!this.showIPAddressRow && this.txtPort == 0 && this.txtFriendlyName == 0 && this.PrinterData.FRIENDLY_NAME.trim() != '') {
                this.buttonEnableDisable = this.dropDownValidations();
            }
            else {
                this.buttonEnableDisable = true;
            }
        }
    }

    dropDownValidations() {
        if ((this.PrinterData.APP_ID == 'Select One' || this.PrinterData.APP_ID == undefined || this.PrinterData.APP_ID == "")) {
            return true;
        }
        if (this.PrinterData.PRINTER_CODE == 'Select One' || this.PrinterData.PRINTER_CODE == undefined || this.PrinterData.PRINTER_CODE == "") {
            return true;
        }
        if (this.PrinterData.NETWORK_TYPE == 'Select One' || this.PrinterData.NETWORK_TYPE == undefined || this.PrinterData.NETWORK_TYPE == "") {
            return true;
        }
        if (this.PrinterData.LABEL_TYPE == 'Select One' || this.PrinterData.LABEL_TYPE == undefined || this.PrinterData.LABEL_TYPE == 0) {
            return true;
        }
        if (this.PrinterData.MODEL == 'Select One' || this.PrinterData.MODEL == undefined || this.PrinterData.MODEL == "") {
            return true;
        }
        if (this.showNewModel || this.showMultipleModel) {
            return true;
        }
        else {
            if (this.showIPAddressRow && this.txtIPadd == 0 && this.txtPort == 0 && this.txtFriendlyName == 0 && this.PrinterData.FRIENDLY_NAME.trim() != '' && this.PrinterData.IP_ADDRESS.trim() != '') {
                return false;
            }
            else if (!this.showIPAddressRow && this.txtPort == 0 && this.txtFriendlyName == 0 && this.PrinterData.FRIENDLY_NAME.trim() != '') {
                return false;
            }
            else {
                return true;
            }
        }
    }

    txtLabels_Keyup(e, lstLinkLabels) {
        try {
            if (e.target.value == '') {
                this.buttonEnableDisable = true;
            }
            else {
                for (var i = 0; i < lstLinkLabels.length; i++) {
                    if (lstLinkLabels[i].LABEL_WIDTH == undefined || lstLinkLabels[i].LABEL_WIDTH == null || lstLinkLabels[i].LABEL_WIDTH == ''
                        || lstLinkLabels[i].LABEL_Height == undefined || lstLinkLabels[i].LABEL_Height == null || lstLinkLabels[i].LABEL_Height == '') {
                        this.buttonEnableDisable = true;
                        break;
                    } else {
                        this.buttonEnableDisable = false;
                        this.buttonEnableDisable = this.dropDownValidations();
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "txtLabels_Keyup");
        }
    }

    ddlStatusOnchange(evtdata, filed, filterMatchMode) {
        try {
            //asEnumerable(this.lstGridHdrData).Where(x => x.VENDOR_ID == this.lstGridDtlsData[i].VENDOR_ID && x.TRANSACTION_ID == this.lstGridDtlsData[i].TRANSACTION_ID && x.DEPARTMENT_ID == this.lstGridDtlsData[i].DEPARTMENT_ID).FirstOrDefault();
            this.selectedStatusValue = evtdata;
            if (evtdata.toString() == 'Active') {
                this.lstPrinters = asEnumerable(this.lstFilterPrinters).Where(x => x.ActiveStatus == true).ToArray();
            }
            else if (evtdata.toString() == 'InActive') {
                this.lstPrinters = asEnumerable(this.lstFilterPrinters).Where(x => x.ActiveStatus == false).ToArray();
            }
            else {
                this.lstPrinters = this.lstFilterPrinters;
            }
            
        }
        catch (ex){
            this.clientErrorMsg(ex, "ddlStatusOnchange");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.PrinterData = null;
        this.lstAppsData = null;
        this.lstFunctionalities = null;
        this.lstFunctionalitiesData = null;
        this.lstLinkedFunctionalities = null;
        this.lstModelImages = null;
        this.lstModels = null;
        this.labelHeight = '';
        this.labelWidth = '';
        this.lstPrinterData = [];
        this.lstPrinterModels = [];
        this.lstPrinterModelsData = [];
        this.lstPrinters = [];
        this.lstPrinterTypes = [];
        this.printerName = '';
        this.selectedApp = '';
        this.ven = null
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
    }
}