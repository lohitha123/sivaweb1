import { NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Message, SelectItem } from './../components/common/api';
import { StatusType, TokenEntry_Enum, ModeEnum, YesNo_Enum, EnumApps, AppParameters_Enum } from './../Shared/AtParEnums';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { AtParConstants } from '../Shared/AtParConstants';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { ConfirmationService } from '../components/common/api';
import { AtparStatusCodes } from './../Shared/AtParStatusCodes'
import { MT_POU_CASE_CART_HEADER } from './../entities/mt_pou_case_cart_header';
import { MT_POU_PHYSICIAN } from './../entities/mt_pou_physician';
import { MT_POU_PREF_LIST_HEADER } from './../entities/mt_pou_pref_list_header';
import { POUSetupCaseService } from './pou-setup-case.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { Menus } from '../AtPar/Menus/routepath';
declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'pou-setup-case.component.html',
    providers: [datatableservice, ConfirmationService, AtParConstants, AtParCommonService, POUSetupCaseService]
})

export class SetupCaseComponent {
    searchFrom: boolean = true;
    showGrid: boolean = false;
    addFrom: boolean = false;
    deviceIDStatus: number;
    deviceTokenEntry: string[] = [];
    intAppId: number;
    growlMessage: Message[] = [];
    searchPhysicianNgModel: string = " ";
    searchProcedureCodeNgModel: string = " ";
    pageSize: number;
    mode: string;
    deleteMode: string;
    caseIDNgModel: string = "";
    caseDescNgModel: string = "";
    physicianddlNgModel: string = "";
    patientIDNgModel: string = "";
    roomNoNgModel: string = "";
    preferenceCardNgModel: string = "";
    procedureCodeNgModel: string = "";;
    statusTypeNgModel: string = "";
    lstGridData: MT_POU_CASE_CART_HEADER[];
    ddlProcedure: SelectItem[] = [];
    ddlPreferencess: SelectItem[] = [];
    saveButton: boolean = true;

    setupCaseCount: any;
    isDuplicateExists: boolean = false;
    ddlStatusType: any;
    ddlPhysician: SelectItem[] = [];
    preferencessData: MT_POU_PREF_LIST_HEADER[];
    setupCaseDate: any = new Date();
    convertDate: string;
    caseIDValidation: number;
    caseDescValidation: number;
    patientValidation: number;
    roomNoValidation: number;
    orgGrpParamName: any;
    noRecord: boolean;
    isDisabled: boolean = false;
    breadCrumbMenu: Menus;

    statusValidations: number;
    constructor(public dataservice: datatableservice, private httpService: HttpService, private pouSetupCaseService: POUSetupCaseService,
        private commonService: AtParCommonService,
        private spinnerService: SpinnerService, private confirmationService: ConfirmationService, private atParConstant: AtParConstants) {
        this.breadCrumbMenu = new Menus();
    }

    async ngOnInit() {
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.spinnerService.stop();
            await this.commonService.getOrgGroupParamValue("CASE_PICK_INTERFACE", EnumApps.PointOfUse, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then((res:Response) => {
                    let response = res.json() as AtParWebApiResponse<string>;

                    this.orgGrpParamName = response.DataVariable;
                    if (this.orgGrpParamName == "HeadersandDetails") {
                        this.isDisabled = true;

                    } else {
                        this.isDisabled = false;
                    }
                });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    async addSetupCase() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Setup Case';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

        this.spinnerService.start();
       
        this.spinnerService.stop();
        this.growlMessage = [];
        this.searchFrom = false;
        this.showGrid = false;
        this.mode = "Add";
        this.addFrom = true;
        this.ddlProcedure = [];
        this.ddlProcedure.push({ label: "Select Procedure", value: "" });
        this.procedureCodeNgModel = "Select Procedure";
        this.ddlPreferencess = [];
        this.ddlPreferencess.push({ label: "Select Preference", value: "" });
        this.preferenceCardNgModel = "Select Preference";
        this.saveButton = true;
        this.setupCaseDate = null;
        await this.ddlpopulatePhysician();
        await this.ddlPreferncess();

        this.physicianddlNgModel = "Select Physician";
        this.ddlStatusType = [];
        this.ddlStatusType.push({ label: "Select Status", value: "" });
        this.ddlStatusType.push({ label: 'OPEN', value: 1 });
        this.ddlStatusType.push({ label: 'PENDING', value: 2 });
        let changeDate = new Date();
        var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
        var date = new Date(dateStr);
        this.setupCaseDate = date.toLocaleDateString().replace(',', ' ');
        this.statusTypeNgModel = "Select Status"
        this.searchPhysicianNgModel = "";
        this.searchProcedureCodeNgModel = "";


    }

    async btn_go() {
        this.mode = " ";
        this.growlMessage = [];
        this.showGrid = false;
        await this.BindGrid();
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.addFrom = false;
        this.showGrid = false;
        this.searchFrom = true;

        this.caseIDNgModel = "";
        this.caseDescNgModel = "";

        this.patientIDNgModel = "";
        this.roomNoNgModel = "";
        this.procedureCodeNgModel = "Select Procedure";
        this.statusTypeNgModel = "Select Status";
        this.preferenceCardNgModel = "Select Preference";
        this.physicianddlNgModel = "Select Physician";
        this.growlMessage = [];
        this.setupCaseDate = null;
    }

    async BindGrid() {
        try {
            this.lstGridData = [];
            this.spinnerService.start();
            await this.pouSetupCaseService.getCaseInfo(this.searchPhysicianNgModel.trim(),
                this.searchProcedureCodeNgModel.trim(), this.deviceTokenEntry)
                .catch(this.httpService.handleError).then(async (res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_CASE_CART_HEADER>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            
                            let casedata = res.json().DataList;
                            if (casedata.length >= 0) {
                                this.lstGridData = casedata;
                                this.lstGridData = this.lstGridData.reverse();
                                //  this.lstGridData = this.lstGridData.sort(x => x.CASE_ID);
                                this.showGrid = true;
                                let count = casedata.length;
                                this.setupCaseCount = count;
                                this.setupCaseCount = this.setupCaseCount + " Case(s) Found"
                                if (this.mode == "Add") {
                                    
                                    if (this.lstGridData != null) {
                                        

                                        var selRows = this.lstGridData.filter(x => x.CASE_ID == this.caseIDNgModel && x.PREF_LIST_ID ==
                                            this.preferenceCardNgModel && x.PROCEDURE_ID == this.procedureCodeNgModel);
                                        if (selRows.length > 0) {
                                            
                                            this.isDuplicateExists = true;
                                        }
                                    }
                                    this.showGrid = false;
                                }

                            }
                            else {
                                this.showGrid = false;
                            }
                        }
                            break;
                        case StatusType.Warn: {
                            this.showGrid = false;
                            if (this.deleteMode == "delete") {
                                this.deleteMode = "";
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            this.deleteMode = "";
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
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

    confirmDelete(setupCase) {
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete this case?',
                accept: () => {
                    this.DeleteCaseID(setupCase);
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async DeleteCaseID(setupCase) {
        this.spinnerService.start();
        try {

            this.pouSetupCaseService.deleteCaseID(setupCase.CASE_ID, setupCase.PREF_LIST_ID, setupCase.PROCEDURE_ID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_CASE_CART_HEADER>;
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {

                            //  let statusMessage = AtParConstants.Deleted_Msg.replace("1%", "Procedure").replace("2%",);
                            let statusMessage = AtParConstants.Deleted_Msg.replace("1%", "Case").replace("2%", setupCase.CASE_ID)
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                            //this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: " delete Sucessfully" });
                            this.deleteMode = "delete";
                            this.BindGrid();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.showGrid = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
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

    async ddlpopulatePhysician() {
        try {
            this.spinnerService.start();
            await this.commonService.getPhysicians().
                catch(this.httpService.handleError).then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<MT_POU_PHYSICIAN>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddlPhysician = [];
                            this.ddlPhysician.push({ label: "Select Physician", value: "" });
                            if (data.DataList.length > 0) {
                                for (var i = 0; i <= data.DataList.length - 1; i++) {
                                    this.ddlPhysician.push({ label: data.DataList[i].PHYSICIAN_ID + "-" + data.DataList[i].FIRST_NAME + " " + data.DataList[i].MIDDLE_INITIAL + " " + data.DataList[i].LAST_NAME + "(" + data.DataList[i].PHYSICIAN_ID + ")", value: data.DataList[i].PHYSICIAN_ID });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            // this.growlMessage = [];
                            // this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            // this.growlMessage = [];
                            // this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            // this.growlMessage = [];
                            // this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
            this.spinnerService.stop();
        }
    }

    async ddlPreferncess() {
        try {
            this.spinnerService.start();
            await this.pouSetupCaseService.getPreferenceListIDs(this.deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<MT_POU_PREF_LIST_HEADER>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddlPreferencess = [];
                            this.ddlPreferencess.push({ label: "Select Preference", value: "" });
                            if (data.DataList.length > 0) {
                                this.preferencessData = data.DataList;
                                for (var i = 0; i <= data.DataList.length - 1; i++) {
                                    this.ddlPreferencess.push({ label: data.DataList[i].PREF_LIST_ID + "-" + data.DataList[i].PREF_LIST_DESCR, value: data.DataList[i].PREF_LIST_ID });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            //  this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                });
            this.spinnerService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async addCaseDetails() {
        try {

            await this.BindGrid();

            if (this.isDuplicateExists) {
                this.growlMessage = [];
                let statusMessage = AtParConstants.AlreadyExist_Msg.replace("1%", "Case").replace("2%", this.caseIDNgModel)
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: statusMessage });
                this.isDuplicateExists = false;
                this.saveButton = false;
                return;
            }
            else {

                await this.addCaseInfo();
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    async  addCaseInfo() {
        try {
            if (this.setupCaseDate != null) {

                this.growlMessage = [];
                var todayDate = new Date(); //Today Date
                var expDate = new Date(this.setupCaseDate);
                if (expDate < todayDate) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Date must be greater than or equal to today's date" });
                    return;
                }

                else {
                    this.convertDate = this.convert(this.setupCaseDate);
                    this.growlMessage = [];
                    this.spinnerService.start();
                    await this.pouSetupCaseService.addCaseInfo(this.caseIDNgModel.trim(), this.caseDescNgModel.trim(), this.physicianddlNgModel,
                        this.patientIDNgModel.trim(), this.preferenceCardNgModel, this.procedureCodeNgModel, this.convertDate,
                        this.deviceTokenEntry[TokenEntry_Enum.UserID], this.roomNoNgModel.trim(), this.statusTypeNgModel).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let response = res.json() as AtParWebApiResponse<MT_POU_CASE_CART_HEADER>;
                            this.spinnerService.stop();
                            switch (response.StatType) {
                                case StatusType.Success: {
                                    let statusMessage = AtParConstants.Created_Msg.replace("1%", "Case").replace("2%", this.caseIDNgModel)
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                    this.caseIDNgModel = "";
                                    this.caseDescNgModel = "";
                                    this.patientIDNgModel = "";
                                    this.roomNoNgModel = "";
                                    this.procedureCodeNgModel = "Select Procedure";
                                    this.statusTypeNgModel = "Select Status";
                                    this.preferenceCardNgModel = "Select Preference";
                                    this.physicianddlNgModel = "Select Physician";
                                    this.setupCaseDate = null;
                                    this.saveButton = true;
                                    break;
                                }
                                case StatusType.Warn: {
                                    

                                    if (response.StatusCode == AtparStatusCodes.S_POU_CASE_ALREADY_EXISTS) {
                                        this.growlMessage = [];
                                        let statusMessage = AtParConstants.AlreadyExist_Msg.replace("1%", "Case").replace("2%", this.caseIDNgModel)
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                    } else {
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    }
                                    break;
                                }
                                case StatusType.Error: {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    break;
                                }
                            }
                            this.atParConstant.scrollToTop();
                        });

                    this.spinnerService.stop();
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
            this.spinnerService.stop();
        }
    }

    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }
    ddlPhysicianIdChanged() {
        this.buttonEnableDisableValidations();
    }

    Validate() {
        this.buttonEnableDisableValidations();
    }
    async ddlPreferencesIdChanged(event) {
        this.buttonEnableDisableValidations();
        let processcode: MT_POU_PREF_LIST_HEADER[];
        this.showGrid = false;
        if (this.preferenceCardNgModel != "") {
            processcode = this.preferencessData.filter(x => x.PREF_LIST_ID == this.preferenceCardNgModel);
            {
                this.ddlProcedure = [];
                this.ddlProcedure.push({ label: "Select Procedure", value: "" });
                if (processcode.length > 0) {
                    for (var i = 0; i <= processcode.length - 1; i++) {
                        this.ddlProcedure.push({ label: processcode[i].PROCEDURE_ID, value: processcode[i].PROCEDURE_ID })
                    }
                }
                else {
                    this.procedureCodeNgModel = "";
                    this.saveButton = true;

                }
            }

        }
        else {
            this.ddlProcedure = [];
            this.ddlProcedure.push({ label: "Select Procedure", value: "" });
            this.procedureCodeNgModel = "";
            this.saveButton = true;

        }
    }

    ddlProcedureCodeChanged() {
        this.buttonEnableDisableValidations();
    }

    ddlStatusChanged() {
        this.buttonEnableDisableValidations();
    }

    async buttonEnableDisableValidations() {
        if (this.mode == ModeEnum[ModeEnum.Add].toString()) {
            if (this.caseIDNgModel.trim() != "" &&
                this.caseDescNgModel.trim() != "" &&
                this.patientIDNgModel.trim() != "" &&
                this.roomNoNgModel.trim() != "" &&
                this.setupCaseDate != null &&
                (this.physicianddlNgModel != "Select Physician" && this.physicianddlNgModel != "") &&
                (this.statusTypeNgModel != "Select Status" && this.statusTypeNgModel != "")
                && (this.preferenceCardNgModel != "Select Preference" && this.preferenceCardNgModel != "") &&
                (this.procedureCodeNgModel != "Select Procedure" && this.procedureCodeNgModel != "")) {
                this.saveButton = false;
            }
            else {
                this.saveButton = true;
            }
        }
        return this.saveButton;
    }

    async bindModelDataChange(event: any) {
        try {
            if ("CaseId" == event.TextBoxID.toString()) {
                this.caseIDValidation = event.validationrules.filter(x => x.status == false).length;
            }
            if ("caseDescription" == event.TextBoxID.toString()) {
                this.caseDescValidation = event.validationrules.filter(x => x.status == false).length;
            }
            if ("patientID" == event.TextBoxID.toString()) {
                this.patientValidation = event.validationrules.filter(x => x.status == false).length;
            }
            if ("roomNo" == event.TextBoxID.toString()) {
                this.roomNoValidation = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.mode == ModeEnum[ModeEnum.Add].toString()) {
                if (this.caseIDValidation == 0 && this.caseDescValidation == 0 &&
                    this.patientValidation == 0 && this.roomNoValidation == 0) {
                    this.saveButton = await this.buttonEnableDisableValidations();
                } else {
                    this.saveButton = true;
                }


            }
            else {
                this.saveButton = true;
            }
        }

        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.showGrid = null;
        this.spinnerService.stop();
        this.pageSize = null;
        this.deviceIDStatus = null;
        this.mode = null;
        this.addFrom = null;
        this.searchFrom = null;
        this.intAppId = null;
        this.setupCaseCount = null;
        this.searchPhysicianNgModel = null;
        this.searchProcedureCodeNgModel = null;
        this.caseIDNgModel = null;
        this.caseDescNgModel = null;
        this.physicianddlNgModel = null;
        this.patientIDNgModel = null;
        this.roomNoNgModel = null;
        this.preferenceCardNgModel = null;
        this.procedureCodeNgModel = null;
        this.lstGridData = null;
        this.ddlPhysician = null;
        this.ddlProcedure = null;
        this.ddlPreferencess = null;
        this.saveButton = null;
        this.setupCaseCount = null
        this.isDuplicateExists = null;
        this.caseIDValidation = null;
        this.caseDescValidation = null;
        this.patientValidation = null;
        this.roomNoValidation = null;
        this.statusValidations = null;
        this.deleteMode = null;
    }

}