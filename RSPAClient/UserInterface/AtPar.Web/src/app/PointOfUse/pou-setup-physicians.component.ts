import { Component, OnDestroy, ViewChild } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { SetupPhysicianServices } from './pou-setup-physicians.services';
import { TokenEntry_Enum, EnumApps, ModeEnum, YesNo_Enum, StatusType, } from '../Shared/AtParEnums'
import { HttpService } from '../Shared/HttpService';
import { AtparStatusCodes, } from '../Shared/AtParStatusCodes';
import { Http, Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from './../components/common/api';
import { MT_POU_PHYSICIAN } from '../../app/Entities/mt_pou_physician';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from '../components/datatable/datatable';
import { ConfirmationService } from '../components/common/api';
import { Menus } from '../AtPar/Menus/routepath';
declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'pou-setup-physicians.component.html',

    providers: [datatableservice, SetupPhysicianServices, HttpService, AtParCommonService, AtParConstants, ConfirmationService]
})

export class SetupPhysiciansComponent {
    pageSize: number;
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    @ViewChild(DataTable) dataTableComponent: DataTable;
    showGrid: boolean = false;
    lstGridData: MT_POU_PHYSICIAN[];
    showAddButton: boolean = true;
    mode: string;
    statusMessage: string;
    addPhysiciaId: string = "";
    addPhsysicianFname: string = "";
    addPhsysicianLname: string = "";
    addPhsysicianMname: string = "";
    physiciansDetails: MT_POU_PHYSICIAN;
    mainlstGridData: Array<MT_POU_PHYSICIAN>;
    validationPhysicianId: number;
    validationPhysicianFname: number;
    validationPhysicianLname: number;
    validationPhysicianMname: number=0;

    isDuplicateExists: boolean = false;
    disabled: boolean = false;
    div1: boolean = true;
    addFrom: boolean = false;
    loading: boolean = true;
    updatePhysicianId: string = "";
    statusValue: any = false;

    physicianCount: any;
    status: boolean;
    ddlStatusType: any;
    statusType: string = "";
    breadCrumbMenu: Menus;

    constructor(public dataservice: datatableservice,
        private setupPhysicianServices: SetupPhysicianServices,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private confirmationService: ConfirmationService) {
        this.breadCrumbMenu = new Menus();
    }


    async ngOnInit() {
        try {
           this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

            this.mainlstGridData = new Array<MT_POU_PHYSICIAN>()
            this.spinnerService.stop();

            this.ddlStatusType = [];
            this.ddlStatusType.push({ label: 'All', value: "" });
            this.ddlStatusType.push({ label: 'Active', value: true });
            this.ddlStatusType.push({ label: 'InActive', value: false });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }
    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }


    async btn_go() {
        this.showGrid = false;
        //if (this.showGrid) {
        //    this.dataTableComponent.reset();
        //}

        //  this.mainlstGridData = new Array<MT_POU_PHYSICIAN>()
        this.mainlstGridData = [];
        this.lstGridData = [];
        this.statusType = "";
        this.growlMessage = [];
        await this.getPhysicianList();

    }


    async getPhysicianList() {
        //if (this.addPhysiciaId == undefined || this.addPhysiciaId ==null ||
        //    this.addPhsysicianFname == undefined || this.addPhsysicianFname == null ||
        //    this.addPhsysicianLname == undefined || this.addPhsysicianLname == null ||
        //    this.addPhsysicianMname == undefined || this.addPhsysicianMname == null) {
        //    this.addPhysiciaId = "";
        //    this.addPhsysicianFname = "";
        //    this.addPhsysicianLname = ""; this.addPhsysicianMname = "";
        //}
        try {

            
            this.spinnerService.start();
            await this.setupPhysicianServices.getPhysiciansList(this.addPhysiciaId, this.addPhsysicianFname, this.addPhsysicianLname, this.addPhsysicianMname)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_PHYSICIAN>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {

                            let lstGrid = res.json().DataList;
                            if (lstGrid.length > 0) {
                                this.lstGridData = lstGrid;
                                for (let x = 0; x < this.lstGridData.length; x++) {
                                    let setuPhysicianDetails = new MT_POU_PHYSICIAN();
                                    setuPhysicianDetails.FIRST_NAME = this.lstGridData[x].FIRST_NAME;
                                    setuPhysicianDetails.LAST_NAME = this.lstGridData[x].LAST_NAME;
                                    setuPhysicianDetails.MIDDLE_INITIAL = this.lstGridData[x].MIDDLE_INITIAL;
                                    setuPhysicianDetails.PHYSICIAN_ID = this.lstGridData[x].PHYSICIAN_ID;
                                    setuPhysicianDetails.STATUS = !this.lstGridData[x].STATUS;
                                    setuPhysicianDetails.UPDATE_DATE = this.lstGridData[x].UPDATE_DATE;
                                    setuPhysicianDetails.UPDATE_USERID = this.lstGridData[x].UPDATE_USERID;
                                    this.lstGridData[x].STATUS = !this.lstGridData[x].STATUS;
                                    this.mainlstGridData.push(setuPhysicianDetails);
                                }
                                let count = this.lstGridData.length;
                                this.physicianCount = count;
                                this.physicianCount = this.physicianCount + " Physician(s) Found";
                                this.showGrid = true;
                            }
                            else {
                                this.showGrid = false;
                            }
                        }

                            break;

                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
        }

    }

    addPhysician() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Physician';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.addFrom = true;

        this.div1 = false;
        this.showGrid = false;
        this.growlMessage = [];
        this.mode = ModeEnum[ModeEnum.Add].toString();
        this.physiciansDetails = new MT_POU_PHYSICIAN();
        this.addPhysiciaId = "";
        this.addPhsysicianFname = "";
        this.addPhsysicianLname = "";
        this.addPhsysicianMname = "";
        this.validationPhysicianId = null;
        this.validationPhysicianFname = null;
        this.validationPhysicianLname = null;
        this.mode = "Add"
        this.loading = true;
    }

    async saveOrUpdate() {
        if (this.mode == "Add") {

            await this.savePhysician();
        }
        else if (this.mode == "Edit") {
            await this.upDatePhysician();
        }

    }

    editPhysician(rowData) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Physician';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.addFrom = true;
        this.physiciansDetails = new MT_POU_PHYSICIAN();
        this.div1 = false;
        this.showGrid = false;

        this.physiciansDetails.PHYSICIAN_ID = rowData.PHYSICIAN_ID;
        this.physiciansDetails.FIRST_NAME = rowData.FIRST_NAME;
        this.physiciansDetails.LAST_NAME = rowData.LAST_NAME;
        this.physiciansDetails.MIDDLE_INITIAL = rowData.MIDDLE_INITIAL;

        this.mode = ModeEnum[ModeEnum.Edit].toString();
        this.disabled = true;
        this.loading = false;
        this.validationPhysicianId = 0;
        this.validationPhysicianLname = 0;
        this.validationPhysicianFname = 0;

    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.div1 = true;
        this.showGrid = false;
        this.addFrom = false;
        this.growlMessage = [];
        this.mode = null;
        this.disabled = false;
        this.addPhysiciaId = "";
        this.addPhsysicianFname = "";
        this.addPhsysicianLname = "";
        this.addPhsysicianMname = "";
    }


    async savePhysician() {
        this.growlMessage = [];
        try {
          
            if (this.physiciansDetails.MIDDLE_INITIAL == undefined || this.physiciansDetails.MIDDLE_INITIAL == null) {
                this.physiciansDetails.MIDDLE_INITIAL = "";
            }
            this.physiciansDetails.PHYSICIAN_ID.replace(/\'/g, "''").trim();
            this.physiciansDetails.FIRST_NAME.replace(/\'/g, "''").trim();
            this.physiciansDetails.LAST_NAME.replace(/\'/g, "''").trim();
            this.physiciansDetails.MIDDLE_INITIAL.replace(/\'/g, "''").trim();

            await this.checkForDuplicates();
            if (this.isDuplicateExists) {
                this.growlMessage = [];
                this.statusMessage = AtParConstants.AlreadyExist_Msg.replace("1%", "Physician").replace("2%", this.physiciansDetails.PHYSICIAN_ID);
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                this.isDuplicateExists = false;
                return;
            }

            this.spinnerService.start();
            await this.setupPhysicianServices.addPhysican(this.physiciansDetails.PHYSICIAN_ID, this.physiciansDetails.FIRST_NAME, this.physiciansDetails.LAST_NAME, this.physiciansDetails.MIDDLE_INITIAL, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<MT_POU_PHYSICIAN>;
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.statusMessage = AtParConstants.Created_Msg.replace("1%", "Physician").replace("2%", this.physiciansDetails.PHYSICIAN_ID);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                            this.physiciansDetails = new MT_POU_PHYSICIAN();
                            this.loading = true;
                            this.physiciansDetails.PHYSICIAN_ID = "";
                            this.physiciansDetails.FIRST_NAME = "";
                            this.physiciansDetails.LAST_NAME = "";
                            this.validationPhysicianId = 1;
                            this.validationPhysicianFname = 1;
                            this.validationPhysicianLname = 1;


                            this.showGrid = false;
                            (<HTMLInputElement>document.getElementById("PHYSICIAN_ID")).focus();
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
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                            break;
                        }
                    }

                });
        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }
    async checkForDuplicates() {
        await this.getPhysicianList();
        if (this.mode == "Add") {
            if (this.lstGridData != null) {
                var selRows = this.lstGridData.filter(x => x.PHYSICIAN_ID.toLowerCase().trim() == this.physiciansDetails.PHYSICIAN_ID.toLowerCase().trim());
                if (selRows.length > 0) {
                    this.isDuplicateExists = true;

                }
            }

            this.showGrid = false;

        }

    }

    async upDatePhysician() {
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            await this.setupPhysicianServices.updatePhysicians(this.physiciansDetails.PHYSICIAN_ID, this.physiciansDetails.FIRST_NAME, this.physiciansDetails.LAST_NAME, this.physiciansDetails.MIDDLE_INITIAL, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((webresp: Response) => {
                    this.spinnerService.stop();
                    let response = webresp.json() as AtParWebApiResponse<number>;
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];

                            this.statusMessage = AtParConstants.Updated_Msg.replace("1%", "Physician").replace("2%", this.physiciansDetails.PHYSICIAN_ID);

                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                            this.loading = false;

                            this.validationPhysicianId = null;
                            this.validationPhysicianFname = null;
                            this.validationPhysicianLname = null;
                            (<HTMLInputElement>document.getElementById("FIRST_NAME")).focus();
                            break;

                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];

                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }


                });
        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    async confirm(physiciandata) {
        this.growlMessage = [];
        await this.confirmationService.confirm({
            message: 'Are you sure about the change?',
            accept: () => {
                this.changeStatus(physiciandata);
            },
            reject: () => {
                physiciandata.STATUS = !physiciandata.STATUS;

            }
        });

    }

    public changeStatus(Physiciandata) {
        this.updatePhysicianId = Physiciandata.PHYSICIAN_ID;
        this.statusValue = Physiciandata.STATUS;
        this.deletePhysician();
    }

    async deletePhysician() {
        this.growlMessage = [];
        try {
            let status: any;
            if (this.statusValue == true) {
                status = "Enable";
            }
            else {
                status = "Disable";
            }
            this.spinnerService.start();
            await this.setupPhysicianServices.deletePhysican(this.updatePhysicianId, status, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((webresp: Response) => {
                    this.spinnerService.stop();
                    let response = webresp.json() as AtParWebApiResponse<number>;
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.statusMessage = AtParConstants.Updated_Msg.replace("1%", "Physician").replace("2%", this.updatePhysicianId);

                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });

                            let filterData: any = [];
                            this.lstGridData = [];
                            let matchedrecord = this.mainlstGridData.filter(x => x.PHYSICIAN_ID == this.updatePhysicianId)
                            matchedrecord[0].STATUS = this.statusValue;

                            if (this.statusType.toString() == "true") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == true)
                            } else if (this.statusType.toString() == "false") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == false)
                            } else {
                                filterData = this.mainlstGridData
                            }
                            if (filterData != null) {
                                for (let x = 0; x < filterData.length; x++) {
                                    let physicianlocDetails = new MT_POU_PHYSICIAN();
                                    physicianlocDetails.FIRST_NAME = filterData[x].FIRST_NAME;
                                    physicianlocDetails.LAST_NAME = filterData[x].LAST_NAME;
                                    physicianlocDetails.MIDDLE_INITIAL = filterData[x].MIDDLE_INITIAL;
                                    physicianlocDetails.PHYSICIAN_ID = filterData[x].PHYSICIAN_ID;
                                    physicianlocDetails.UPDATE_USERID = filterData[x].UPDATE_USERID;
                                    physicianlocDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                                    physicianlocDetails.STATUS = filterData[x].STATUS;
                                    this.lstGridData.push(physicianlocDetails);
                                }


                            }

                            //  this.btn_go();
                            this.loading = true;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }


                });
        } catch (exMsg) {
            this.spinnerService.stop();
            this.clientErrorMsg(exMsg);
        }
    }

    bindModelDataChange(event: any) {
        try {

            if ("PHYSICIAN_ID" == event.TextBoxID.toString()) {
                this.validationPhysicianId = event.validationrules.filter(x => x.status == false).length;
            }
            if ("FIRST_NAME" == event.TextBoxID.toString()) {
                this.validationPhysicianFname = event.validationrules.filter(x => x.status == false).length;
            }
            if ("LAST_NAME" == event.TextBoxID.toString()) {
                this.validationPhysicianLname = event.validationrules.filter(x => x.status == false).length;
            }
            if ("MIDDLE_INITIAL" == event.TextBoxID.toString()) {
                this.validationPhysicianMname = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.mode == ModeEnum[ModeEnum.Add].toString()) {

                if (this.validationPhysicianId == 0 && this.validationPhysicianFname == 0 && this.validationPhysicianLname == 0 && this.validationPhysicianMname == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }

            if (this.mode == ModeEnum[ModeEnum.Edit].toString()) {
                if ((this.validationPhysicianFname == 0 || this.validationPhysicianFname == undefined)
                    && (this.validationPhysicianLname == 0 || this.validationPhysicianLname == undefined)
                    && (this.validationPhysicianMname == 0 || this.validationPhysicianMname == undefined)

                ) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }


        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    async dataFilter(evtdata, filed, filterMatchMode) {
        this.growlMessage = [];
        let filterData;
        this.lstGridData = [];

        if (this.statusType.toString() == "true") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == true)
        } else if (this.statusType.toString() == "false") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == false)
        } else {
            filterData = this.mainlstGridData
        }
        if (filterData != null) {
            for (let x = 0; x < filterData.length; x++) {
                let physicianlocDetails = new MT_POU_PHYSICIAN();
                physicianlocDetails.FIRST_NAME = filterData[x].FIRST_NAME;
                physicianlocDetails.LAST_NAME = filterData[x].LAST_NAME;
                physicianlocDetails.MIDDLE_INITIAL = filterData[x].MIDDLE_INITIAL;
                physicianlocDetails.PHYSICIAN_ID = filterData[x].PHYSICIAN_ID;
                physicianlocDetails.UPDATE_USERID = filterData[x].UPDATE_USERID;
                physicianlocDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                physicianlocDetails.STATUS = filterData[x].STATUS;
                this.lstGridData.push(physicianlocDetails);

            }


        }
    }


    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.showGrid = null;
        this.spinnerService.stop();
        this.pageSize = null;
        this.status = null;
        this.updatePhysicianId = null;
        this.statusMessage = null;
        this.addFrom = null;
        this.addPhsysicianFname = null;
        this.addPhsysicianLname = null;
        this.addPhsysicianMname = null;
        this.addPhysiciaId = null;

        this.validationPhysicianFname = null;
        this.validationPhysicianLname = null;
        this.validationPhysicianMname = null;
        this.showAddButton = null;
        this.disabled = null;
        this.loading = null;
        this.mode = null;
        this.lstGridData = null;

    }
}