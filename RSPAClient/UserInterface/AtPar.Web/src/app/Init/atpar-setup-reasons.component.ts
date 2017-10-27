import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MT_POU_REASON_CODE } from '../Entities/MT_POU_REASON_CODE';
import { SetupReasonsServices } from '../../app/Init/atpar-setup-reasons.services';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { HttpService } from '../Shared/HttpService';
import { AtParConstants } from '../Shared/AtParConstants';
import { TokenEntry_Enum, StatusType, ModeEnum, EnumApps } from '../Shared/AtParEnums';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from '../components/common/api';
import { ConfirmationService } from '../components/common/api';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
declare var module: {
    id: string;
}
@Component({
  
    selector: 'atpar-setup-reasons',
    templateUrl: 'atpar-setup-reasons.component.html',
    providers: [SetupReasonsServices, ConfirmationService, HttpService, AtParConstants]
})

export class SetupReasonsComponent implements OnInit {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    /*Varaible Declaration*/
    @Input() appId: string;
    intAppId: number;
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    lstReasonsCode: MT_POU_REASON_CODE[];
    txtReasonCode: string = "";
    txtDesc: string = "";
    txtNewReasonCode: string = "";
    mode: string;
    txtNewDesc: string = "";
    lblReasonCode: string = "";
    txtUpDesc: string = "";
    strReasonCode: string = "reasons";
    noOfReasonCodesMessage: string = "";
    pageTitle: string;
    strCode: string;
    strDescr: string;
    isVisible: boolean = false;
    page: boolean = true;
    addForm: boolean = false;
    editForm: boolean = false;
    loading: boolean = false;
    recordsPerPageSize: number;
    statusCode: number = -1;
    reasonCodeStatus: number = 0;
    modeDelete: boolean = false;
    newDescStatus: number = 0;
    newUpDescStatus: number = 0;
    breadCrumbMenu: Menus;
    /**
     * Constructor
     * @param SetupReasonsServices 
     * @param ConfirmationService
     * @param httpService
     * @param spinnerService
     * @param atParConstant
     */
    constructor(private spinnerService: SpinnerService,       
        private setupReasonsServices: SetupReasonsServices,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private confirmationService: ConfirmationService) {
        this.breadCrumbMenu = new Menus();
    }

    /**
    * Init Function for getting all the ReasonCodse data  when page load 
    */
    async  ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.intAppId = parseInt(this.appId);
        if (this.intAppId == EnumApps.PointOfUse) {
            this.pageTitle = "Point of Use > Setup Reasons ";
        }
        else { this.pageTitle = "AtPaRx > Setup Reasons "; }
    }

    /**
     * Getting data from database and bind records to data table
     */
    async bindDataGrid() {       
        this.growlMessage = [];
        this.noOfReasonCodesMessage = "";
        try {
            this.spinnerService.start();
            await this.setupReasonsServices.getCodes(this.strReasonCode, this.txtReasonCode, this.txtDesc).catch(this.httpService.handleError)
                .then((response: Response) => {
                    let data = response.json() as AtParWebApiResponse<MT_POU_REASON_CODE>;
                    this.lstReasonsCode = response.json().DataList;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.page = true;
                            if (this.lstReasonsCode.length > 0) {
                                this.noOfReasonCodesMessage = this.lstReasonsCode.length + " reason code(s) found";
                                this.isVisible = true;
                                break;
                            }
                        }
                        case StatusType.Warn: {
                            if (this.modeDelete == true) {
                                this.isVisible = false;
                                this.modeDelete = false;
                                break;
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                this.isVisible = false;
                                break;
                            }
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.isVisible = false;
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
            this.clientErrorMsg(ex,"bindDataGrid");
        }
        finally {        
            this.spinnerService.stop();
        }
    }

    /**
    * this method is calling when click on Go button 
    */
    async  btn_GetReasonCodes() {
        this.isVisible = false;
        await this.bindDataGrid();
    }

    /**
    * Save Button Enable & Disabled
    * @param event
    */
    bindModelDataChange(event: any) {
        try {
            if (this.mode == ModeEnum[ModeEnum.Add].toString()) {
                if ("txtNewReasonCode" == event.TextBoxID.toString()) {
                    this.reasonCodeStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("txtNewDesc" == event.TextBoxID.toString()) {
                    this.newDescStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if (this.reasonCodeStatus >= 1 || this.reasonCodeStatus == undefined || this.newDescStatus >= 1 || this.newDescStatus == undefined) {
                    this.loading = true;
                }
                else {
                    if (this.txtNewReasonCode == undefined || this.txtNewReasonCode == "") {
                        this.loading = true;
                    }
                    else {
                        this.loading = false;
                    }
                }
            }           

            if (this.mode == ModeEnum[ModeEnum.Edit].toString()) {
                if ("txtUpDesc" == event.TextBoxID.toString()) {
                    this.newUpDescStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if (this.newUpDescStatus == undefined || this.newUpDescStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }

            }

        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg,"bindModelDataChange");
        }
    }

    /**
    * this method is calling when click on Add button and display Create form 
    */
    add() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Reason';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.txtNewReasonCode = "";
        this.txtNewDesc = "";
        this.growlMessage = [];
        this.addForm = true;
        this.editForm = false;
        this.mode = ModeEnum[ModeEnum.Add].toString();
        this.page = false;
        this.isVisible = false;
        this.loading = true;
        this.reasonCodeStatus = undefined;
    }

    /**
    * this method is calling when click on Save button in CreateForm
    */
    async   btn_SaveReasonCode($event) {
        this.growlMessage = [];
        this.txtReasonCode = "";
        this.txtDesc = "";
        try {
            this.spinnerService.start();
            await this.setupReasonsServices.addCodes(this.strReasonCode, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.txtNewReasonCode, this.txtNewDesc, "").
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_POU_REASON_CODE>;
                    this.statusCode = response.StatusCode;
                    this.spinnerService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            let statusmsg = AtParConstants.Created_Msg.replace("1%", "Reason Code").replace("2%", this.txtNewReasonCode);
                            this.growlMessage.push({
                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg
                            });
                            this.txtNewReasonCode = "";
                            this.txtNewDesc = "";
                            this.loading = true;
                            document.getElementById("txtNewReasonCode").focus();                           
                            break;
                        }
                        case StatusType.Warn: {
                            if (response.StatusCode == AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage + this.txtNewReasonCode });
                                break;
                            }
                        }
                        case StatusType.Error: {
                            if (response.StatusCode == AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL) {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Reason Code" + " " + this.txtNewReasonCode + " Already Exists "
                                });
                                break;
                            }
                            else {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex,"btn_SaveReasonCode");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
    * this method is calling when click on edit button in Datatable
    */
    edit(setupReason) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Reason';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.editForm = true;
        this.addForm = false;
        this.page = false;
        this.loading = false;
        this.isVisible = false;     
        this.lblReasonCode = setupReason.CODE;
        this.txtUpDesc = setupReason.DESCRIPTION;
        this.mode = ModeEnum[ModeEnum.Edit].toString();
    }

    /**
  * this method is calling when click on Save button in editForm
  */
    async btn_UpdateReasonCode($event) {
        this.growlMessage = [];
        this.txtReasonCode = "";
        this.txtDesc = "";
        try {
            this.spinnerService.start();
            await this.setupReasonsServices.updateCodes(this.strReasonCode, this.lblReasonCode, this.txtUpDesc, "")
                .catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_POU_REASON_CODE>;
                    this.statusCode = response.StatusCode;
                    this.spinnerService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            let statusmsg = AtParConstants.Updated_Msg.replace("1%", "Reason Code").replace("2%", this.lblReasonCode);
                            this.growlMessage.push({
                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg
                            });
                            (<HTMLInputElement>document.getElementById('txtUpDesc')).focus();
                            break;
                        }
                        case StatusType.Warn: {
                            if (response.StatusCode == AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage + this.lblReasonCode });
                                break;
                            }
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex,"btn_UpdateReasonCode");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    confirmDelete(setupReason) {
        try {
            this.growlMessage = [];
                this.confirmationService.confirm({
                message: 'Are you sure you want to delete this Reason Code ' + setupReason.CODE +'?',
                accept: () =>
                { this.btn_Delete(setupReason); }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex,"confirmDelete");
        }
    }

    /**
  * this method is calling when click on Delete button in Datatable
  */
    async btn_Delete(setupReason) {
        this.growlMessage = [];
        this.strCode = setupReason.CODE;
        this.strDescr = setupReason.DESCRIPTION;
        this.txtReasonCode = "";
        this.txtDesc = "";
        try {
            this.spinnerService.start();
            await this.setupReasonsServices.deleteCodes(this.strReasonCode, this.strCode, this.strDescr).catch(this.httpService.handleError)
                .then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_POU_REASON_CODE>;
                    this.statusCode = response.StatusCode;
                    this.spinnerService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.modeDelete = true;
                            this.isVisible = true;                         
                            this.bindDataGrid();
                            let statusmsg = AtParConstants.Deleted_Msg.replace("1%", "Reason Code").replace("2%", this.strCode);
                            this.growlMessage.push({
                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg
                            });
                            break;
                        }
                        case StatusType.Warn: {
                            if (response.StatusCode == AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage + this.strCode });
                                break;
                            }
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex,"btn_Delete");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
    * This method is calling when  close the edit form and add form 
    */
    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu)); 
        this.noOfReasonCodesMessage = "";
        this.addForm = false;
        this.page = true;
        this.editForm = false;
        this.growlMessage = [];
        this.txtReasonCode = "";
        this.txtDesc = "";
    }

    /**
        * This method is for displaying catch block error messages 
        * @param event
        */
    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString()(), funName, this.constructor.name);
    }

    /**
     * This method is for clearing all the variables
     * @param event
     */
    ngOnDestroy() {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstReasonsCode = null;
        this.strCode = null;
        this.strDescr = null;
        this.txtReasonCode = null;
        this.txtDesc = null;
        this.strReasonCode = null;
        this.txtNewReasonCode = null;
        this.txtNewDesc = null;
        this.reasonCodeStatus = undefined;
        this.newDescStatus = undefined;
        this.newUpDescStatus = undefined;
        this.noOfReasonCodesMessage = null;
        this.deviceTokenEntry = null;
        this.pageTitle = null;
        this.lblReasonCode = null;
        this.txtUpDesc = null;
    }
}
