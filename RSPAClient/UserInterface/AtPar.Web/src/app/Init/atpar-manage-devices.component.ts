import { Component, OnDestroy, ViewChild } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { ManageDevicesService } from './atpar-manage-devices.service';
import { TokenEntry_Enum, EnumApps, ModeEnum, YesNo_Enum, StatusType, } from '../Shared/AtParEnums'
import { HttpService } from '../Shared/HttpService';
import { AtparStatusCodes, } from '../Shared/AtParStatusCodes';
import { Http, Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from './../components/common/api';
import { MT_ATPAR_DEVICE_DETAILS } from '../Entities/MT_ATPAR_DEVICE_DETAILS';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-manage-devices.component.html',
    providers: [datatableservice, ManageDevicesService, HttpService, AtParCommonService, AtParConstants]
})

export class ManageDevicesComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    table: boolean = false;
    form: boolean = false;
    mode: string;
    pageSize: number;
    addDetails: boolean = false;
    editDetails: boolean = false;
    changeDevStatus: string;
    showDevStatus: boolean = false;
    _deviceTokenEntry: string[] = [];
    appID: string;
    menuCode: string;
    auditSatus: string = "";
    growlMessage: Message[] = [];
    statusMessage: string;
    showAddButton: boolean = true;
    lstDevices: MT_ATPAR_DEVICE_DETAILS[];
    lstAuditData: MT_ATPAR_SECURITY_AUDIT[];
    auditData: MT_ATPAR_SECURITY_AUDIT;
    deviceDetails = new MT_ATPAR_DEVICE_DETAILS();
    ddlStatusType: any[] = [];
    oldDescription: string = "";
    disableDevStatus: boolean = false;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    disabled: boolean = false;
    oldMacAddress: string;
    pDeviceSearch: string;
    isChangeStatus: boolean = false;
    breadCrumbMenu: Menus;
    helptext: string = "Allows alphabets, numbers and special characters except (. , / \\ [ ] ' _)";

    constructor(public dataservice: datatableservice,
        private mngDevicesService: ManageDevicesService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private leftBarAnimationService: LeftBarAnimationService) {
        this.breadCrumbMenu = new Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }

    edit(device) {
        this.editDetails = true;
        this.addDetails = false;
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Device';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.deviceDetails = new MT_ATPAR_DEVICE_DETAILS();
        this.table = false;
        this.form = true;
        this.showDevStatus = false;
        this.deviceDetails.DEVICE_ID = device.DEVICE_ID;
        this.deviceDetails.DESCRIPTION = device.DESCRIPTION;
        this.oldDescription = device.DESCRIPTION;
        this.deviceDetails.MAC_ADDRESS = device.MAC_ADDRESS;
        this.deviceDetails.STATUS = device.STATUS
        this.mode = ModeEnum[ModeEnum.Edit].toString();
        this.showAddButton = false;
        this.disableDevStatus = true;
        this.loading = false;
        this.disabled = true;
        this.oldMacAddress = device.MAC_ADDRESS;
        this.descStatus = 0
        this.macAddressStatus = 0;
    }

    add() {
        this.addDetails = true;
        this.editDetails = false;
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Device';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.deviceDetails.DEVICE_ID = "";
        this.deviceDetails = new MT_ATPAR_DEVICE_DETAILS();
        this.table = false;
        this.form = true;
        this.showDevStatus = false;
        this.mode = ModeEnum[ModeEnum.Add].toString();
        this.showAddButton = false;
        this.disabled = false;
        this.loading = true;
        this.descStatus = 1;
        this.macAddressStatus = 1;
        this.deviceIDStatus = 1;
    }

    close() {
        this.table = false;
        this.form = false;
        this.showAddButton = true;
        this.disableDevStatus = false;
        this.pDeviceSearch = "";
        this.growlMessage = [];
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
    }

    ngOnInit(): void {
        try {
            this.ddlStatusType.push({ label: 'All', value: null });
            this.ddlStatusType.push({ label: 'Active', value: true });
            this.ddlStatusType.push({ label: 'Inactive', value: false });
            this.pageSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.appID = (EnumApps.Auth).toString();
            this.menuCode = localStorage.getItem("menuCode") != null ? localStorage.getItem("menuCode") : 'mt_atpar_manage_devices.aspx';
            this.checkAuditAllowed();
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg,"ngOnInit");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    private async checkAuditAllowed() {
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            let webresp = new AtParWebApiResponse<string>();
            await this.commonService.getAuditAllowed(this.appID, this.menuCode)
                .catch(this.httpService.handleError).then((res: Response) => {
                    webresp = res.json() as AtParWebApiResponse<string>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.auditSatus = webresp.Data;
                            break
                        }
                        case StatusType.Warn: {
                            if (webresp.StatusCode == 1102002) {
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage })
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage })
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage })
                            break;
                        }
                    }

                });
        } catch (exMsg) {
            this.clientErrorMsg(exMsg,"checkAuditAllowed");
        }
    }

    async BindDataGrid() {

        this.table = false;
        try {
            if (this.mode == "Edit") {
                this.showAddButton = true;
            }
            this.spinnerService.start();
            if (this.pDeviceSearch == null || this.pDeviceSearch == undefined || this.pDeviceSearch === "") {
                this.pDeviceSearch = "";
            }
            await this.mngDevicesService.getDevIDs(this._deviceTokenEntry[TokenEntry_Enum.UserID], this.pDeviceSearch)
                .catch(this.httpService.handleError)
                .then((resp: Response) => {
                    let webresp = resp.json() as AtParWebApiResponse<MT_ATPAR_DEVICE_DETAILS>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.lstDevices = webresp.DataList;
                            this.table = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.table = false;
                            this.isChangeStatus = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "warn", summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.table = false;
                            this.isChangeStatus = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "info", summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.table = false;
                            this.isChangeStatus = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "error", summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            break;
                        }
                    }
                });

        } catch (exMsg) {
            this.clientErrorMsg(exMsg,"BindDataGrid");
        }
    }

    async  changeStatus(device) {
        if (device.STATUS == true) {
            this.changeDevStatus = "ACTIVE"
        }
        else {
            this.changeDevStatus = "INACTIVE";
        }
        this.growlMessage = [];
        this.spinnerService.start();
        try {
            var webresp = new AtParWebApiResponse<MT_ATPAR_DEVICE_DETAILS>();
            await this.mngDevicesService.updateDeviceStatus(this._deviceTokenEntry[TokenEntry_Enum.UserID], device.DEVICE_ID, this.changeDevStatus)
                .catch(this.httpService.handleError).then(async (resp: Response) => {
                    webresp = resp.json() as AtParWebApiResponse<MT_ATPAR_DEVICE_DETAILS>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success:
                            await this.BindDataGrid();
                            this.growlMessage = [];
                            this.statusMessage = "Status Changed Successfully";
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                            break;
                        case StatusType.Error:
                            this.BindDataGrid();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });

                            break;
                        case StatusType.Warn:
                            this.BindDataGrid();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });

                            break;
                    }
                    this.spinnerService.stop();
                });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg,"changeStatus");
        }
    }

    public saveDevice() {
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            this.mngDevicesService.saveDevice(this._deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceDetails.DEVICE_ID, this.deviceDetails.DESCRIPTION, this.deviceDetails.MAC_ADDRESS)
                .catch(this.httpService.handleError).map((webresp: Response) => webresp.json() as AtParWebApiResponse<MT_ATPAR_DEVICE_DETAILS>).subscribe((webresp) => {
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.statusMessage = "Device " + this.deviceDetails.DEVICE_ID + " Created Successfully";
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                            this.deviceDetails = new MT_ATPAR_DEVICE_DETAILS();
      
                            this.deviceDetails.DEVICE_ID = "";
                            this.deviceDetails.DESCRIPTION = "";
                            this.deviceDetails.MAC_ADDRESS = "";

                            this.loading = true;
                            this.showAddButton = false;
                            this.table = false;
                            document.getElementById('DEVICE_ID').focus();
                            this.deviceIDStatus = 1;
                            this.descStatus = 1;
                            this.macAddressStatus = 1;
                            break;

                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            if (webresp.StatusCode === AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION)
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Warn, detail: "DeviceID " + this.deviceDetails.DEVICE_ID + " already exists " });
                            else
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            if (webresp.StatusCode === AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION)
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: "DeviceID " + this.deviceDetails.DEVICE_ID + " already exists " });
                            else
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                            break;
                        }
                    }
                });
        } catch (exMsg) {
            this.clientErrorMsg(exMsg,"saveDevice");
        }
    }

    public updateDevice() {
        this.showAddButton = false;
        this.table = false;
        this.growlMessage = [];
        try {
            let webresp = new AtParWebApiResponse<MT_ATPAR_DEVICE_DETAILS>();
            this.spinnerService.start();
            this.mngDevicesService.updateDevice(this._deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceDetails.DEVICE_ID, this.deviceDetails.DESCRIPTION, this.oldMacAddress, this.deviceDetails.MAC_ADDRESS)
                .catch(this.httpService.handleError).then((resp: Response) => {
                    webresp = resp.json() as AtParWebApiResponse<MT_ATPAR_DEVICE_DETAILS>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.statusMessage = "Device Updated Successfully";
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                            document.getElementById('DESCRIPTION').focus();
                            this.lstAuditData = new Array<MT_ATPAR_SECURITY_AUDIT>();

                            if (this.oldDescription != this.deviceDetails.DESCRIPTION) {
                                this.auditData = new MT_ATPAR_SECURITY_AUDIT();
                                this.auditData.FIELD_NAME = "DESCRIPTION";
                                this.auditData.OLD_VALUE = this.oldDescription
                                this.auditData.NEW_VALUE = this.deviceDetails.DESCRIPTION;
                                this.auditData.KEY_1 = this.deviceDetails.DEVICE_ID;
                                this.auditData.KEY_2 = this.deviceDetails.DESCRIPTION;
                                this.auditData.KEY_3 = this.deviceDetails.MAC_ADDRESS;
                                this.auditData.KEY_4 = '';
                                this.auditData.KEY_5 = '';
                                this.lstAuditData.push(this.auditData);
                                if (this.auditSatus == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                    this.spinnerService.start();

                                    this.commonService.insertAuditData(this.lstAuditData, this._deviceTokenEntry[TokenEntry_Enum.UserID], this.menuCode).
                                        catch(this.httpService.handleError).then((res: Response) => {
                                            let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;
                                            this.spinnerService.stop();
                                            switch (response.StatType) {
                                                case StatusType.Success: {
                                                    break;
                                                }
                                                case StatusType.Warn: {
                                                    this.growlMessage = [];
                                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
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
                                        });
                                }
                            }
                            document.getElementById('DEVICE_ID').focus();
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
            this.clientErrorMsg(exMsg,"updateDevice");
        }
    }

    ngOnDestroy() {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstDevices = null
        this.lstAuditData = null;
        this.auditData = null;
        this.deviceDetails = null;
        this.ddlStatusType = null;
        this.oldDescription = "";
        this.disableDevStatus = false;
        this.deviceIDStatus = undefined;
        this.descStatus = undefined;
        this.macAddressStatus = undefined;
    }

    bindModelDataChange(event: any) {
        try {
            if ("DEVICE_ID" == event.TextBoxID.toString()) {
                this.deviceIDStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("DESCRIPTION" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("MAC_ADDRESS" == event.TextBoxID.toString()) {
                this.macAddressStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.mode == ModeEnum[ModeEnum.Add].toString()) {
                if (this.deviceIDStatus == 0 && this.descStatus == 0 && this.macAddressStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            if (this.mode == ModeEnum[ModeEnum.Edit].toString()) {
                if (this.descStatus == 0 && this.macAddressStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
        } catch (exMsg) {
            this.clientErrorMsg(exMsg,"bindModelDataChange");
        }
    }

}