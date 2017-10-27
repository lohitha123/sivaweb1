

import {
    Component,
    OnInit,
    OnDestroy,
    Output,
    EventEmitter
} from '@angular/core';

import {
    Router,
    ActivatedRoute,
    Params
} from '@angular/router';

import {
    YesNo_Enum
} from '../../Shared/AtParEnums';
import { SpinnerService } from '../../components/spinner/event.spinner.service';
import { ConfirmationService, Confirmation } from '../../components/common/api';
import { TKIT_REQUESTOR } from '../../Entities/TKIT_REQUESTOR';
import { TrackITUserProfileService } from '../Body/trackit-profile.service';
import { Message } from '../../components/common/api';
import { TkitHttpService } from '../../Shared/tkitHttpService';
import { TokenEntry_Enum, StatusType } from '../../Shared/AtParEnums';
import { AtParWebApiResponse } from '../../Shared/AtParWebApiResponse';
import { AtParConstants } from '../../Shared/AtParConstants';
import { Response } from '@angular/http';


declare var module: {
    id: string;
}

@Component({

    selector: 'trackit-topbar-cmp',
    templateUrl: 'trackit.topbar.component.html',
    providers: [
        ConfirmationService,
        TrackITUserProfileService,
        TkitHttpService,
        AtParConstants
    ]
})

export class TrackITTopBarComponent implements OnInit {
    countvalue: number = 0;
    mhsatparicon: string = "";
    menu: string;
    smallMenu: string;
    dropdown: boolean = true;
    color1: string = 'red';
    color2: string = 'green';
    color3: string = 'yellow';
    user: TKIT_REQUESTOR;
    tkitDeviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];

    constructor(
        private router: Router,
        private spinnerService: SpinnerService,
        private confirmationService: ConfirmationService,
        private service: TrackITUserProfileService,
        private httpService: TkitHttpService,
        private atParConstant: AtParConstants
    ) {
    }

    async onAtPar() {
        try {
            this.router.navigate(['trackitdashboard/sameurl']);
            setTimeout(() => {
                this.router.navigate(['trackitdashboard']);
            }, 1)
        }
        catch (ex)
        {
            this.clientErrorMsg(ex, "onAtPar");
        }
    }

    ngOnInit() {
        try {
            
            this.mhsatparicon = "assets/images/MHSAtpar.png";
            this.user = new TKIT_REQUESTOR();
            this.tkitDeviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
            this.getUserDetails();

            this.spinnerService.changeEmittedofCount.subscribe(
                countedvalue => {
                    this.countvalue = 0;
                    this.countvalue = countedvalue;
                });

            if (localStorage.getItem('tkitViewCartItemsCount') != null && localStorage.getItem('tkitViewCartItemsCount') != undefined && localStorage.getItem('tkitViewCartItemsCount') != '') {
                this.countvalue = parseInt(localStorage.getItem('tkitViewCartItemsCount').toString());
            }
        }
        catch (ex)
        {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async onCreateRequestClick() {
        try {
            this.router.navigate(['trackitdashboard/sameurl']);
            await setTimeout(() => {
                this.router.navigate(['trackitdashboard/createrequest']);
            }, 1)
        }
        catch (ex)
        {
            this.clientErrorMsg(ex, "onCreateRequestClick");
        }
    }

    async  onRequestStatusClick() {
        try {
            this.router.navigate(['trackitdashboard/sameurl']);
            await setTimeout(() => {
                this.router.navigate(['trackitdashboard/requeststatus']);
            }, 1)
        }
        catch (ex)
        {
            this.clientErrorMsg(ex, "onRequestStatusClick");
        }
    }

    async onRequestorItemReportClick() {
        try {
            this.router.navigate(['trackitdashboard/sameurl']);
            await setTimeout(() => {
                this.router.navigate(['trackitdashboard/requestoritemvisibilityreport']);
            }, 1)
        }
        catch (ex)
        {
            this.clientErrorMsg(ex, "onRequestorItemReportClick");
        }
      
    }

    async onViewCartClick() {
        try
        {
            this.router.navigate(['trackitdashboard/sameurl']);
            await setTimeout(() => {
                this.router.navigate(['trackitdashboard/viewcart']);
            }, 1)
        }
        catch (ex)
        {
            this.clientErrorMsg(ex, "onViewCartClick");
        }
    }

    async  onMyProfileClick() {
        try {
            this.router.navigate(['trackitdashboard/sameurl']);
            await setTimeout(() => {
                this.router.navigate(['trackitdashboard/myprofile']);
            }, 1)
        }
        catch (ex)
        {
            this.clientErrorMsg(ex, "onMyProfileClick");
        }
    }

    async getUserDetails() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            await this.service.getUserDetails(this.tkitDeviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<TKIT_REQUESTOR>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.Data != null) {
                                this.user = data.Data;
                                if (this.user.FIRST_NAME != null && this.user.FIRST_NAME != '') {
                                    this.user.FIRST_NAME = this.user.FIRST_NAME.toLowerCase();
                                }
                                if (this.user.LAST_NAME != null && this.user.LAST_NAME != '') {
                                    this.user.LAST_NAME = this.user.LAST_NAME.toLowerCase();
                                }
                                if (this.user.IMAGE_PATH == null) {
                                    this.user.IMAGE_PATH = 'assets/images/users/default.png';
                                }
                                break;
                            }


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
            this.clientErrorMsg(ex, "getUserDetails");
        }
    }

    onLogOut() {
        try {
            this.spinnerService.start();
            this.httpService.clearAppSession();
            setTimeout(() => {
                this.spinnerService.stop();
                this.router.navigate(['trackitlogin']);
            }, 1000);
        } catch (ex) {
            this.clientErrorMsg(ex,"onLogOut");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    dropdownMenu(menu) {
        try {
            this.dropdown = !this.dropdown;
            if (this.dropdown) {
                this.smallMenu = menu;
            } else {
                this.smallMenu = "";
            }
        }

        catch (ex)
        {
            this.clientErrorMsg(ex, "dropdownMenu");
        }
       
    }

    OnDestroy() {
        this.countvalue = null;
        this.mhsatparicon = null;
        this.menu = null;
        this.user = null;
        this.smallMenu = null;
        this.color1 = null;
        this.color2 = null;
        this.color3 = null;
        this.tkitDeviceTokenEntry = null;;
        this.growlMessage = null;
    }

}
