import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { TrackITViewCartService } from './trackit-view-cart.service';
import { AtParWebApiResponse } from '../../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType, StatusType, BusinessType, EnumApps, enum_TKIT_EQP_TYPE } from '../../Shared/AtParEnums';
import { Message, SelectItem } from '../../components/common/api';
import { TkitHttpService } from '../../Shared/tkitHttpService';
import { AtParConstants } from '../../Shared/AtParConstants';
import { AtparStatusCodes } from '../../Shared/AtParStatusCodes';
import { SpinnerService } from '../../components/spinner/event.spinner.service';
import { AtParTrackITCommonService } from '../../Shared/atpar-trackit-common.service';
import { RM_SHIP_TO_LOCACTION } from '../../Entities/RM_SHIP_TO_LOCACTION';
import { MT_ATPAR_PATIENT_CACHE } from '../../Entities/MT_ATPAR_PATIENT_CACHE';
import { TKIT_CART_MANAGER } from '../../Entities/TKIT_CART_MANAGER';
import { VM_VIEW_CART } from '../../Entities/VM_VIEW_CART';
import { Menus } from '../../AtPar/Menus/routepath';
import { ConfirmationService } from '../../components/common/api';
import { Title, DOCUMENT } from '@angular/platform-browser';
import { SSL_CONFIG_DETAILS } from '../../Entities/SSL_CONFIG_DETAILS';

declare var module: {
    id: string;
}


@Component({

    templateUrl: 'trackit.view.cart.html',
    providers: [
        TkitHttpService,
        AtParConstants,
        TrackITViewCartService,
        AtParTrackITCommonService,
        ConfirmationService
    ],
})

export class ViewCartComponent implements OnInit {

    @Output() oncountbuttonclicked: EventEmitter<number> = new EventEmitter<number>();
    countvalue: number;
    tkitDeviceTokenEntry: string[] = [];
    lstEqpTypes: SelectItem[];
    selectedEqpmtType: string = "";
    growlMessage: Message[];
    lstFilteredItems: any = [];
    selectedOrgGroupId: string;
    orgGrpID: string = "";
    orgGrpIDData: string = "";
    lstItems: any = [];
    lstCartItems: VM_VIEW_CART[];
    lstCartItemDetails: VM_VIEW_CART[];
    lstPatients: MT_ATPAR_PATIENT_CACHE[];
    lstLocations: SelectItem[] = [];
    selectedLocation: string = "";
    blnShowPatientsPopup: boolean = false;
    blnShowCard: boolean = false;

    selectedRow: VM_VIEW_CART;
    selectedAccountNumber: string;
    ordernumber: number = null;
    trackItAppId: number = EnumApps.TrackIT
    eqpIndicator: string = "";
    orderComments: string = "";

    container: boolean = false;
    blnShowPatientCharge: boolean = false;
    blnShowItemImage: boolean = false;
    blnShowQtyAvailable: boolean = false;
    blnShowSelectQty: boolean = false;
    blnShowDueDateTime: boolean = false;
    blnShowAvailableTo: boolean = false;
    blnShowReturnDateTime: boolean = false;
    blnShowEmpty: boolean = false;

    defaultReportDuration: number = 25;
    requestorDefaultLocation: string = "";
    breadCrumbMenu: Menus;
    currentDate: Date;
    strCurrentDate: string = "";

    imgBasePath: string = "";
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    ipAddress: string;

    viewImgPath: string = '';

    public constructor(
        private service: TrackITViewCartService,
        private spinnerService: SpinnerService,
        public atParCommonService: AtParTrackITCommonService,
        private httpService: TkitHttpService,
        private atParConstant: AtParConstants,
        private title: Title,
        private confirmationService: ConfirmationService,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(DOCUMENT) private document
    ) {

        this.title.setTitle('TrackIT - View Cart');
    }


    addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    patientPopupClose() {
        this.blnShowPatientsPopup = false;
        this.blnShowCard = true;
    }

    async ngOnInit() {
        try {
            this.spinnerService.start();
            this.blnShowPatientsPopup = false;
            this.blnShowCard = true;
            this.container = false;
            this.currentDate = new Date();
            this.tkitDeviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
            this.lstCartItemDetails = new Array<VM_VIEW_CART>();
            await this.bindLocations();
            await this.getOrgGroupParamValue();
            await this.setImgPath();
            await this.getCartItems();
        } catch (ex) {
            this.clientErrorMsg(ex, 'ngOnInit');
        }
        finally {
            setTimeout(() => { this.spinnerService.stop(); }, 100);
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
    }

    async bindDetails() {

        this.imgBasePath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/Web/Uploaded';
        this.lstCartItemDetails = [];
        if (this.lstCartItems.length == 0) {
            this.blnShowEmpty = true;
            this.document.getElementById('cart').style.border = "none";
            for (var i = 0; i < document.getElementsByClassName('less-border').length; i++) {
                var div = document.getElementsByClassName('less-border')[i]
                div.setAttribute("style", "border-top:" + "none");
            }
        }
        else {
            for (let k = 0; k < this.lstCartItems.length; k++) {

                if (this.lstCartItems[k].NEEDED_BY_DATE != null && this.lstCartItems[k].NEEDED_BY_DATE != "") {
                    var dateStr = new Date(this.lstCartItems[k].NEEDED_BY_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                    this.lstCartItems[k].NEEDED_BY_DATE = dateStr.replace(',', '')
                    let datepart = this.lstCartItems[k].NEEDED_BY_DATE.split(' ');
                    if (datepart != null && datepart.length > 0) {
                        this.lstCartItems[k].DUE_DATE = datepart[0];
                        this.lstCartItems[k].DUE_TIME = datepart[1].split(':')[0] + ":" + datepart[1].split(':')[1] + " " + datepart[2];
                    }
                }


                if (this.lstCartItems[k].ESTIMATED_RETURN_DATE != null && this.lstCartItems[k].ESTIMATED_RETURN_DATE != "") {
                    var dateStr = new Date(this.lstCartItems[k].ESTIMATED_RETURN_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                    this.lstCartItems[k].ESTIMATED_RETURN_DATE = dateStr.replace(',', '')
                    let datepart = this.lstCartItems[k].ESTIMATED_RETURN_DATE.split(' ');
                    if (datepart != null && datepart.length > 0) {
                        this.lstCartItems[k].RETURN_DATE = datepart[0];
                        this.lstCartItems[k].RETURN_TIME = datepart[1].split(':')[0] + ":" + datepart[1].split(':')[1] + " " + datepart[2];
                    }
                }

                if (this.lstCartItems[k].ITEM_TYPE_INDICATOR == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.B].toString()) {
                    this.lstCartItems[k].blnShowItemImage = false;
                    this.lstCartItems[k].blnShowQtyAvailable = true;
                    this.lstCartItems[k].blnShowSelectQty = false;
                    this.lstCartItems[k].blnShowReturnDateTime = true;
                    this.lstCartItems[k].blnShowDueDateTime = true;
                }
                else if (this.lstCartItems[k].ITEM_TYPE_INDICATOR == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.E].toString()) {
                    this.lstCartItems[k].blnShowItemImage = true;
                    this.lstCartItems[k].blnShowQtyAvailable = true;
                    this.lstCartItems[k].blnShowSelectQty = false;
                    this.lstCartItems[k].blnShowReturnDateTime = true;
                    this.lstCartItems[k].blnShowDueDateTime = true;
                }
                else if (this.lstCartItems[k].ITEM_TYPE_INDICATOR == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.F].toString()) {
                    this.lstCartItems[k].blnShowItemImage = true;
                    this.lstCartItems[k].blnShowQtyAvailable = true;
                    this.lstCartItems[k].blnShowSelectQty = true;
                    this.lstCartItems[k].blnShowDueDateTime = true;
                    this.lstCartItems[k].blnShowReturnDateTime = false;

                }

                if (this.lstCartItems[k].IMAGE != "" && this.lstCartItems[k].IMAGE != null && this.lstCartItems[k].IMAGE != undefined) {
                    //this.lstCartItems[k].IMAGE = this.httpService.BaseUrl + '/Uploaded/' + this.lstCartItems[k].IMAGE;
                    this.lstCartItems[k].IMAGE = this.imgBasePath + '/' + this.lstCartItems[k].IMAGE;
                    this.lstCartItems[k].BMPIMAGE = this.lstCartItems[k].IMAGE.substring(0, this.lstCartItems[k].IMAGE.lastIndexOf('.')) + "_thumb.bmp";

                }

                this.lstCartItemDetails.push(this.lstCartItems[k]);
            }
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    clearPatientSelection() {
        this.selectedAccountNumber = "";
        this.selectedRow.PATIENT_LAST_NAME = "";
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
            this.selectedRow.PATIENT_LAST_NAME = selectedPatient.PATIENT_NAME;
            this.selectedRow.PATIENT_ID = selectedPatient.PATIENT_MRC;
        }
        catch (ex) {

            this.clientErrorMsg(ex, "grdRdbtnChanged");
        }
    }

    // Events

    async patientClick(item) {
        this.selectedRow = item;
        this.selectedAccountNumber = item.PATIENT_ID;
        this.blnShowCard = false;
        this.blnShowPatientsPopup = true;
        this.bindPatients(item.ITEM_ID);
    }

    async deleteItemClick(item: VM_VIEW_CART) {

        try {
            this.spinnerService.start();
            this.growlMessage = [];
            await this.service.deleteCartItem(item.ID).
                catch(this.httpService.handleError).then(async (res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            await this.getCartItems();
                            await this.getRequestedItemsCount();
                            this.growlMessage = [];
                            let msg = "Item :" + item.ITEM_ID + " Deleted from the Cart Successfully"
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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

                });
        } catch (ex) {
            this.clientErrorMsg(ex, 'deleteItemClick');
        }
        finally {
            this.spinnerService.stop();
        }

    }

    async clearCartClick() {
        this.spinnerService.start();
        this.growlMessage = [];
        await this.service.clearCart().
            catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<number>;
                this.spinnerService.stop();
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.lstCartItemDetails = [];
                        this.growlMessage = [];
                        let msg = "All Items from the Cart Deleted Successfully";
                        this.container = false;
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                        this.resetCountValue();
                        this.document.getElementById('cart').style.border = "none";
                        this.blnShowEmpty = true;
                        for (var i = 0; i < document.getElementsByClassName('less-border').length; i++) {
                            var div = document.getElementsByClassName('less-border')[i]
                            div.setAttribute("style", "border-top:" + "none");
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.container = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.container = false;
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.container = false;
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }

            });
    }

    async submitCartClick(event) {
        this.strCurrentDate = this.formateDate(this.currentDate);

        for (let i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
            if (this.lstCartItemDetails[i].DUE_DATE == null || this.lstCartItemDetails[i].DUE_DATE == undefined || this.lstCartItemDetails[i].DUE_DATE === "") {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Due Date (MM/DD/YYYY)"
                });
                return;
            }
        }
        for (let i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
            if (this.lstCartItemDetails[i].DUE_TIME == null || this.lstCartItemDetails[i].DUE_TIME == undefined || this.lstCartItemDetails[i].DUE_TIME === "") {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Due Time (HH:MM)"
                });
                return;
            }
        }
        for (let i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
            if (this.lstCartItemDetails[i].ITEM_TYPE_INDICATOR != "F") {
                if (this.lstCartItemDetails[i].RETURN_DATE == null || this.lstCartItemDetails[i].RETURN_DATE == undefined || this.lstCartItemDetails[i].RETURN_DATE === "") {
                    this.growlMessage = [];
                    this.growlMessage.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Return Date (MM/DD/YYYY)"
                    });
                    return;
                }
            }
            else {
                this.growlMessage = [];
            }
        }

        for (let i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
            if (this.lstCartItemDetails[i].ITEM_TYPE_INDICATOR != "F") {
                if (this.lstCartItemDetails[i].RETURN_TIME == null || this.lstCartItemDetails[i].RETURN_TIME == undefined || this.lstCartItemDetails[i].RETURN_TIME === "") {
                    this.growlMessage = [];
                    this.growlMessage.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Return Time (HH:MM)"
                    });
                    return;
                }
            }
            else {
                this.growlMessage = [];
            }
        }
        for (let i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
            if (this.lstCartItemDetails[i].REQUEST_QTY > this.lstCartItemDetails[i].ITEM_QTY) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Requested quantity greater than available quantity" });
                return;
            }
        }
        for (let i = 0; i <= this.lstCartItemDetails.length - 1; i++) {
            var strDueDate = this.formateDate(this.lstCartItemDetails[i].DUE_DATE);
            var strReturnDate = this.formateDate(this.lstCartItemDetails[i].RETURN_DATE);
            if (this.lstCartItemDetails[i].ITEM_TYPE_INDICATOR != "F") {
                if (strDueDate < this.strCurrentDate) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Due Date/Time must be greater than or equal to current date" });
                    return;
                }
                else if (Date.parse(strReturnDate) < Date.parse(strDueDate)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Return Date should be greater than Due Date" });
                    return;
                }
            }
            else {
                this.growlMessage = [];
            }
        }
        this.growlMessage = [];
        this.spinnerService.start();
        let requestor: string = localStorage.getItem("tkituserName");
        await this.service.submitCart(this.lstCartItemDetails, this.orderComments, requestor, this.tkitDeviceTokenEntry[TokenEntry_Enum.UserID]).
            catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<number>;
                this.spinnerService.stop();
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.container = false;
                        this.growlMessage = [];
                        let msg = "Your Order has been Placed Successfully"
                        this.container = false;
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                        this.lstCartItemDetails = [];
                        this.resetCountValue();
                        if (this.lstCartItemDetails.length == 0) {
                            this.blnShowEmpty = true;
                        }
                        this.document.getElementById('cart').style.border = "none";
                        // this.document.getElementById('less-border').style.border.top = "none";
                        for (var i = 0; i < document.getElementsByClassName('less-border').length; i++) {
                            var div = document.getElementsByClassName('less-border')[i]
                            div.setAttribute("style", "border-top:" + "none");
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.container = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.container = false;
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.container = false;
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }

            });
    }

    async continueClick() {
        this.breadCrumbMenu = new Menus();
        this.breadCrumbMenu.MENU_NAME = "Create Request";
        this.breadCrumbMenu.ROUTE = 'createrequest';
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.breadCrumbMenu.APP_NAME = 'TrackIT';
        await localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
        this.router.navigate(['trackitdashboard/' + this.breadCrumbMenu.ROUTE]);

    }

    // Data Functions

    async getCartItems() {

        this.lstCartItems = [];
        try {
            await this.service.getCartItems().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_VIEW_CART>;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList.length == 0) {
                                this.container = false;
                                this.blnShowEmpty = true;
                                this.document.getElementById('cart').style.border = "none";
                                for (var i = 0; i < document.getElementsByClassName('less-border').length; i++) {
                                    var div = document.getElementsByClassName('less-border')[i]
                                    div.setAttribute("style", "border-top:" + "none");
                                }
                            }
                            else {
                                this.container = true;
                                this.lstCartItems = data.DataList;
                                this.bindDetails();
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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


        } catch (ex) {
            this.clientErrorMsg(ex, "getSearchItems");
        }
    }

    async bindLocations() {
        try {
            this.growlMessage = [];
            this.lstLocations = [];
            await this.service.getLocations().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<RM_SHIP_TO_LOCACTION>;
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


    async clearCartItems() {
        this.confirmationService.confirm({
            message: "Are you sure you want to clear the cart ?",
            accept: async () => {
                await this.clearCartClick();

            },
            reject: () => {
                return;
            }
        })
    }

    async deleteCartItem(item: VM_VIEW_CART) {
        this.confirmationService.confirm({
            message: "Are you sure you want to Delete the Item?",
            accept: async () => {
                await this.deleteItemClick(item);

            },
            reject: () => {
                return;
            }
        })
    }

    async getRequestedItemsCount() {
        try {
            await this.service.GetRequestedItemsCount()
                .then((res: Response) => {
                    let data = res.json();
                    if (data.DataVariable != null) {
                        this.countvalue = data.DataVariable;
                    }
                    else {
                        this.countvalue = 0;
                    }
                    localStorage.setItem('tkitViewCartItemsCount', this.countvalue.toString());
                    this.spinnerService.emitCountChangedValue(this.countvalue);
                    this.oncountbuttonclicked.emit(this.countvalue);

                })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getRequestedItemsCount");
        }
    }

    resetCountValue() {
        this.countvalue = 0;
        this.spinnerService.emitCountChangedValue(this.countvalue);
        this.oncountbuttonclicked.emit(this.countvalue);
        localStorage.setItem('tkitViewCartItemsCount', this.countvalue.toString());
    }

    formateDate(date): string {

        //var customDate = new Date(date).getMonth().toString() + "/" + new Date(date).getDay().toString() + "/" + new Date(date).getFullYear();
        var today: any = new Date(date);
        var dd: any = today.getDate();
        var mm: any = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;

        return today;

        //return this.archiveDate;
    }

    async onImageEnter(path: string) {
        if (path != '' && path != undefined && path != null) {
            this.viewImgPath = path;
        }
        else {
            this.viewImgPath = '';
        }
    }
}
