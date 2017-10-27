
import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Inject,
    Directive
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
    Title,
    DOCUMENT
} from '@angular/platform-browser';

import { List } from 'linqts';

import { SpinnerService } from '../../components/spinner/event.spinner.service';
import { LeftBarComponent } from '../Left/leftbar.component';
import { LeftBarAnimationService } from '../leftbar-animation.service';
import { Menus } from '../../AtPar/Menus/routepath';
import { HttpService } from '../../Shared/HttpService';
import { MT_ATPAR_APP_GROUP } from '../../Entities/MT_ATPAR_APP_GROUP';
import { MT_ATPAR_APP } from '../../Entities/MT_ATPAR_APP';
import { Message } from '../../components/common/api';
import { AtParConstants } from '../../Shared/AtParConstants';

import {
    TokenEntry_Enum,
    EnumApps,
    SubMenuGroup,
    EnumGroups
} from '../../Shared/AtParEnums';

/**
*	This class represents the lazy loaded HomeComponent.
*/
declare var module: {
    id: string;
}

@Component({

    templateUrl: 'body.component.html',
    providers: [AtParConstants]
})

export class BodyComponent implements OnInit {

    basePath: string;
    activeGroup: string;
    showStyle: boolean = false;
    strshowStyle: string;
    hideStyle: string;

    lstMenus: List<Menus>;
    groupModules: List<MT_ATPAR_APP>;
    appGroups: List<MT_ATPAR_APP_GROUP>;
    appModules: List<MT_ATPAR_APP>;
    msgs: Message[] = [];
    reportsApp: MT_ATPAR_APP;
    marginTop: string = '0';
    breadCrumb: Menus;

    constructor(
        private leftBarAnimationService: LeftBarAnimationService, private httpservice: HttpService,
        private title: Title,
        private atParConstant: AtParConstants,
        @Inject(DOCUMENT) private document,
        private spinnerservice: SpinnerService
    ) {

        try {
            this.title.setTitle('Dashboard');
            this.lstMenus = new List<Menus>();
            this.basePath = this.httpservice.Path;
            this.appGroups = new List<MT_ATPAR_APP_GROUP>();
            this.appModules = new List<MT_ATPAR_APP>();
            this.breadCrumb = new Menus();
            this.reportsApp = new MT_ATPAR_APP();
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    getMargin() {
        try {
            this.showStyle = this.leftBarAnimationService.getLeftBarMargin();
            if (this.showStyle) {
                return "";
            } else {
                this.activeGroup = "Atpar";
                return "0px";
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    getMenu() {
        try {
            this.activeGroup = this.leftBarAnimationService.getActiveLeftBar();
            if (this.activeGroup != 'none') {
                return this.strshowStyle;
            }
            else {
                return this.hideStyle;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    getGroupModules(appGroup: MT_ATPAR_APP_GROUP) {
        localStorage.setItem("IsClicked", "false");
        this.document.getElementById('leftsidebar').style.width = "";
        this.document.getElementById('main').style.margin = "";

        this.document.getElementById('menu-icon').style.left = "175px";
        for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
            var div = document.getElementsByClassName('breadcrumb')[i]
            div.setAttribute("style", "padding-left:" + "0px");
        }
        for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
            var div = document.getElementsByClassName('breadcrumb')[i]
            div.setAttribute("style", "left:" + "209px");
        }
        try {
            localStorage.removeItem("bcMenu");
            this.breadCrumb.APP_NAME = appGroup.GROUP_NAME;
            localStorage.removeItem('activeGroupModuleName');
            this.spinnerservice.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumb))
            this.groupModules = new List<MT_ATPAR_APP>();
            localStorage.setItem('ActiveGroup', JSON.stringify(appGroup));
            localStorage.setItem('activateLeftBarMenu', 'YES');
            localStorage.setItem('isAtParDashboard', 'YES');
            this.activeGroup = appGroup.GROUP_NAME;

            if (appGroup.GROUP_ID != EnumGroups.Reports) {
                this.groupModules = this.appModules.Where(appModule => appModule.GROUP_ID == appGroup.GROUP_ID);
            }
            else {
                this.groupModules.Add(this.reportsApp);
            }

            this.showStyle = true;
            this.leftBarAnimationService.isHomeClicked = true;
            this.leftBarAnimationService.emitChange(this.groupModules);
            this.leftBarAnimationService.emitChangeActiveMenu(this.activeGroup);
            if (this.activeGroup != '') {
                this.leftBarAnimationService.setActiveLeftBar(this.activeGroup);
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ngOnInit() {
        this.getmenulist();
    }

    getBodyMargin() {
        try {
            let wheight: any;
            wheight = window.innerHeight;
            this.marginTop = parseInt(((wheight / 100) * 41.38).toString()) + 'px';
            return this.marginTop + ' 0 0 0';
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async getmenulist() {
        try {

            if (localStorage.getItem('AppGroups') != undefined && localStorage.getItem('AppGroups') != null && localStorage.getItem('AppGroups') != '') {
                this.appGroups = JSON.parse(localStorage.getItem('AppGroups')) as List<MT_ATPAR_APP_GROUP>;
            }

            if (localStorage.getItem('Apps') != undefined && localStorage.getItem('Apps') != null && localStorage.getItem('Apps') != '') {
                var appModules = JSON.parse(localStorage.getItem('Apps'));
                for (var i = 0; i < appModules.length; i++) {
                    this.appModules.Add(appModules[i] as MT_ATPAR_APP);
                }
            }

            if (localStorage.getItem('MenuList') != undefined && localStorage.getItem('MenuList') != null && localStorage.getItem('MenuList') != '') {
                var menuItems = JSON.parse(localStorage.getItem('MenuList'));
                for (var i = 0; i < menuItems.length; i++) {
                    this.lstMenus.Add(menuItems[i] as Menus);
                }
            }

            if (localStorage.getItem('isAtParDashboard') != null && localStorage.getItem('isAtParDashboard') != undefined) {
                if (localStorage.getItem('isAtParDashboard') == 'YES') {
                    localStorage.removeItem('ActiveGroup');
                    this.activeGroup = '';
                }
                else {
                    if (localStorage.getItem('ActiveGroup') != null && localStorage.getItem('ActiveGroup') != undefined) {
                        this.activeGroup = (JSON.parse(localStorage.getItem('ActiveGroup').toString()) as MT_ATPAR_APP_GROUP).GROUP_NAME;
                    }
                }
            }
            else {
                if (localStorage.getItem('ActiveGroup') != null && localStorage.getItem('ActiveGroup') != undefined) {
                    this.activeGroup = (JSON.parse(localStorage.getItem('ActiveGroup').toString()) as MT_ATPAR_APP_GROUP).GROUP_NAME;
                }
            }

            if (localStorage.getItem('reportsApp') != null && localStorage.getItem('reportsApp') != undefined && localStorage.getItem('reportsApp') != '') {
                this.reportsApp = JSON.parse(localStorage.getItem('reportsApp'));
            }


        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    isDisabledAppGroup(group: MT_ATPAR_APP_GROUP) {
        try {
            if (group.GROUP_ID != EnumGroups.Reports) {
                return this.appModules.Where(x => x.GROUP_ID == group.GROUP_ID).Count() >= 1 ? false : true;
            }
            else {
                return this.lstMenus.Where(x => x.SUB_MENU_GROUP_NAME == SubMenuGroup[SubMenuGroup.Reports]).Count() >= 1 ? false : true;
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    clientErrorMsg(ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerservice, ex.toString());
    }

    OnDestroy() {
        localStorage.setItem('isAtParDashboard', 'YES');
        this.spinnerservice = null;
        this.activeGroup = null;
        this.showStyle = null;
        this.lstMenus = null;
        this.groupModules = null;
        this.strshowStyle = null;
        this.hideStyle = null;
        this.appGroups = null;
        this.appModules = null;
        this.msgs = null;
    }

}
