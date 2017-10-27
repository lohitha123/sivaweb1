
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { List } from 'linqts';
import { Title } from '@angular/platform-browser';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { TokenEntry_Enum, ClientType, StatusType } from '../Shared/AtParEnums';
import { MT_ATPAR_APP } from '../entities/MT_ATPAR_APP';
import { Message } from './../components/common/api';
import { AtParConstants } from '../Shared/AtParConstants';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-downloads.component.html',
    providers: [HttpService, AtParConstants, Title],
})

export class AtparDownloads implements OnInit {

    private isUploadBtn: boolean = true;
    showStyle: boolean = false;
    isPOUAssign: boolean = false;
    appicon: string = "";
    _deviceTokenEntry: string[] = [];
    appModules: List<MT_ATPAR_APP>;
    msgs: Message[] = [];

    constructor(
        private httpservice: HttpService,
        private http: Http,
        private leftBarAnimationService: LeftBarAnimationService,
        private atParConstant: AtParConstants,
        private spinnerservice: SpinnerService,
        private title: Title
    ) {
        
        try {
            this.showStyle = false;
            this.isPOUAssign = false;
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        } catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }

    ngOnInit() {
        this.appicon = "assets/images/icons/app_icon_.png";
        this.title.setTitle('Downloads');
        try {           
            this.getPOUAssignValue();
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    getPOUAssignValue() {
        try {
            if (this._deviceTokenEntry[TokenEntry_Enum.ProfileID] == 'ADMIN') {
                this.isPOUAssign = true;
            }
            else if (this._deviceTokenEntry[TokenEntry_Enum.ProfileID] == 'VENDOR') {
                this.isPOUAssign = false;
            }
            else {
                this.appModules = new List<MT_ATPAR_APP>();
                if (localStorage.getItem('Apps') != undefined && localStorage.getItem('Apps') != null && localStorage.getItem('Apps') != '') {
                    var appModules = JSON.parse(localStorage.getItem('Apps'));
                    for (var i = 0; i < appModules.length; i++) {
                        this.appModules.Add(appModules[i] as MT_ATPAR_APP);
                    }
                }
                this.appModules.ForEach(app => {
                    if (app.APP_NAME == 'Point Of Use') {
                        this.isPOUAssign = true;
                    }
                })
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "getPOUAssignValue");
        }
    }

    getMargin() {
        try {
            this.showStyle = this.leftBarAnimationService.getLeftBarMargin();
            if (this.showStyle) {
                return "";
            } else {
                return "0px";
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "getMargin");
        }
    }

    downloadPOUDTFile() {
        try {
            var filename = '../redist/AtPar-POU_DT.exe'
            var query = '?download';
            window.open(filename + query);
        } catch (ex) {
            this.clientErrorMsg(ex, "downloadPOUDTFile");
        }
    }

    downloadNETCFVFile() {
        try {
            var filename = '../redist/NETCFv35[1].wm.armv4i.cab'
            var query = '?download';
            window.open(filename + query);
        } catch (ex) {
            this.clientErrorMsg(ex, "downloadNETCFVFile");
        }
    }

    downloadAndriodFile() {
        try {
            var filename = '../redist/AtPar.Droid-Signed.apk'
            var query = '?download';
            window.open(filename + query);
        } catch (ex) {
            this.clientErrorMsg(ex, "downloadAndriodFile");
        }
    }

    downloadSQLCE30File() {
        try {
            var filename = '../redist/sqlce30.ppc.wce4.armv4.CAB'
            var query = '?download';
            window.open(filename + query);
        } catch (ex) {
            this.clientErrorMsg(ex, "downloadSQLCE30File");
        }
    }

    downloadAtParClientFile() {
        try {
            var filename = '../redist/AtParClient_ARM.CAB'
            var query = '?download';
            window.open(filename + query);
        } catch (ex) {
            this.clientErrorMsg(ex, "downloadAtParClientFile");
        }
    }
    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerservice, strExMsg.toString(), funName, this.constructor.name);
    }

    OnDestroy() {
        this.spinnerservice.stop();
        this.spinnerservice = null;
        this.isUploadBtn = null;
        this.showStyle = null;
        this.isPOUAssign = null;
        this.msgs = null;
        this._deviceTokenEntry = null;
        this.appModules = null;
    }

}