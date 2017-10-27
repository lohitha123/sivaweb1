import { Component, Input, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { List, Enumerable } from 'linqts';
import { TokenEntry_Enum, StatusType, EnumApps, YesNo_Enum, Enterprise_Enum } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParConstants } from '../Shared/AtParConstants';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Message } from './../components/common/api';
import { ConfirmationService } from '../components/common/api';
import { AtParCarrierInformationService } from './atpar-carrier-information.services';
import { MT_RECV_CARRIER } from '../entities/mt_recv_carrier';
import { Menus } from '../AtPar/Menus/routepath';

@Component({
    selector: 'atpar-carrier-information',
    templateUrl: 'atpar-carrier-information.component.html',
    providers: [HttpService, AtParCarrierInformationService, AtParCommonService, AtParConstants, ConfirmationService],
})

export class AtParCarrierInformationComponent {

    //Variables
    form: boolean = false;
    table: boolean = true;
    btnGetCarrierVisible: boolean = true;
    grdGetCarrier: boolean = false;
    buttonEnableDisable: boolean = true;

    @Input() appId: string;
    deviceTokenEntry: string[] = [];
    statusMsgs: Message[] = [];
    carriersDataLst: MT_RECV_CARRIER[];

    txtCarrier: string = "";
    txtDescription: string = "";

    txtCarrierStatus: number;
    txtDescStatus: number;
    recordsPerPageSize: number;
    intAppId: number;

    statType: any;
    breadCrumbMenu: Menus;

    constructor(private spnrService: SpinnerService,
        private httpService: HttpService,
        private carrierInfoService: AtParCarrierInformationService,
        private commonService: AtParCommonService,
        private confirmationService: ConfirmationService,
        private atParConstant: AtParConstants) {
        this.breadCrumbMenu = new Menus();
    }

    add() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Carrier';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.statusMsgs = [];
        this.txtCarrier = "";
        this.txtDescription = "";
        this.txtDescStatus = null;
        this.txtCarrierStatus = null;
        this.form = true;
        this.table = false;
        this.buttonEnableDisable = true;
    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.statusMsgs = [];
        this.form = false;
        this.table = true;
    }

    async ngOnInit() {
        try {
            this.intAppId = parseInt(this.appId);
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPageSize = parseInt(this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage]);
            await this.page_Load();
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async page_Load() {
        try {
            this.statusMsgs = [];
            let strEnterpriseSystem: string = "";

            this.spnrService.start();
            await this.commonService.getEnterpriseSystem().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    strEnterpriseSystem = data.Data;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

            //Give Application and menu id's here
            if (typeof this.appId == 'undefined') {
                this.intAppId = 0;
            } else {
                this.intAppId = parseInt(this.appId);
            }

            if (strEnterpriseSystem.toString().toUpperCase() != Enterprise_Enum[Enterprise_Enum.Peoplesoft].toString().toUpperCase()) {
                //"PeopleSoft"
                this.btnGetCarrierVisible = false;
            }

            await this.bindDataGrid();

        } catch (ex) {
            this.clientErrorMsg(ex, "page_Load");
        }
    }

    async bindDataGrid() {
        try {
            this.statusMsgs = [];
            this.spnrService.start();
            await this.carrierInfoService.getCarriersData().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_RECV_CARRIER>;
                    this.carriersDataLst = res.json().DataList,
                        this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.carriersDataLst.length > 0) {
                                this.grdGetCarrier = true;
                                for (let i = 0; i < this.carriersDataLst.length; i++) {
                                    if (this.carriersDataLst[i].LOCAL_FLAG.toString().toUpperCase() == YesNo_Enum[YesNo_Enum.Y]) {
                                        this.carriersDataLst[i].LOCAL_FLAG = true;
                                    } else if (this.carriersDataLst[i].LOCAL_FLAG.toString().toUpperCase() == YesNo_Enum[YesNo_Enum.N]) {
                                        this.carriersDataLst[i].LOCAL_FLAG = false;
                                    }
                                }

                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex, "bindDataGrid");
        }
    }

    async btnGetCarriers_Click() {
        try {
            this.grdGetCarrier = false;
            this.statusMsgs = [];
            this.getCarriers();
        } catch (ex) {
            this.clientErrorMsg(ex, "btnGetCarriers_Click");
        }

    }

    async getCarriers() {
        try {
            this.statusMsgs = [];
            this.spnrService.start();
            await this.carrierInfoService.getCarriers(this.deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

            await this.bindDataGrid();
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex, "getCarriers");
        }
    }

    async saveCarriers_Info() {
        try {
            this.statusMsgs = [];
            let sCIdspace: number = 0;
            let sCDescrspace: number = 0;
            let sDescr: string = "";
            let sCarrierId: string = "";
            let strArr: string[] = [];

            sCarrierId = this.txtCarrier;
            sDescr = this.txtDescription;
            strArr = sCarrierId.split(" ");

            if (strArr.length - 1 > 0) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Carrier Id" });
                return;
            } else if (sCarrierId.length == 0 && sDescr.length == 0) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Carrier id and Description are mandatory" });
                return;
            } else if (sCarrierId.trim().length == 0 || sDescr.trim().length == 0) {
                let sNoEntry: string = "";
                if (sCarrierId.trim().length == 0) {
                    sNoEntry = "Carrier Id";
                } else if (sDescr.trim().length == 0) {
                    sNoEntry = "Description";
                }
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid " + sNoEntry + "" });
                return;

            } else if (sCarrierId.length > 0 && sDescr.length > 0) {
                sCIdspace = sCarrierId.length - sCarrierId.trim().length;
                sCDescrspace = sDescr.length - sDescr.trim().length;

                if (sCIdspace > 0 && sCDescrspace > 0) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Carrier Id and Description" });
                    return;

                } else {
                    this.addCarriers(sCarrierId.toUpperCase(), sDescr);
                }

            }

        } catch (ex) {
            this.clientErrorMsg(ex, "saveCarriers_Info");
        }
    }

    async addCarriers(carrierId, description) {
        try {
            this.statusMsgs = [];
            this.spnrService.start();
            await this.carrierInfoService.addCarrier(carrierId, description, this.deviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<number>;

                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.bindDataGrid();
                            //this.form = false;
                            //this.table = true;
                            let msg = AtParConstants.Created_Msg.replace("1%", "Carrier").replace("2%", carrierId);
                            this.statusMsgs.push({
                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg
                            });
                            this.spnrService.stop();
                            this.txtCarrier = "";
                            this.txtDescription = "";
                            this.txtDescStatus = null;
                            this.txtCarrierStatus = null;
                            this.buttonEnableDisable = true;
                            document.getElementById('Carrier').focus();
                            break;
                        }
                        case StatusType.Warn: {
                            let resmsg: string = "";
                            //  resmsg = response.StatusMessage.toString().replace("1%", carrierId.toString());
                            resmsg = "Carrier " + carrierId.toString() + " Already Exists";
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resmsg });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });

            this.spnrService.stop();
        } catch (ex) {
            this.clientErrorMsg(ex, "addCarriers");
        }
    }

    async deleteCarriers_Data(selectedRowData) {
        try {
            this.statusMsgs = [];
            let itemName = selectedRowData.CARRIER_ID;
            await this.deleteConfirm(itemName);

        } catch (ex) {
            this.clientErrorMsg(ex, "deleteCarriers_Data");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spnrService, strExMsg.toString(), funName, this.constructor.name);
    }

    bindModelDataChange(event: any) {
        if ("Carrier" == event.TextBoxID.toString()) {
            this.txtCarrierStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Description" == event.TextBoxID.toString()) {
            this.txtDescStatus = event.validationrules.filter(x => x.status == false).length;
        }
        //validations satisfies r not 
        if (this.txtCarrierStatus == 0 && this.txtDescStatus == 0 && this.txtDescription.trim().length != 0) {
            this.buttonEnableDisable = false;
        }
        else {
            this.buttonEnableDisable = true;
        }
    }

    async deleteConfirm(carrierId: string) {
        try {
            let successData: boolean = false;
            this.statusMsgs = [];
            this.confirmationService.confirm({
                message: "Are you sure you want to delete  " + carrierId + "?",
                accept: () => {
                    this.spnrService.start();
                    this.delete_method(carrierId);
                }
            });

            this.spnrService.stop();
        } catch (ex) {
            this.clientErrorMsg(ex, "deleteConfirm");
        }
    }

    async delete_method(carrierId: string) {
        await this.carrierInfoService.deleteCarriers(carrierId, this.deviceTokenEntry[TokenEntry_Enum.UserID]).
            catch(this.httpService.handleError).then(async (res: Response) => {
                let data = res.json() as AtParWebApiResponse<number>;
                this.statType = res.json().StatType;
                switch (data.StatType) {
                    case StatusType.Success: {
                        await  this.GetDetails();
                        let msg = AtParConstants.Deleted_Msg.replace("1%", "Carrier").replace("2%", carrierId);
                        this.statusMsgs.push({
                            severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg
                        });
                        this.spnrService.stop();
                        break;
                    }
                    case StatusType.Warn: {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            });
    }

    async GetDetails() {
        await this.bindDataGrid();


    }
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.carriersDataLst = null;
        this.txtCarrier = null;
        this.txtDescription = null;
        this.recordsPerPageSize = null;
        this.intAppId = null;
        this.statType = null;
        this.grdGetCarrier = null;
    }
} 
