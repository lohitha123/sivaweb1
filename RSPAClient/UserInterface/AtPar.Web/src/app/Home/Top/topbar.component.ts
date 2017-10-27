
import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    Inject
} from '@angular/core';

import { Response } from '@angular/http';

import {
    DOCUMENT,
    Title
} from '@angular/platform-browser';

import { HttpService } from '../../Shared/HttpService';
import { Menus } from '../../AtPar/Menus/routepath';
import { LeftBarAnimationService } from '../leftbar-animation.service';
import { SpinnerService } from '../../components/spinner/event.spinner.service';
import { AtParWebApiResponse } from '../../Shared/AtParWebApiResponse';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';

import {
    TokenEntry_Enum,
    EnumApps,
    EnumGroups,
    SubMenuGroup,
    YesNo_Enum
} from '../../Shared/AtParEnums';

import { MT_ATPAR_USER_PROFILE_APP_ACL_ORG } from '../../Entities/MT_ATPAR_USER_PROFILE_APP_ACL_ORG';
import { MT_ATPAR_APP_GROUP } from '../../entities/MT_ATPAR_APP_GROUP';
import { MT_ATPAR_APP } from '../../entities/MT_ATPAR_APP';
import { AtParConstants } from '../../Shared/AtParConstants';
import { Message } from '../../components/common/api';

import {
    Router,
    ActivatedRoute,
    Params
} from '@angular/router';

import {
    ConfirmationService,
    Confirmation
} from '../../components/common/api';

declare var module: {
    id: string;
}

@Component({

    selector: 'topbar-cmp',
    templateUrl: 'topbar.component.html',
    providers: [
        HttpService,
        AtParConstants,
        ConfirmationService
    ]

})

export class TopBarComponent implements OnInit {

    mhsatparicon: string = "";
    @Input() activeddName: string = '';
    @Input() Menu: string;
    @Output() change: EventEmitter<string> = new EventEmitter<string>();
    @Output() filteredData: EventEmitter<any> = new EventEmitter<any>();

    menu: string;

    clickCount: number = 0;
    showStyle: boolean = true;
    activeMenu: string;
    displayAboutDialog: boolean = false;
    displayHelpDialog: boolean = false;
    atParVersions: any;
    isUserAllowed: boolean = false;
    isclicked: boolean = true;
    user: MT_ATPAR_USER_PROFILE_APP_ACL_ORG;
    _deviceTokenEntry: string[] = [];
    msgs: Message[] = [];
    lstTestList: any[];
    lstMenuList: any[];
    lstMenus: List<Menus>;
    lstMainlist: List<Menus>;
    lstMenuList1: any[];

    groupModules: List<MT_ATPAR_APP>;
    appGroups: List<MT_ATPAR_APP_GROUP>;
    appModules: List<MT_ATPAR_APP>;
    selectedMenu: Menus;
    selectedGroup: MT_ATPAR_APP_GROUP;
    breadCrumbAppName: string = '';
    breadCrumbMenuName: string;
    breadCrumbRoute: string;
    breadCrumbPrvsRoute: string = '';
    breadCrumbSubMenuName: string = '';
    breadCrumbPrvsMenuName: string = '';
    breadCrumbPrvsAppName: string;
    currentLocation: string;
    breadCrumbMenu: Menus;
    breadCrumbGroupName: string = '';
    breadCrumbsubGroupName: string = '';
    isMsg: boolean = false;
    localstoragemenu: any;
    activeReportMenu: string = '';

    constructor(
        private router: Router,
        private leftbaranimationService: LeftBarAnimationService,
        private spinnerService: SpinnerService,
        private httpService: HttpService,
        private title: Title,
        private atParConstant: AtParConstants,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        @Inject(DOCUMENT) private document
    ) {
        try {

            this.mhsatparicon = "assets/images/MHSAtpar.png";
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.user = new MT_ATPAR_USER_PROFILE_APP_ACL_ORG();
            this.breadCrumbMenu = new Menus();
            this.localstoragemenu = new Menus()
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    openDropDown(menu) {
        try {
            this.clickCount = 1;
            if (this.activeddName != menu) {
                this.activeddName = menu;
            }
            else {
                this.activeddName = '';
            }
            this.change.emit(this.activeddName);

        } catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async AtPar() {
        try {
            localStorage.setItem("IsClicked", "false");
            if (localStorage.getItem('AppGroups') != null && localStorage.getItem('AppGroups') != undefined && localStorage.getItem('AppGroups') != '') {
                this.showStyle = false;
                this.activeMenu = 'AtPar';
                this.leftbaranimationService.isHide();
                this.leftbaranimationService.isHomeClicked = false;
                if (this.activeReportMenu == this.activeMenu) {
                    this.activeReportMenu = 'none';
                }
                else {
                    this.activeReportMenu = this.activeMenu;
                }
                this.leftbaranimationService.emitChangeReportaActiveMenu(this.activeReportMenu);
                localStorage.removeItem('activateLeftBarMenu');
                localStorage.removeItem('ActiveGroup');
                localStorage.setItem('isAtParDashboard', 'YES');
                await this.router.navigate(['atpar']);
                for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                    var div = document.getElementsByClassName('breadcrumb')[i]
                    div.setAttribute("style", "padding-left:" + "0px");
                    this.breadCrumbAppName = 'Home';
                    this.breadCrumbMenuName = '';
                    this.breadCrumbRoute = '';
                    this.breadCrumbSubMenuName = '';
                    this.breadCrumbGroupName = '';
                    this.breadCrumbsubGroupName = '';
                }
            }
            else {
                this.httpService.clearAppSession();
                await this.router.navigate(['login']);
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    ngOnInit() {
        try {

            this.aboutAtPar();
            if (localStorage.getItem('AppGroups') != null && localStorage.getItem('AppGroups') != undefined && localStorage.getItem('AppGroups') != '') {
                this.isUserAllowed = true;
                this.GetUserDetails();
                this.GetMenusList();
                this.lstMenuList = [];
                var breadCrumbs;

                if (localStorage.getItem("BreadCrumbMenus") != undefined && localStorage.getItem("BreadCrumbMenus") != null && localStorage.getItem("BreadCrumbMenus") != '') {

                    breadCrumbs = JSON.parse(localStorage.getItem("BreadCrumbMenus"));
                }


                if (breadCrumbs != null && breadCrumbs != undefined) {
                    this.resetBreadCrumbs(breadCrumbs)
                }

                this.spinnerService.changeBCEmitted$.subscribe(
                    groupModules => {
                        localStorage.setItem('BreadCrumbMenus', groupModules);
                        this.getBreadCrumbs(JSON.parse(groupModules));
                    }
                );

            }
            else {
                this.isUserAllowed = false;
                var breadCrumbs : any = localStorage.getItem("BreadCrumbMenus");
                if (breadCrumbs != null && breadCrumbs != undefined) {
                    this.getBreadCrumbs(JSON.parse(breadCrumbs));
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    getBreadCrumbs(groupModules: any) {

        this.localstoragemenu = new Menus();
        if (groupModules.APP_NAME != "My Profile" && groupModules.APP_NAME != "Downloads" && groupModules.APP_NAME != "Change Password") {

            if (groupModules.IS_DIV == true) {
                if (localStorage.getItem("bcMenu") != null) {
                    if (groupModules.SUB_MENU_NAME != null && groupModules.SUB_MENU_NAME != '') {
                        this.localstoragemenu = JSON.parse(localStorage.getItem("bcMenu"))
                        this.selectedMenu = this.localstoragemenu;
                        this.selectedMenu.SUB_MENU_NAME = groupModules.SUB_MENU_NAME;
                        if (groupModules.IS_MESSAGE != undefined && groupModules.IS_MESSAGE != null) {
                            this.selectedMenu.IS_MESSAGE = groupModules.IS_MESSAGE;
                        }

                    } else {
                        this.localstoragemenu = JSON.parse(localStorage.getItem("bcMenu"))
                        this.selectedMenu = this.localstoragemenu;
                    }
                } else { this.selectedMenu = groupModules; }
            } else {
                if (groupModules.IS_DIV == false && groupModules.SUB_MENU_NAME != null && groupModules.SUB_MENU_NAME != '') {
                    this.localstoragemenu = JSON.parse(localStorage.getItem("bcMenu"))
                    this.selectedMenu = this.localstoragemenu;
                    this.selectedMenu.SUB_MENU_NAME = groupModules.SUB_MENU_NAME;
                    if (groupModules.IS_MESSAGE != undefined && groupModules.IS_MESSAGE != null) {
                        this.selectedMenu.IS_MESSAGE = groupModules.IS_MESSAGE;
                    }
                } else {
                    this.selectedMenu = groupModules;
                }
            }
        } else {
            this.selectedMenu = groupModules;
        }

        if ((this.selectedMenu.APP_NAME == "Reports & Dashboards") && (this.selectedMenu.GROUP_NAME == "Reports & Dashboards")) {
            this.selectedMenu.GROUP_NAME == 'Reports & Dashboards'
            this.selectedMenu.APP_NAME = '';
        }

        this.breadCrumbGroupName = '';
        this.breadCrumbAppName = '';
        this.breadCrumbMenuName = '';
        this.breadCrumbSubMenuName = '';
        this.breadCrumbsubGroupName = '';
        if (this.selectedMenu.SUB_CATEGORY != null && this.selectedMenu.SUB_CATEGORY != "" && this.selectedMenu.SUB_CATEGORY.length > 1) {
            this.breadCrumbGroupName = 'Reports & Dashboards';
            this.breadCrumbsubGroupName = this.selectedMenu.SUB_CATEGORY;

        }

        if ((this.selectedMenu.APP_NAME != "Reports") && (this.selectedMenu.SUB_MENU_GROUP_NAME == 'Reports' || this.selectedMenu.GROUP_NAME == 'Reports & Dashboards' ||
            this.localstoragemenu.SUB_MENU_GROUP_NAME == 'Reports' || this.localstoragemenu.GROUP_NAME == 'Reports & Dashboards')) {
            this.breadCrumbGroupName = 'Reports & Dashboards';
        }

        if (this.selectedMenu.APP_NAME != undefined && this.selectedMenu.APP_NAME != null && this.selectedMenu.APP_NAME != '') {
            this.breadCrumbAppName = this.selectedMenu.APP_NAME;
            localStorage.setItem("appName", this.breadCrumbAppName);
        }


        if (this.selectedMenu.MENU_NAME != undefined && this.selectedMenu.MENU_NAME != null && this.selectedMenu.MENU_NAME != '') {
            if (this.selectedMenu.SUB_CATEGORY != null && this.selectedMenu.SUB_CATEGORY != "" && this.selectedMenu.SUB_CATEGORY.length > 1) {
                this.breadCrumbMenuName = this.selectedMenu.MENU_NAME;
            }
            else if (this.selectedMenu.SUB_CATEGORY != undefined && this.selectedMenu.SUB_CATEGORY != null && this.selectedMenu.SUB_CATEGORY != '') {
                this.breadCrumbMenuName = this.selectedMenu.SUB_CATEGORY + '-' + this.selectedMenu.MENU_NAME;
            }
            else {
                this.breadCrumbMenuName = this.selectedMenu.MENU_NAME;
            }

            localStorage.setItem("breadMenuName", this.breadCrumbMenuName);
        }
        else {
            if (this.router.url.indexOf('/myprofile') >= 0 || this.router.url.indexOf('/changepassword') >= 0 || this.router.url.indexOf('/downloads') >= 0 || (this.breadCrumbAppName == 'Reports & Dashboards' && this.selectedMenu.MENU_NAME == '')) {
                this.breadCrumbMenuName = '';
                localStorage.setItem("IsClicked", "false");
                this.showStyle = false;
                this.activeMenu = 'AtPar';
                this.leftbaranimationService.isHide();
                this.leftbaranimationService.isHomeClicked = false;
                localStorage.removeItem('activateLeftBarMenu');
                localStorage.removeItem('ActiveGroup');
                localStorage.setItem('isAtParDashboard', 'YES');
            }
        }


        if (this.selectedMenu.ROUTE != undefined && this.selectedMenu.ROUTE != null && this.selectedMenu.ROUTE != '') {
            this.breadCrumbRoute = 'atpar/' + this.selectedMenu.ROUTE;
            localStorage.setItem("breadCrumUrl", this.breadCrumbRoute);
        }

        if (this.selectedMenu.SUB_MENU_NAME != undefined && this.selectedMenu.SUB_MENU_NAME != null && this.selectedMenu.SUB_MENU_NAME != '') {
            if (this.selectedMenu.IS_MESSAGE != undefined && this.selectedMenu.IS_MESSAGE != null) {
                this.isMsg = this.selectedMenu.IS_MESSAGE;
            }
            //localStorage.setItem("breadCrumMsg", this.isMsg);
            this.breadCrumbSubMenuName = ' - ' + this.selectedMenu.SUB_MENU_NAME;

        }
        else {
            this.breadCrumbSubMenuName = '';
        }
        localStorage.setItem("breadSubMenuName", this.breadCrumbSubMenuName);
    }

    resetBreadCrumbs(breadCrumbs: Menus) {



        if (localStorage.getItem("appName") != undefined && localStorage.getItem("appName") != null && localStorage.getItem("appName") != '') {
            this.breadCrumbAppName = localStorage.getItem("appName");
        }

        if (localStorage.getItem("breadMenuName") != undefined && localStorage.getItem("breadMenuName") != null && localStorage.getItem("breadMenuName") != '') {
            if (this.breadCrumbAppName == 'Home') {
                localStorage.setItem("breadMenuName", '');
            }
            this.breadCrumbMenuName = localStorage.getItem("breadMenuName");

        }
        if (localStorage.getItem("breadCrumUrl") != undefined && localStorage.getItem("breadCrumUrl") != null && localStorage.getItem("breadCrumUrl") != '') {
            this.breadCrumbRoute = localStorage.getItem("breadCrumUrl");
        }

        if (localStorage.getItem("breadSubMenuName") != undefined && localStorage.getItem("breadSubMenuName") != null && localStorage.getItem("breadSubMenuName") != '') {

            if (breadCrumbs.IS_DIV == false && breadCrumbs.SUB_MENU_NAME != '' && breadCrumbs.SUB_MENU_NAME != undefined && breadCrumbs.SUB_MENU_NAME != null) {
                if (this.breadCrumbAppName == 'Home') {
                    localStorage.setItem("breadSubMenuName", '');
                }
                this.breadCrumbSubMenuName = localStorage.getItem("breadSubMenuName");
            }
            else {
                localStorage.setItem("breadSubMenuName", '');
                this.breadCrumbSubMenuName = localStorage.getItem("breadSubMenuName");
            }

        }
        else {
            this.breadCrumbSubMenuName = '';
        }
    }

    BreadCrumbProduct_Click() {

        if (this.breadCrumbAppName != 'Home' && this.breadCrumbAppName != 'Administration' && this.breadCrumbAppName != 'Warehouse' && this.breadCrumbAppName != 'Distribution' && this.breadCrumbAppName != 'CaseCost-360' && this.breadCrumbAppName != 'ATPARX' && this.breadCrumbAppName != 'Reports & Dashboards' && this.breadCrumbAppName != 'My Profile' && this.breadCrumbAppName != 'Change Password' && this.breadCrumbAppName != 'Downloads') {
            if (!this.breadCrumbAppName.includes("Dashboard")) {

                this.title.setTitle(this.breadCrumbAppName);

                this.router.navigate(['atpar/' + this.breadCrumbAppName.replace(/ /g, '').toLowerCase() + 'breadcrumb']);
                setTimeout(() => {
                    //this.breadCrumbAppName = '';
                    this.breadCrumbAppName = this.breadCrumbAppName + ' - Dashboard';
                    this.breadCrumbMenuName = '';
                    this.breadCrumbRoute = '';
                    this.breadCrumbSubMenuName = '';

                    this.breadCrumbGroupName = '';
                    this.breadCrumbsubGroupName = '';

                    let submenu: Menus = new Menus();
                    submenu.APP_NAME = this.breadCrumbAppName;

                    localStorage.setItem("bcMenu", JSON.stringify(submenu));

                }, 100);
            }
        }

        if (this.breadCrumbAppName == 'My Profile') {
            if (localStorage.getItem("bcMenu") != null) {
                localStorage.removeItem("bcMenu");
            }
            this.router.navigate(['atpar/sameurl']);
            setTimeout(() => {
                this.router.navigate(['atpar/myprofile']);
            }, 1)
        }
        else if (this.breadCrumbAppName == 'Change Password') {
            if (localStorage.getItem("bcMenu") != null) {
                localStorage.removeItem("bcMenu");
            }
            this.router.navigate(['atpar/sameurl']);
            setTimeout(() => {
                this.router.navigate(['atpar/changepassword']);
            }, 1)
        }

        else if (this.breadCrumbAppName == 'Downloads') {
            if (localStorage.getItem("bcMenu") != null) {
                localStorage.removeItem("bcMenu");
            }
            this.router.navigate(['atpar/sameurl']);
            setTimeout(() => {
                this.router.navigate(['atpar/downloads']);
            }, 1)
        }
    }

    async BreadCrumbMenu_Click() {
        localStorage.setItem('navigateUrl', this.breadCrumbRoute);
        let navigateUrl: string = '';
        navigateUrl = localStorage.getItem('navigateUrl') + '';
        if (this.isMsg == false) {
            await this.router.navigate(['atpar/sameurl']);
            setTimeout(() => {
                this.router.navigate([navigateUrl]);
                localStorage.removeItem('navigateUrl');
            }, 1);
            this.breadCrumbSubMenuName = '';
        }
        else {
            await this.confirmationService.confirm({
                //this.spinnerService.start();
                message: 'Unsaved data will be lost, do you want to continue moving back to parent screen?',
                accept: () => {
                    this.router.navigate(['atpar/sameurl']);
                    setTimeout(() => {
                        this.router.navigate([navigateUrl]);
                        localStorage.removeItem('navigateUrl');
                    }, 1);
                    this.breadCrumbSubMenuName = '';
                }

            });
        }


    }

    GetMenusList() {
        try {
            this.appGroups = new List<MT_ATPAR_APP_GROUP>();
            this.appModules = new List<MT_ATPAR_APP>();
            this.lstMenus = new List<Menus>();
            this.lstMenuList1 = [];

            if (localStorage.getItem('AppGroups') != undefined && localStorage.getItem('AppGroups') != null && localStorage.getItem('AppGroups') != '') {
                var appGroups = JSON.parse(localStorage.getItem('AppGroups'));
                for (var i = 0; i < appGroups.length; i++) {
                    this.appGroups.Add(appGroups[i] as MT_ATPAR_APP_GROUP);
                }
            }

            if (localStorage.getItem('Apps') != undefined && localStorage.getItem('Apps') != null && localStorage.getItem('Apps') != '') {
                var appModules = JSON.parse(localStorage.getItem('Apps'));
                for (var i = 0; i < appModules.length; i++) {
                    this.appModules.Add(appModules[i] as MT_ATPAR_APP);
                }
            }

            if (localStorage.getItem('MenuList') != null && localStorage.getItem('MenuList') != undefined) {
                var menuItems = JSON.parse(localStorage.getItem('MenuList'));
                for (var i = 0; i < menuItems.length; i++) {
                    this.lstMenuList1.push({
                        value: menuItems[i].MENU_NAME, code: menuItems[i].ROUTE, name: menuItems[i].MENUS_FRIENDLYNAME, APP_ID: menuItems[i].APP_ID, APP_NAME: menuItems[i].APP_NAME, sub_menu_group_name: menuItems[i].SUB_MENU_GROUP_NAME
                    });
                    this.lstMenus.Add(menuItems[i] as Menus);
                }
                //Setting order by for filtered records. 
                if (this.lstMenuList1 != null && this.lstMenuList1.length > 0) {
                    this.lstMenuList1 = asEnumerable(this.lstMenuList1).OrderBy(x => x.APP_ID).ToArray();
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    GetUserDetails() {
        try {
            this.httpService.get({
                "apiMethod": "/api/User/GetUser",
                params: {
                    "userId": this._deviceTokenEntry[TokenEntry_Enum.UserID]
                }
            }).catch(this.httpService.handleError)
                .map(
                (res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL_ORG>
                )
                .subscribe(
                (res2) => {

                    let menu = JSON.parse(localStorage.getItem("submenu"));
                    let isclicked = localStorage.getItem("IsClicked");
                    if (menu != null && isclicked == "true") {
                        this.document.getElementById('menu-icon').style.left = "175px";
                        this.document.getElementById('leftsidebar').style.width = "";
                        for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                            var div = document.getElementsByClassName('breadcrumb')[i]
                            div.setAttribute("style", "left:" + "209px");
                        }

                    }

                    if (res2.Data != null) {
                        this.user = res2.Data;
                        if (this.user.IMAGE_PATH == null) {
                            this.user.IMAGE_PATH = 'assets/images/users/default.png';
                        }
                        localStorage.setItem('userProfile', JSON.stringify(this.user));
                    }
                    else {
                    }
                });
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async search(event) {
        try {
            let query = event.query;
            this.lstMenuList = [];
            setTimeout(() => {

                this.lstMenuList = this.filterMenu(query, this.lstMenuList1);
            }, 50)

        } catch (ex) {
            this.clientErrorMsg(ex);
        }

        this.filteredData.emit(this.Menu);


    }

    filterMenu(query, MenuList1: any[]): any[] {
        try {
            let filtered: any[] = [];

            for (let i = 0; i < MenuList1.length; i++) {
                let menus = MenuList1[i];
                if (menus.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(menus);
                }
            }

            if (filtered == null || filtered.length == 0 || filtered == undefined) {
                // this.Menu = null;
            }
            return filtered;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    SelectRoute(Menu2) {
        try {
            this.navigateToSearchItem(Menu2);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.Menu = null;
            this.lstMenuList = [];
        }
    }

    onEnterPress(event, Menu) {
        try {
            var searchMenuItem = null;
            var searchMenu = this.lstMenuList1.forEach(menuItem => {
                if (menuItem.name == null) {
                    menuItem.name = "";
                }
                if ((menuItem.name.toLowerCase().trim()) == (Menu.toLowerCase().trim())) {
                    searchMenuItem = menuItem;
                }
            });
            if (searchMenuItem != null) {
                this.navigateToSearchItem(searchMenuItem);
            }
            else if (event != null) {
                if (this.lstMenuList.length > 0) {
                    this.SelectRoute(event);
                }
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.Menu = null;
            this.lstMenuList = [];
        }
    }

    navigateToSearchItem(Menu2) {
        try {
            localStorage.setItem("IsClicked", "true");
            this.title.setTitle(Menu2.value);

            var selectedItem = this.lstMenus.Where(menu => menu.ROUTE == Menu2.code && menu.APP_ID == Menu2.APP_ID && menu.MENU_NAME == Menu2.value);
            selectedItem.ForEach(menu => {
                this.selectedMenu = menu;
            });
            if (selectedItem != null && selectedItem.Count() > 0) {
                localStorage.setItem("bcMenu", JSON.stringify(this.selectedMenu));
            }
            //For BreadCrum Change
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.selectedMenu));

            this.currentLocation = Menu2.code;

            localStorage.removeItem('modulesubmenu');

            if (Menu2.sub_menu_group_name != EnumGroups[EnumGroups.Reports]) {
                var selectedGroups = this.appGroups.Where(group => group.GROUP_ID == this.selectedMenu.GROUP_ID);

                selectedGroups.ForEach(group => {
                    this.selectedGroup = group;
                });

                if (Menu2.APP_ID == EnumApps.Auth) {
                    var menuItems = JSON.parse(localStorage.getItem('MenuList')) as Menus[];
                    let subMenuItem: Menus = null;
                    for (var i = 0; i < menuItems.length - 1; i++) {
                        if (menuItems[i].APP_ID == Menu2.APP_ID && menuItems[i].ROUTE == Menu2.code) {
                            subMenuItem = menuItems[i];
                            break;
                        }
                    }
                    if (subMenuItem != null) {
                        localStorage.setItem('modulesubmenu', JSON.stringify(subMenuItem));
                    }
                }
                localStorage.setItem('activeGroupModuleName', this.selectedMenu.APP_NAME);

            }
            else {
                var selectedGroups = this.appGroups.Where(group => group.GROUP_ID == EnumGroups.Reports);
                selectedGroups.ForEach(group => {
                    this.selectedGroup = group;
                });

                localStorage.setItem('activeReportModule', this.selectedMenu.APP_NAME);
                localStorage.setItem('activeGroupModuleName', EnumApps[EnumApps.Reports]);
                localStorage.setItem('activeReportMenu', Menu2.value);
            }

            localStorage.setItem('ActiveGroup', JSON.stringify(this.selectedGroup));
            localStorage.setItem('activateLeftBarMenu', 'YES');


            this.leftbaranimationService.isHomeClicked = true;
            this.leftbaranimationService.emitChangeActiveMenu('');
            if (this.selectedGroup.GROUP_NAME != '') {
                this.leftbaranimationService.setActiveLeftBar(this.selectedGroup.GROUP_NAME);
            }

            this.leftbaranimationService.emitChangeLeftBarFromTopBar(true);
            //this.Menu = '';           
            localStorage.setItem("leftMenuUrl", Menu2.code);
            //Setting log Product Name
            let devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            if (Menu2.APP_ID == 0) {
                devicetoken[TokenEntry_Enum.AppName] = EnumApps[EnumApps.Init].toString();
            }
            else if (Menu2.APP_ID == 20) {
                devicetoken[TokenEntry_Enum.AppName] = Menu2.APP_NAME.toString();
            }
            else {
                devicetoken[TokenEntry_Enum.AppName] = EnumApps[Menu2.APP_ID].toString();
            }
            localStorage.setItem("DeviceTokenEntry", JSON.stringify(devicetoken));

            if (this.currentLocation == Menu2.code) {
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.selectedMenu));
                this.router.navigate(['atpar/sameurl']);
                setTimeout(() => {
                    this.router.navigate(['atpar/' + Menu2.code]);
                }, 1)
            } else {

                this.router.navigate(['atpar/' + Menu2.code]);
            }

            this.currentLocation = Menu2.code;

            this.document.getElementById('menu-icon').style.left = "175px";
            this.document.getElementById('leftsidebar').style.width = "";
            for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                var div = document.getElementsByClassName('breadcrumb')[i]
                div.setAttribute("style", "left:" + "209px");
            }


        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.Menu = null;
            this.lstMenuList = [];
        }
    }

    logOut() {
        try {
            this.spinnerService.start();
            this.activeddName = '';
            this.httpService.clearAppSession();
            setTimeout(() => {
                this.spinnerService.stop();
                this.router.navigate(['login']);
            }, 1000);
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    aboutAtPar() {
        try {
            this.httpService.getSync({
                "apiMethod": "/api/Common/GetAtParVersions",
                params: {
                    "deviceTokenEntry": this._deviceTokenEntry
                }
            }).catch(this.httpService.handleError).then((res: Response) => {
                this.atParVersions = res.json();
            });
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    onMyProfile() {
        if (this.currentLocation == "myprofile") {
            this.router.navigate(['atpar/sameurl']);
            setTimeout(() => {
                this.router.navigate(['myprofile']);
            }, 1)
        } else {

            this.router.navigate(['myprofile']);
        }
    }

    onTopBarClick() {
        try {
            setTimeout(() => {
                if (this.clickCount != 1) {
                    this.activeddName = '';
                    this.change.emit(this.activeddName);
                }
                this.clickCount = 0;
            }, 10);

            this.filteredData.emit(this.Menu);
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    clientErrorMsg(ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString());
    }

    getDispaly() {
        if (localStorage.getItem('userProfile') != null) {
            var user = (JSON.parse(localStorage.getItem('userProfile')) as MT_ATPAR_USER_PROFILE_APP_ACL_ORG);
            this.user = user;
        }
        return 'none';
    }

    async onMyProfileClick() {
        if (this.currentLocation == "myprofile") {
            this.router.navigate(['atpar/sameurl']);
            await setTimeout(() => {
                this.router.navigate(['atpar/myprofile']);
            }, 1)
        }
        else {
            this.title.setTitle("MyProfile");
            await this.router.navigate(['atpar/myprofile']);
        }

        for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
            var div = document.getElementsByClassName('breadcrumb')[i]
            div.setAttribute("style", "padding-left:" + "0px");
        }
        localStorage.setItem("IsClicked", "false");
        this.showStyle = false;
        this.activeMenu = 'AtPar';
        this.leftbaranimationService.isHide();
        this.leftbaranimationService.isHomeClicked = false;
        localStorage.removeItem('activateLeftBarMenu');
        localStorage.removeItem('ActiveGroup');
        localStorage.setItem('isAtParDashboard', 'YES');

        setTimeout(() => {
            this.breadCrumbSubMenuName = "";
            this.breadCrumbPrvsMenuName = "";
            this.breadCrumbMenuName = "";
            this.breadCrumbAppName = "";
            this.breadCrumbAppName = 'My Profile';
            this.breadCrumbGroupName = '';
            this.breadCrumbsubGroupName = '';
            localStorage.setItem("appName", this.breadCrumbAppName);
            localStorage.setItem("breadSubMenuName", '');
            localStorage.setItem("breadMenuName", '');
        }, 5)

        this.currentLocation = "myprofile";
    }

    async onChangepasswordClick() {

        if (this.currentLocation == "changepassword") {
            this.router.navigate(['atpar/sameurl']);
            await setTimeout(() => {
                this.router.navigate(['atpar/changepassword']);
            }, 1)
        }
        else {
            this.title.setTitle("changepassword");
            await this.router.navigate(['atpar/changepassword']);
        }
        for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
            var div = document.getElementsByClassName('breadcrumb')[i]
            div.setAttribute("style", "padding-left:" + "0px");
        }
        localStorage.setItem("IsClicked", "false");
        this.showStyle = false;
        this.activeMenu = 'AtPar';
        this.leftbaranimationService.isHide();
        this.leftbaranimationService.isHomeClicked = false;
        localStorage.removeItem('activateLeftBarMenu');
        localStorage.removeItem('ActiveGroup');
        localStorage.setItem('isAtParDashboard', 'YES');

        await setTimeout(() => {
            this.breadCrumbSubMenuName = "";
            this.breadCrumbPrvsMenuName = "";
            this.breadCrumbMenuName = "";
            this.breadCrumbAppName = "";
            this.breadCrumbGroupName = '';
            this.breadCrumbsubGroupName = '';
            this.breadCrumbAppName = 'Change Password';
            localStorage.setItem("appName", this.breadCrumbAppName);
            localStorage.setItem("breadSubMenuName", '');
            localStorage.setItem("breadMenuName", '');
        }, 5);
        this.currentLocation = "changepassword";

    }

    async onDownloadsClick() {
        for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
            var div = document.getElementsByClassName('breadcrumb')[i]
            div.setAttribute("style", "padding-left:" + "0px");
        }
        localStorage.setItem("IsClicked", "false");
        this.showStyle = false;
        this.activeMenu = 'AtPar';
        this.leftbaranimationService.isHide();
        this.leftbaranimationService.isHomeClicked = false;
        localStorage.removeItem('activateLeftBarMenu');
        localStorage.removeItem('ActiveGroup');
        localStorage.setItem('isAtParDashboard', 'YES');

        await setTimeout(() => {
            this.breadCrumbSubMenuName = "";
            this.breadCrumbPrvsMenuName = "";
            this.breadCrumbMenuName = "";
            this.breadCrumbAppName = "";
            this.breadCrumbGroupName = '';
            this.breadCrumbsubGroupName = '';
            this.breadCrumbAppName = 'Downloads';
            localStorage.setItem("appName", this.breadCrumbAppName);
            localStorage.setItem("breadSubMenuName", '');
            localStorage.setItem("breadMenuName", '');
        }, 5);

    }

    async onLoginClick() {
        try {
            this.msgs = [];

            await this.confirmationService.confirm({
                message: 'Are you sure you want to redirect to login page ?',
                accept: () => {
                    this.router.navigate(['atpar/sameurl']);
                    setTimeout(() => {
                        this.httpService.clearAppSession();
                        this.router.navigate(['login']);

                    }, 1);
                },
                reject: () => {
                    return;
                }


            });

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }




    OnDestroy() {

        this.spinnerService.stop();
        this.spinnerService = null;
        this.menu = null;
        this.activeddName = null;
        this.showStyle = null;
        this.activeMenu = null;
        this.displayAboutDialog = null;
        this.displayHelpDialog = null;
        this.atParVersions = null;
        this._deviceTokenEntry = null;
        this.user = null;
        this.msgs = null;
        this.clickCount = null;
        this.lstTestList = null;
        this.lstMenuList = null;
        this.lstMenus = null;
        this.lstMainlist = null;
        this.lstMenuList1 = null;
        this.groupModules = null;
        this.appGroups = null;
        this.appModules = null;
        this.selectedMenu = null;
        this.selectedGroup = null;
        this.currentLocation = null;

    }

}
