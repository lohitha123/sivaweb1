
import {
    Component,
    OnDestroy,
    OnInit,
    Inject,
    Directive
} from '@angular/core';

import {
    DOCUMENT,
    Title
} from '@angular/platform-browser';

import { List } from 'linqts';

import {
    TokenEntry_Enum,
    EnumApps,
    SubMenuGroup
} from '../Shared/AtParEnums';

import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Menus } from '../AtPar/Menus/routepath';
import { MT_ATPAR_APP } from '../Entities/MT_ATPAR_APP';
import { MT_ATPAR_APP_GROUP } from '../Entities/MT_ATPAR_APP_GROUP';
import { Message } from '../components/common/api';
import { AtParConstants } from '../Shared/AtParConstants';
import { TkitHttpService } from '../Shared/tkitHttpService';

/**
*	This class represents the lazy loaded DashboardComponent.
*/
declare var module: {
    id: string;
}

@Component({

    selector: 'trackit-home-cmp',
    templateUrl: 'trackit.dashboard.component.html',
    providers: [
        AtParConstants,
        TkitHttpService
    ]

})

export class TrackITDashboardComponent implements OnInit {

    showAdmin: boolean = true;
    isModuleActive: boolean;

    activeMenu: String;
    showStyle: String;
    hideStyle: String;
    moduleName: string;
    activeddName: string;
    Menu: string;

    menu: Menus;
    lstModuleItems: any;
    appModules: List<MT_ATPAR_APP>;
    groupModules: List<MT_ATPAR_APP>;
    activeGroup: MT_ATPAR_APP_GROUP;
    lstMenus: List<Menus>;
    moduleMenus: List<Menus>;
    lstGroupModuleMenus: List<Menus>;
    msgs: Message[] = [];
    menudata: any;

    constructor(
        private title: Title,
        @Inject(DOCUMENT) private document,
        private atParConstant: AtParConstants,
        private spinnerservice: SpinnerService,
        private httpService: TkitHttpService
    ) {
        try {
            this.title.setTitle('Dashboard');
            this.activeddName = '';
            this.showStyle = "block";
            this.hideStyle = "none";
            this.isModuleActive = false;
            this.groupModules = new List<MT_ATPAR_APP>();
            this.moduleName = 'none';
            this.moduleMenus = new List<Menus>();
            

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ngOnInit() {
        try {
            this.getMenu();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    getMenu() {
        try {
            return this.showStyle;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }



    appModuleChange(activeModuleName) {
        this.moduleName = activeModuleName;
    }



    onHomeClick() {
        this.activeddName = '';
        this.Menu = '';

    }



    profileClickChanged(activeddName) {
        this.activeddName = activeddName;
    }

    filteredData(searchString) {
        this.Menu = searchString;
    }

    clientErrorMsg(ex) {
     
    }

    divClick() {
       
    }
 


    OnDestroy() {


    }

}

