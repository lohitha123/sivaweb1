
import {
    Component,
    OnInit,
    Output,
    EventEmitter
} from '@angular/core';

import {
    Http,
    Response
} from "@angular/http";

import { Title } from '@angular/platform-browser';

import { TrackITCreateRequestService } from './trackit-create-request.service';
import { AtParWebApiResponse } from '../../Shared/AtParWebApiResponse';

import {
    TokenEntry_Enum,
    ClientType,
    StatusType,
    BusinessType,
    EnumApps,
    enum_TKIT_EQP_TYPE
} from '../../Shared/AtParEnums';

import {
    Message,
    SelectItem
} from '../../components/common/api';

import { TkitHttpService } from '../../Shared/tkitHttpService';
import { AtParConstants } from '../../Shared/AtParConstants';
import { AtparStatusCodes } from '../../Shared/AtParStatusCodes';
import { SpinnerService } from '../../components/spinner/event.spinner.service';
import { AtParTrackITCommonService } from '../../Shared/atpar-trackit-common.service';
import { VM_TKIT_EQPITEMS } from '../../Entities/VM_TKIT_EQPITEMS';
import { RM_SHIP_TO_LOCACTION } from '../../Entities/RM_SHIP_TO_LOCACTION';
import { MT_ATPAR_PATIENT_CACHE } from '../../Entities/MT_ATPAR_PATIENT_CACHE';
import { TKIT_CART_MANAGER } from '../../Entities/TKIT_CART_MANAGER';
import { TKIT_ITEM_TYPE } from '../../Entities/TKIT_ITEM_TYPE';

import {
    List,
    Enumerable
} from 'linqts';

import { asEnumerable } from 'linq-es5';
import { SSL_CONFIG_DETAILS } from '../../Entities/SSL_CONFIG_DETAILS';

declare var module: {
    id: string; supp
}


@Component({

    templateUrl: 'trackit.create.request.component.html',
    providers: [
        TkitHttpService,
        AtParConstants,
        TrackITCreateRequestService,
        AtParTrackITCommonService
    ],
})

export class CreateRequestComponent implements OnInit {

    @Output() oncountbuttonclicked: EventEmitter<number> = new EventEmitter<number>();
    countvalue: number = 0;
    tkitDeviceTokenEntry: string[] = [];
    lstEqpTypes: SelectItem[];
    lstEqpTypesTemp: TKIT_ITEM_TYPE[];
    selectedEqpmtType: string;
    growlMessage: Message[];
    lstFilteredItems: any = [];
    selectedOrgGroupId: string;
    selectedDescription: string;
    orgGrpID: string = "";
    orgGrpIDData: string = "";
    lstItems: any = [];
    lstEqItems: VM_TKIT_EQPITEMS[];
    lstEqItemsDetails: VM_TKIT_EQPITEMS[];
    lstPatients: MT_ATPAR_PATIENT_CACHE[];
    lstLocations: SelectItem[] = [];
    selectedLocation: string = "";
    blnShowPatientsPopup: boolean = false;
    blnShowSearchForm: boolean = false;
    blnShowCard: boolean = false;
    selectedRow: VM_TKIT_EQPITEMS;
    selectedAccountNumber: string;
    ordernumber: number = null;
    trackItAppId: number = EnumApps.TrackIT
    eqpIndicator: string = "";
    recordsPerPageSize: number;

    blnShowPatientCharge: boolean = false;
    blnShowItemImage: boolean = false;
    blnShowQtyAvailable: boolean = false;
    blnShowSelectQty: boolean = false;
    blnShowDueDateTime: boolean = false;
    blnShowAvailableTo: boolean = false;
    blnShowReturnDateTime: boolean = false;

    defaultReportDuration: number;
    requestorDefaultLocation: string = "";
    requestQty: number = 1;
    statusCode: number = -1;
    now: any = null;
    time: any;
    imgBasePath: string = "";

    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    ipAddress: string;

    public constructor(
        private service: TrackITCreateRequestService,
        private spinnerService: SpinnerService,
        public atParCommonService: AtParTrackITCommonService,
        private httpService: TkitHttpService,
        private title: Title,
        private atParConstant: AtParConstants
    ) {

        this.title.setTitle('TrackIT - Create Request');
    }



    addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    async getLatestValue() {
        await this.service.getLatestValue(this.trackItAppId, "ORDER_NUMBER").
            catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json();
                this.ordernumber = data.DataVariable;
            });
    }


    add() {

    }

    edit() {

    }

    save() {

    }

    ddlEqTypeChanged() {
        this.growlMessage = [];
        this.blnShowCard = false;
        this.blnShowPatientsPopup = false;
        this.selectedDescription = '';


        //if (this.selectedEqpmtType == "Select One" || this.selectedEqpmtType == '' || this.selectedEqpmtType == undefined) {
        //    this.growlMessage = [];
        //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Equipment Type" });
        //    return;
        //}
        //else {
        //    this.getSearchItems();
        //}
    }

    async getSearchItems() {

        try {

            // Indicator for the selected type

            let selectedIndicator = asEnumerable(this.lstEqpTypesTemp).Where(x => x.ITEM_TYPE === this.selectedEqpmtType).Select(x => x.ITEM_TYPE_INDICATOR).ToArray();

            this.spinnerService.start();
            await this.service.getItemsForAutoSearch(this.selectedEqpmtType, selectedIndicator[0].toString()).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstFilteredItems = data.DataList;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex, "getSearchItems");
        }

    }

    go() {
        this.blnShowCard = true;
        this.blnShowSearchForm = true;

        if (this.selectedEqpmtType == null || this.selectedEqpmtType == undefined || this.selectedEqpmtType == "" || this.selectedEqpmtType == "Select One") {
            this.lstEqItemsDetails = [];
            this.blnShowCard = false;
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment Type" });
            return;
        }

        if (this.selectedDescription == null || this.selectedDescription == undefined || this.selectedDescription == "") {
            this.lstEqItemsDetails = [];
            this.blnShowCard = false;
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Search the item to add to the Cart" });
            return;
        }

        this.getEqItems();
    }


    patientPopupClose() {
        this.blnShowCard = true;
        this.blnShowPatientsPopup = false;
        this.blnShowSearchForm = true;
    }

    async ngOnInit() {
        this.blnShowCard = false;
        this.blnShowPatientsPopup = false;
        this.blnShowSearchForm = true;
        this.tkitDeviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
        this.recordsPerPageSize = + this.tkitDeviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.lstEqpTypes = [];
        this.lstEqpTypes.push({ label: "Select One", value: "Select One" })
        await this.populateEquipmentTypes();
        this.lstEqItemsDetails = new Array<VM_TKIT_EQPITEMS>();
        await this.bindLocations();
        await this.getOrgGroupParamValue();
        await this.getRequestorDefaultLocation();
        await this.setImgPath();
        await this.getDefDateRange();
        if (localStorage.getItem('tkitViewCartItemsCount') != null && localStorage.getItem('tkitViewCartItemsCount') != undefined && localStorage.getItem('tkitViewCartItemsCount') != '') {
            this.countvalue = parseInt(localStorage.getItem('tkitViewCartItemsCount').toString());
        }

    }

    async setImgPath() {
        await this.atParCommonService.getServerIP()
            .catch(this.httpService.handleError)
            .then((res: Response) => {
                var data = res.json() as AtParWebApiResponse<string>;
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.ipAddress = data.DataVariable.toString();
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                //if (data.StatType != StatusType.Success) {
                //    html = '';
                //    return html;
                //}
            });


        await this.atParCommonService.getSSLConfigDetails()
            .catch(this.httpService.handleError)
            .then((res: Response) => {
                this.growlMessage = [];
                var data = res.json() as AtParWebApiResponse<SSL_CONFIG_DETAILS>;
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.gstrProtocal = data.Data.PROTOCOL.toString();
                        this.gstrServerName = data.Data.SERVER_NAME.toString();
                        this.gstrPortNo = data.Data.PORT_NO.toString();
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                //if (data.StatType != StatusType.Success) {
                //    html = '';
                //    return html;
                //}

            });

    }

    OnDestroy() {
        this.tkitDeviceTokenEntry = [];
        this.blnShowCard = false;
    }

    async getEqItems() {

        this.lstEqItems = [];
        if (this.selectedDescription != null && this.selectedDescription != undefined && this.selectedDescription != "") {

            let value = this.selectedDescription.split(" (")[0];

            try {
                this.blnShowCard = false;
                this.spinnerService.start();
                await this.service.getEquipmentItems(this.selectedEqpmtType, value).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<VM_TKIT_EQPITEMS>;;
                        this.growlMessage = [];

                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.eqpIndicator = data.DataVariable.toString();
                                this.lstEqItems = data.DataList;
                                if (this.lstEqItems.length > 0) {
                                    this.blnShowCard = true;
                                }

                                this.bindDetails();
                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Warn: {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }

                    });


            } catch (ex) {
                this.clientErrorMsg(ex, "getSearchItems");
            }

        }
        else {
            this.lstEqItemsDetails = [];
            this.blnShowCard = false;
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Search the item to add to the cart" });
            return;
        }
    }

    async bindLocations() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            this.lstLocations = [];
            await this.service.getLocations().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<RM_SHIP_TO_LOCACTION>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {

                            for (var i = 0; i < data.DataList.length; i++) {
                                this.lstLocations.push({ label: data.DataList[i].LOCATION_ID + ' - ' + data.DataList[i].LOCATION_NAME, value: data.DataList[i].LOCATION_ID })
                            }

                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    async getRequestorDefaultLocation() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];

            await this.service.getRequestorDefaultLocation().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.requestorDefaultLocation = data.DataVariable.toString();
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    async bindPatients(itemID) {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            await this.service.getPatients(itemID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_PATIENT_CACHE>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstPatients = data.DataList;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    async bindDetails() {
        this.imgBasePath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/Web/Uploaded';

        this.blnShowItemImage = true;
        this.blnShowQtyAvailable = true;
        this.blnShowSelectQty = true;
        this.blnShowDueDateTime = true;
        this.blnShowAvailableTo = true;
        this.blnShowReturnDateTime = true;
        //YesNo_Enum[YesNo_Enum.N].toString()

        if (this.eqpIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.B].toString()) {
            this.blnShowItemImage = false;
            this.blnShowQtyAvailable = false;
            this.blnShowSelectQty = false;
            //this.blnShowDueDateTime = false;               
        }
        else if (this.eqpIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.E].toString()) {
            this.blnShowQtyAvailable = false;
            this.blnShowSelectQty = true;
            this.blnShowReturnDateTime = true;
            this.blnShowDueDateTime = true;
        }
        else if (this.eqpIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.F].toString()) {
            this.blnShowDueDateTime = false;
            this.blnShowAvailableTo = false;
            this.blnShowReturnDateTime = false;
            this.blnShowDueDateTime = true;
            this.blnShowSelectQty = true;
        }

        this.lstEqItems.forEach((item) => {
            if (item.IMAGE != "" && item.IMAGE != null && item.IMAGE != undefined) {
                item.IMAGE = this.imgBasePath + '/' + item.IMAGE;
            }
            else {
                item.IMAGE = '';
            }
            item.DELIVER_LOC = '';
            item.DUE_TIME = this.getCurrentTime();
            item.DUE_DATE = new Date();
            if (this.eqpIndicator !== enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.E].toString()) {
                item.RETURN_DATE = this.addDays(item.DUE_DATE, this.defaultReportDuration);
                item.RETURN_TIME = this.getCurrentTime();
            }
            else {
                item.RETURN_DATE = "";
                item.RETURN_TIME = "";
            }
        });

        this.lstEqItemsDetails = [];
        for (let k = 0; k < this.lstEqItems.length; k++) {
            this.lstEqItems[k].DELIVER_LOC = this.requestorDefaultLocation;
            if (this.lstEqItems[k].ITEM_QTY != 0) {
                this.lstEqItemsDetails.push(this.lstEqItems[k]);
            }

        }
    }


    getCurrentTime() {
        var now = new Date();
        var isPM = now.getHours() >= 12;
        var isMidday = now.getHours() == 12;
        this.time = [now.getHours() - (isPM && !isMidday ? 12 : 0),
        now.getMinutes(),].join(':');
        var minutes: string[] = this.time.split(':');
        if (minutes[1].length > 1) {
            this.time = this.time;
        }
        else {
            this.time = minutes[0] + ":" + "0" + minutes[1];
        }
        if (isPM) {
            this.time = this.time + " " + "PM"
        }
        else {
            this.time = this.time + " " + "AM"
        }
        return this.time;
    }
    async fillItemsAuto(event) {


        this.lstFilteredItems = [];
        let query = event.query;

        try {
            if (this.selectedEqpmtType != null && this.selectedEqpmtType != undefined && this.selectedEqpmtType != "" && this.selectedEqpmtType != "Select One") {
                let selectedIndicator = asEnumerable(this.lstEqpTypesTemp).Where(x => x.ITEM_TYPE === this.selectedEqpmtType).Select(x => x.ITEM_TYPE_INDICATOR).ToArray();

                await this.service.getItemsForAutoSearch(this.selectedEqpmtType, selectedIndicator[0].toString()).
                    catch(this.httpService.handleError).then((res: Response) => {
                        this.spinnerService.stop();
                        let data = res.json();
                        this.growlMessage = [];
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.lstItems = data.DataList;
                                this.lstFilteredItems = this.filterBusinessUnits(query, this.lstItems);
                                break;
                            }
                            case StatusType.Warn: {
                                if (data.StatusCode != AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                }
                                break;
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
            else {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment Type" });
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fillItemsAuto");
        }


    }

    filterBusinessUnits(query, businessunits: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < businessunits.length; i++) {
                let Bunitvalue = businessunits[i];

                filtered.push(Bunitvalue.ITEM_DESCR + " " + "(" + Bunitvalue.ITEM_ID + ")");
            }

        } else {
            if (query.length >= 1) {
                for (let i = 0; i < businessunits.length; i++) {
                    let Bunitvalue = businessunits[i];
                    Bunitvalue = Bunitvalue.ITEM_DESCR + " " + "(" + Bunitvalue.ITEM_ID + ")";
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }


        return filtered;
    }

    async populateEquipmentTypes() {
        this.spinnerService.start();
        try {
            await this.service.getEquipmentType(this.tkitDeviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<TKIT_ITEM_TYPE>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            this.lstEqpTypes = [];
                            this.lstEqpTypesTemp = [];
                            this.lstEqpTypes.push({ label: "Select One", value: "Select One" })
                            if (data.DataList != null && data.DataList != undefined) {
                                this.lstEqpTypesTemp = data.DataList;
                                for (var i = 0; i < data.DataList.length; i++) {
                                    this.lstEqpTypes.push({ label: data.DataList[i].ITEM_TYPE_DESCR + ' ( ' + data.DataList[i].ITEM_TYPE + ' ) ', value: data.DataList[i].ITEM_TYPE })
                                }
                            }
                            break;

                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateEquipmentTypes");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    async patientClick(item) {
        this.selectedRow = item;
        this.selectedAccountNumber = item.PATIENT_ID;
        this.blnShowCard = false;
        this.blnShowSearchForm = false;
        this.blnShowPatientsPopup = true;
        this.bindPatients(item.ITEM_ID);
    }

    clearPatientSelection() {
        this.selectedAccountNumber = "";
        this.selectedRow.PATIENT = "";
        this.selectedRow.PATIENT_ID = "";
    }

    async grdRdbtnChanged(event) {
        try {
            let selectedPatient: any;
            if (event == undefined || event == null) {
                if (this.lstPatients != null && this.lstPatients.length == 1) {
                    selectedPatient = this.lstPatients[0]
                } else { return; }

            }
            else {
                selectedPatient = this.lstPatients.filter(x => x.PATIENT_MRC == event)[0];
            }

            console.log(event);
            this.selectedRow.PATIENT = selectedPatient.PATIENT_NAME;
            this.selectedRow.PATIENT_ID = selectedPatient.PATIENT_MRC;
        }
        catch (ex) {

            this.clientErrorMsg(ex, "grdRdbtnChanged");
        }
    }

    async getOrgGroupParamValue() {

        await this.service.getOrgGroupParamValue(this.tkitDeviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.trackItAppId, "PATIENT_CHARGE").
            catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json();

                switch (data.StatType) {
                    case StatusType.Success: {
                        if (data.DataVariable == "Y") {
                            this.blnShowPatientCharge = true;
                        }
                        else {
                            this.blnShowPatientCharge = false;
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            });
    }

    async addToCartClick(item: VM_TKIT_EQPITEMS) {
        let currentTime = new Date();

        if (this.eqpIndicator != enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.B].toString()) {
            if (item.REQUEST_QTY == null || item.REQUEST_QTY == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Select Qty" });
                return;
            }
        }
        if (this.eqpIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.B].toString() || this.eqpIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.F].toString()) {
            if ((item.RETURN_TIME == null || item.RETURN_TIME == "") || (item.DUE_TIME == null || item.DUE_TIME == "")) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Time(HH:MM)" });
                return;
            }
        }
        else {
            if (item.RETURN_DATE != null && item.RETURN_DATE != "") {
                if ((item.RETURN_TIME == null || item.RETURN_TIME == "") || (item.DUE_TIME == null || item.DUE_TIME=="")) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Time(HH:MM)" });
                    return;
                }
            }
        }
        this.spinnerService.start();

        let cartManager = new TKIT_CART_MANAGER();

        cartManager.ORG_GROUP_ID = this.tkitDeviceTokenEntry[TokenEntry_Enum.OrgGrpID].toString();
        cartManager.REQUESTOR_ID = this.tkitDeviceTokenEntry[TokenEntry_Enum.UserID].toString();
        cartManager.ITEM_ID = item.ITEM_ID;
        cartManager.ITEM_DESCR = item.ITEM_DESCR;
        cartManager.REQUEST_QTY = item.REQUEST_QTY;
        cartManager.LOCATION_ID = item.DELIVER_LOC;
        cartManager.PATIENT_ID = item.PATIENT_ID;
        cartManager.PATIENT_LAST_NAME = item.PATIENT;
        cartManager.PROCEDURE_CODE = "";
        cartManager.REQUEST_FOR_USE_DATE = new Date();
        cartManager.SERIAL_NO = item.SERIAL_NO.toString();

        if (item.DUE_TIME != this.time) {
            var dateStr = new Date(item.DUE_TIME).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            item.DUE_TIME = dateStr.replace(',', '')
            let datepart = item.DUE_TIME.split(' ');
            if (datepart != null && datepart.length > 0) {
                var time = datepart[1].split(':');
                item.DUE_TIME = time[0] + ':' + time[1] + ' ' + datepart[2];
            }


        }

        if (item.DUE_DATE != null && item.DUE_DATE != "") {
            var dateStr = new Date(item.DUE_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            item.DUE_DATE = dateStr.replace(',', '')
            let datepart = item.DUE_DATE.split(' ');
            if (datepart != null && datepart.length > 0) {
                cartManager.NEEDED_BY_DATE = datepart[0] + " " + item.DUE_TIME;
            }
        }

        if (this.eqpIndicator != enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.F].toString()) {
            if (item.RETURN_TIME != this.time) {
                var dateStr = new Date(item.RETURN_TIME).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                item.RETURN_TIME = dateStr.replace(',', '')
                let datepart = item.RETURN_TIME.split(' ');
                if (datepart != null && datepart.length > 0) {
                    var time = datepart[1].split(':');
                    item.RETURN_TIME = time[0] + ':' + time[1] + ' ' + datepart[2];
                }


            }
            var dateStr = new Date(item.RETURN_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            item.RETURN_DATE = dateStr.replace(',', '')

            if (item.RETURN_DATE != null && item.RETURN_DATE != "") {
                let datepart = item.RETURN_DATE.split(' ');
                if (datepart != null && datepart.length > 0) {
                    cartManager.ESTIMATED_RETURN_DATE = datepart[0] + " " + item.RETURN_TIME;
                }
            }
        }
        if (Date.parse(item.DUE_DATE.toString()) && Date.parse(item.RETURN_DATE.toString())) {
            if (Date.parse(this.convertDateFormate(item.DUE_DATE)) < Date.parse(this.convertDateFormate(currentTime.toString()))) {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Neededby Date Time must be greater than or equal to current date"
                });

                return false;
            }
        }
        if (Date.parse(item.DUE_DATE.toString()) && Date.parse(item.RETURN_DATE.toString())) {
            if (Date.parse(item.DUE_DATE) > Date.parse(item.RETURN_DATE)) {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Estimated Return Date should be greater than Needed by Date" });
                return false;
            }
        }
        if (item.ITEM_QTY && item.REQUEST_QTY) {
            if (item.REQUEST_QTY > item.ITEM_QTY) {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Requested quantity should not be greater than available quantity" });
                return false;
            }
        }
        this.growlMessage = [];
        await this.service.addToCart(this.eqpIndicator, cartManager).
            catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<number>;
                this.spinnerService.stop();
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.growlMessage = [];
                        let msg = "Item :" + cartManager.ITEM_ID + " Added to the Cart Successfully"
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                        this.blnShowCard = false;
                        this.selectedDescription = "";
                        this.selectedEqpmtType = "Select One";
                        // to do need to remove the item from list
                        //let eqItems = this.lstEqItemsDetails;
                        //this.lstEqItemsDetails = [];
                        //for (let i = 0; i < eqItems.length; i++){
                        //    let checkItem = eqItems.filter(x => x.ITEM_ID == cartManager.ITEM_ID);

                        //    if (checkItem != null && checkItem.length != 1) {
                        //        this.lstEqItemsDetails.push(eqItems[i]);
                        //    }

                        //}

                        //this.lstEqItemsDetails.slice()

                        //count updating
                        if (this.eqpIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.B].toString()) {
                            this.countvalue = parseInt(this.countvalue.toString()) + 1;
                        }
                        else {
                            this.countvalue = parseInt(this.countvalue.toString()) + parseInt(cartManager.REQUEST_QTY.toString());
                        }
                        localStorage.setItem('tkitViewCartItemsCount', this.countvalue.toString());
                        this.spinnerService.emitCountChangedValue(this.countvalue);
                        this.oncountbuttonclicked.emit(this.countvalue);


                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        var msg = data.StatusMessage.replace("1%", item.ITEM_ID).replace("2%", item.DELIVER_LOC);
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }

            });


    }

    async getDefDateRange() {
        try {
            await this.service.getTKITMyPreferences("DEFAULT_REPORT_DURATION", this.tkitDeviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.defaultReportDuration = parseInt(data.DataVariable.toString());
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }
}
