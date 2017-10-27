import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { AtParConstants } from '../Shared/AtParConstants';
import { HttpService } from '../Shared/HttpService';
import { TokenEntry_Enum, ModeEnum, StatusType } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Message } from '../components/common/api';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { ConfirmationService } from '../components/common/api';
import { SetupSpecialtyServices } from './pou-setup-specialty-services.service';
import { MT_POU_SPECIALTY_CODE } from '../Entities/MT_POU_SPECIALTY_CODE';
import { MT_POU_PROCEDURE_CODE } from '../Entities/MT_POU_PROCEDURE_CODE';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';


declare var module: {
    id: string;
}


@Component({
  
    templateUrl: 'pou-setup-specialty-services.component.html',
    providers: [ SetupSpecialtyServices, AtParConstants, ConfirmationService, HttpService]
})

export class SetupSpecialtyServiceComponent implements OnInit {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    /*Varaible Declaration*/
    isVisible: boolean = false;
    page: boolean = true;
    addForm: boolean = false;
    editForm: boolean = false;
    loading: boolean = false;
    isExist: boolean = false;   
    mode: string;
    modeDelete: boolean = false;
    lblSpecialtyCode: string = "";
    txtSpecialtyCode: string = "";
    txtDesc: string = "";
    txtNewSpecialtyCode: string = "";
    txtNewDesc: string = "";
    txtUpdesc: string = "";
    noOfSpecialtyCodesMessage: string = "";
    recordsPerPageSize: number;
    deviceTokenEntry: string[] = [];
    strProcedureCode: string = "procedures";
    strSpecialtyCode: string = "specialty";
    strCode: string;
    strDesc: string;
    specialityCodeStatus: number = 0;
    newDescStatus: number = 0;
    newUpDescStatus: number = 0;
    growlMessage: Message[] = [];
    lstSpecialtyCode: MT_POU_SPECIALTY_CODE[];
    statusCode: number = -1;
    lstProcedureCode: MT_POU_PROCEDURE_CODE[] ;
    breadCrumbMenu: Menus;
    
     /**
     * Constructor     
     * @param SetupSpecialtyServices
     * @param ConfirmationService
     * @param spinnerService
     * @param atParConstant
     */
    constructor(private confirmationService: ConfirmationService,
        private atParConstant: AtParConstants,
        private setupSpecialtyServices: SetupSpecialtyServices,
        private spinnerService: SpinnerService,
        private httpService: HttpService
    ) {this.breadCrumbMenu = new Menus();}

    /**
    * Init Function for getting SpecialtyServiceCodes data when page loading
    */
    async ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];       
    }

     /**
     * Getting data from database and bind records to data table
     */
    async  bindDataGrid() {              
        this.growlMessage = [];       
        this.noOfSpecialtyCodesMessage = "";       
        try {    
            this.spinnerService.start();       
            await this.setupSpecialtyServices.getSpecialtyCodes(this.strSpecialtyCode, this.txtSpecialtyCode, this.txtDesc).catch(this.httpService.handleError)
                .then((response: Response) => {
                    let data = response.json() as AtParWebApiResponse<MT_POU_SPECIALTY_CODE>;
                    this.lstSpecialtyCode = response.json().DataList;
                    this.statusCode = data.StatusCode;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.page = true;
                            if (this.lstSpecialtyCode.length > 0) {
                                this.noOfSpecialtyCodesMessage = this.lstSpecialtyCode.length + " Specialty / Service Code(s) Found ";
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
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
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
        catch (ex){
            this.clientErrorMsg(ex);
        }  
        finally {         
            this.spinnerService.stop();
        }                     
    }

    /**
    * this method is calling when click on Go button 
    */
    async  btn_GetSpecialtyCodes() {
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
               if ("txtNewSpecialtyCode" == event.TextBoxID.toString()) {
                   this.specialityCodeStatus = event.validationrules.filter(x => x.status == false).length;
               }
               if ("txtNewDesc" == event.TextBoxID.toString()) {
                   this.newDescStatus = event.validationrules.filter(x => x.status == false).length;
               }               
               if (this.specialityCodeStatus >= 1 || this.specialityCodeStatus == undefined || this.newDescStatus >= 1 || this.newDescStatus == undefined) {
                   this.loading = true;
               }
               else
               {
                   if (this.txtNewSpecialtyCode == undefined || this.txtNewSpecialtyCode == "" ) {
                       this.loading = true;
                   }
                   else
                   {
                       this.loading = false;
                   }                  
               }
           }

           if (this.mode == ModeEnum[ModeEnum.Edit].toString()) {
               if ("txtUpdesc" == event.TextBoxID.toString()) {
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
           this.clientErrorMsg(exMsg);
       }
   }


    /**
    * this method is calling when click on Add button and display Create form 
    */
   add() {
       this.breadCrumbMenu.SUB_MENU_NAME = 'Add Speciality / Service';
       this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.txtNewSpecialtyCode = "";
        this.txtNewDesc = "";
        this.growlMessage = [];
        this.addForm = true;
        this.editForm = false;
        this.page = false;
        this.isVisible = false;
        this.mode = ModeEnum[ModeEnum.Add].toString();
        this.loading = true;       
        this.specialityCodeStatus = undefined;
   }

    /**
    * this method is calling when click on Save button in CreateForm
    */ 
    async  btn_SaveSpecialtyCode($event) {
        this.growlMessage = [];       
        this.txtSpecialtyCode = "";
        this.txtDesc = "";               
        try {
            this.spinnerService.start();     
            await this.setupSpecialtyServices.addCodes(this.strSpecialtyCode, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.txtNewSpecialtyCode, this.txtNewDesc, "").
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_POU_SPECIALTY_CODE>;
                    this.statusCode = response.StatusCode;
                    this.spinnerService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {   
                            let statusmsg = AtParConstants.Created_Msg.replace("1%", "Specialty / Service Code").replace("2%", this.txtNewSpecialtyCode);                                              
                            this.growlMessage.push({
                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg
                            });
                            this.txtNewSpecialtyCode = "";
                            this.txtNewDesc = "";
                            document.getElementById("txtNewSpecialtyCode").focus();
                            this.loading = true;
                            break;
                        }
                        case StatusType.Warn: {
                            if (response.StatusCode == AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage + this.txtNewSpecialtyCode });
                                break;
                            }
                        }
                        case StatusType.Error: {
                            if (response.StatusCode == AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL) {
                                this.growlMessage.push({                                  
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Specialty / Service Code" + " " + this.txtNewSpecialtyCode+" Already Exists " });
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
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }  
    }

    /**
    * this method is calling when click on edit button in Datatable
    */
    edit(rowData) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Speciality / Service';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.editForm = true;
        this.addForm = false;
        this.page = false;
        this.isVisible = false;
        this.loading = false; 
        this.mode = ModeEnum[ModeEnum.Edit].toString();
        this.lblSpecialtyCode = rowData.CODE;
        this.txtUpdesc = rowData.DESCRIPTION;
    }

    /**
    * this method is calling when click on Save button in editForm
    */
    async btn_UpdateSpecialtyCode($event) {
        this.growlMessage = [];    
        this.txtSpecialtyCode = "";
        this.txtDesc = "";
        try {
            this.spinnerService.start();            
            await this.setupSpecialtyServices.updateCodes(this.strSpecialtyCode, this.lblSpecialtyCode, this.txtUpdesc, "")
                .catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_POU_SPECIALTY_CODE>;
                    this.statusCode = response.StatusCode;
                    this.spinnerService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            let statusmsg = AtParConstants.Updated_Msg.replace("1%", "Specialty / Service Code").replace("2%", this.lblSpecialtyCode);                                                                     
                            this.growlMessage.push({
                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg
                            });
                            (<HTMLInputElement>document.getElementById('txtUpdesc')).focus();                  
                            break;
                        }
                        case StatusType.Warn: {
                            if (response.StatusCode == AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage + this.lblSpecialtyCode });
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
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }  
    }

    confirmDelete(rowData) {
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete this Code?',
                accept: () =>
                { this.btn_Delete(rowData); }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }
    /**
    * this method is calling when click on Delete button in Datatable
    */
    async   btn_Delete(rowData) {
        this.growlMessage = [];
        this.txtSpecialtyCode = "";
        this.txtDesc = "";
        this.strCode = rowData.CODE;
        this.strDesc = rowData.DESCRIPTION;
         ///Checking the existance of speciality code in setup procedures screen
        try {
            this.spinnerService.start();
            await this.setupSpecialtyServices.getProcedureCodes(this.strProcedureCode, "", "").catch(this.httpService.handleError)
                .then((response: Response) => {
                    let data = response.json() as AtParWebApiResponse<MT_POU_PROCEDURE_CODE>;
                    this.statusCode = data.StatusCode;
                    this.lstProcedureCode = response.json().DataList;
                    this.spinnerService.stop();                 
                       switch (data.StatType) {
                           case StatusType.Success: {
                               for (let i = 0; i <= this.lstProcedureCode.length - 1; i++)
                               {
                                   if (this.lstProcedureCode[i].SCODE == this.strCode)
                                   {                                    
                                       this.isExist = true;                                     
                                   }                                                                 
                               }
                               if (this.isExist == true)
                               {                    
                                   this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "This Specialty / Service is assigned to a procedure.Unassign before delete." });
                                   break;
                               }
                               else {
                                   break;
                               }   
                                                   
                           }
                           case StatusType.Warn: {
                               if (this.lstProcedureCode.length == 0) {
                                   break;
                               }
                               else
                               {
                                   this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                   break;
                               }                                                 
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
            if (this.isExist == false) {           
                this.spinnerService.start();       
                await this.setupSpecialtyServices.deleteCodes(this.strSpecialtyCode, this.strCode, this.strDesc).catch(this.httpService.handleError)
                    .then((response: Response) => {
                        let data = response.json() as AtParWebApiResponse<MT_POU_SPECIALTY_CODE>;
                        this.statusCode = data.StatusCode;
                        this.spinnerService.stop();
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.modeDelete = true;
                                this.isVisible = true;                             
                                this.bindDataGrid();
                                let statusmsg = AtParConstants.Deleted_Msg.replace("1%", "Specialty / Service Code").replace("2%", this.strCode);                             
                                this.growlMessage.push({
                                    severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg
                                });
                                break;
                            }
                            case StatusType.Warn: {
                                if (this.statusCode == AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage + this.strCode });
                                    break;
                                }
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
            this.isExist = false;            
        }
        catch (ex)
        {
            this.clientErrorMsg(ex);
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
        this.noOfSpecialtyCodesMessage = "";
        this.addForm = false;
        this.page = true;
        this.editForm = false;
        this.growlMessage = [];
        this.txtSpecialtyCode = "";
        this.txtDesc = "";               
    }

    /**
     * This method is for displaying catch block error messages 
     * @param event
     */
    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    /**
     * This method is for clearing all the variables
     * @param event
     */
    ngOnDestroy() {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstSpecialtyCode = null;
        this.strCode = null;
        this.strDesc = null;
        this.txtSpecialtyCode = null;
        this.txtDesc = null;
        this.strProcedureCode = null;
        this.strSpecialtyCode = null;
        this.txtNewDesc = null;
        this.txtNewSpecialtyCode = null;
        this.noOfSpecialtyCodesMessage = null;
        this.deviceTokenEntry = null;
        this.txtUpdesc = null;
        this.specialityCodeStatus = undefined;
        this.newDescStatus = undefined;
        this.newUpDescStatus = undefined;
        this.lstProcedureCode = null;
    }
}