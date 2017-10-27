
import {
    Component,
    OnInit
} from '@angular/core';

import {
    Http,
    Response
} from "@angular/http";

import { Title } from '@angular/platform-browser';

import { TrackITDashBoardService } from './trackit-dashboard.service';
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
import { TKIT_ORDER_HEADER } from '../../Entities/TKIT_ORDER_HEADER';
import { TKIT_ORDER_DETAILS } from '../../Entities/TKIT_ORDER_DETAILS';
import { SSL_CONFIG_DETAILS } from '../../Entities/SSL_CONFIG_DETAILS';

/**
*	This class represents the lazy loaded HomeComponent.
*/
declare var module: {
    id: string;
}

@Component({
    templateUrl: 'trackit.body.component.html',
    providers: [
        TkitHttpService,
        AtParConstants,
        TrackITDashBoardService,
        AtParTrackITCommonService
    ],

})

export class TrackITBodyComponent implements OnInit {
    growlMessage: Message[];
    blnShowHeaderGrid: boolean = false;
    blnShowDetailsGrid: boolean = false;
    lstOrderHeaders: TKIT_ORDER_HEADER[];
    lstOrderDetails: TKIT_ORDER_DETAILS[];
    orderNumber: number;
    showDiv: boolean = true;
    recordsPerPageSize: number;
    deviceTokenEntry: string[] = [];
    ddlStatusLst: any;
    imgBasePath: string = "";
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    ipAddress: string;

    public constructor(
        private service: TrackITDashBoardService,
        private spinnerService: SpinnerService,
        public atParCommonService: AtParTrackITCommonService,
        private httpService: TkitHttpService,
        private title: Title,
        private atParConstant: AtParConstants
    ) {

        this.title.setTitle('TrackIT - Dashboard');
    }
    goback() {
        this.blnShowHeaderGrid = true;
        this.blnShowDetailsGrid = false;
        this.showDiv = true
    }
    showOrderDetails(item: TKIT_ORDER_HEADER) {
        this.orderNumber = item.ORDER_NUMBER;
        this.blnShowHeaderGrid = false;
        this.blnShowDetailsGrid = true;
        this.showDiv = true;
        this.getOrderDetails();
    }

    async ngOnInit() {
        await this.setImgPath();
        await this.getOrderHeaders();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.ddlStatusLst = [];
        this.ddlStatusLst.push({ label: "ALL", value: "" });
        this.ddlStatusLst.push({ label: "OPEN", value: "OPEN" });
        this.ddlStatusLst.push({ label: "PICK", value: "PICK" });
        this.ddlStatusLst.push({ label: "LOAD", value: "LOAD" });
        this.ddlStatusLst.push({ label: "UNLOAD", value: "UNLOAD" });
        this.ddlStatusLst.push({ label: "DELIVERED", value: "DELV" });
        this.ddlStatusLst.push({ label: "CANCELLED", value: "CANCELLED" });
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

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    OnDestroy() {
        this.lstOrderHeaders = [];
        this.lstOrderDetails = [];
    }

    async getOrderHeaders() {

        this.lstOrderHeaders = [];

        try {
            this.blnShowDetailsGrid = false;
            this.spinnerService.start();
            await this.service.getOrderHeaders().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<TKIT_ORDER_HEADER>;;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showDiv = true
                          
                            this.lstOrderHeaders = data.DataList;

                            if (this.lstOrderHeaders != null && this.lstOrderHeaders.length > 0) {
                                this.blnShowHeaderGrid = true;
                                for (let i = 0; i < this.lstOrderHeaders.length; i++) {

                                    let changeDate = this.lstOrderHeaders[i].ORDER_DATE;
                                    var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                    this.lstOrderHeaders[i].ORDER_DATE = dateStr.replace(',', '')
                                }
                            }

                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.blnShowHeaderGrid = false;
                            this.showDiv = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.blnShowHeaderGrid = false;
                            this.showDiv = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.blnShowHeaderGrid = false;
                            this.showDiv = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex, "getOrderHeaders");
        }
    }

    async getOrderDetails() {

        this.lstOrderDetails = [];
        this.imgBasePath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/Web/Uploaded';
        try {

            this.spinnerService.start();
            await this.service.getOrderDetails(this.orderNumber).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<TKIT_ORDER_DETAILS>;;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showDiv = true;
                            this.blnShowDetailsGrid = true;
                            this.lstOrderDetails = data.DataList;
                            console.log(data.DataList);
                            this.lstOrderDetails.forEach((item) => {
                                if (item.IMAGE == null)
                                {
                                    item.IMAGE = '';
                                }
                                if (item.IMAGE != "" && item.IMAGE != null && item.IMAGE != undefined) {
                                    item.IMAGE = this.imgBasePath+ '/' + item.IMAGE;
                                }
                            });

                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.blnShowDetailsGrid = false;
                            this.showDiv = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.blnShowDetailsGrid = false;
                            this.showDiv = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.blnShowDetailsGrid = false;
                            this.showDiv = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex, "getOrderDetails");
        }



    }

}
