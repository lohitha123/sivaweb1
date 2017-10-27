
import { Component, OnDestroy, OnInit, Inject, Directive } from '@angular/core';
import { DOCUMENT, Title } from '@angular/platform-browser';
import { List } from 'linqts';
import { asEnumerable } from 'linq-es5';

import {
    TokenEntry_Enum,
    EnumApps,
    SubMenuGroup,
    EnumGroups
} from '../Shared/AtParEnums';

import { SpinnerService } from '../components/spinner/event.spinner.service';
import { LeftBarAnimationService } from './leftbar-animation.service';
import { Menus } from '../AtPar/Menus/routepath';
import { MT_ATPAR_APP } from '../Entities/MT_ATPAR_APP';
import { MT_ATPAR_APP_GROUP } from '../Entities/MT_ATPAR_APP_GROUP';
import { Message } from '../components/common/api';
import { AtParConstants } from '../Shared/AtParConstants';
import { HttpService } from '../Shared/HttpService';
import { VM_USER_REPORT_MENUS } from '../Entities/VM_USER_REPORT_MENUS';

/**
*	This class represents the lazy loaded DashboardComponent.
*/
declare var module: {
    id: string;
}


@Component({

    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: [AtParConstants]

})

export class HomeComponent implements OnInit {

    showAdmin: boolean = true;
    isModuleActive: boolean;

    activeMenu: String;
    showStyle: String;
    hideStyle: String;
    moduleName: string;
    activeddName: string;
    Menu: string;
    hideModuleName: string = '';

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
    reportsApp: MT_ATPAR_APP;

    lstSubGrpMenus: Menus[] = [];
    isSubGroupMenu: boolean = false;
    subMenuGroupName: string = '';
    activeSubMenuGroupName: string = '';

    repModuleName: string = '';
    isReportEnable: boolean = false;
    activeReportMenu: string = '';
    isReportMenuActive: boolean = false;
    activeReportModule: string = '';
    isSubRepMenusEnable: boolean = false;
    activeReportSubCategory: string = '';
    activeSubReportMenu: string = '';

    newreportsMenus: List<Menus>;
    lstUserReportMenus: List<VM_USER_REPORT_MENUS>;
    userReportsMenus: List<VM_USER_REPORT_MENUS>;
    reportSubGroupMenus: any = [];

    subGrpSetUp: string = '';
    subGrpReports: string = '';
    subGrpUserAdministration: string = '';
    subGrpAppsetup: string = '';
    subGrpAppSecurity: string = '';
    subGrpInventory: string = '';

    constructor(
        private leftBarAnimateService: LeftBarAnimationService,
        private title: Title,
        @Inject(DOCUMENT) private document,
        private atParConstant: AtParConstants,
        private spinnerservice: SpinnerService,
        private httpService: HttpService
    ) {
        try {

            this.subGrpSetUp = SubMenuGroup[SubMenuGroup.Setup];
            this.subGrpReports = SubMenuGroup[SubMenuGroup.Reports];
            this.subGrpUserAdministration = SubMenuGroup[SubMenuGroup.UserAdministration];
            this.subGrpAppsetup = SubMenuGroup[SubMenuGroup.AppSetup];
            this.subGrpAppSecurity = SubMenuGroup[SubMenuGroup.AppSecurity];
            this.subGrpInventory = SubMenuGroup[SubMenuGroup.Inventory];

            if (localStorage.getItem("submenu") != null) {
                let submenu = JSON.parse(localStorage.getItem("submenu"));
                this.title.setTitle(submenu.MENU_NAME);
            } else {
                this.title.setTitle('Dashboard');
            }

            this.activeddName = '';
            this.showStyle = "block";
            this.hideStyle = "none";
            this.isModuleActive = false;
            this.groupModules = new List<MT_ATPAR_APP>();
            this.moduleName = 'none';
            this.moduleMenus = new List<Menus>();
            this.reportsApp = new MT_ATPAR_APP();

            leftBarAnimateService.changeEmitted$.subscribe(
                groupModules => {
                    this.groupModules = new List<MT_ATPAR_APP>();
                    this.groupModules = groupModules;
                }
            );

            leftBarAnimateService.changeEmittedActiveAppName.subscribe(
                moduleName => {
                    this.moduleName = moduleName;
                }
            )

            leftBarAnimateService.changeEmittedLeftBarFromTopBar.subscribe(
                active => {
                    if (active == true) {
                        this.getLeftBarMenu();
                    }
                }
            )

            leftBarAnimateService.changeReportsActiveMenu$.subscribe(
                activeReportMenu => {
                    this.activeReportMenu = activeReportMenu;
                }
            )

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ngOnInit() {
        try {
            this.getMenu();
            this.checkLeftBarMenuAcces();
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    getMenu() {
        try {
            this.activeMenu = this.leftBarAnimateService.getActiveLeftBar();
            if (this.activeMenu != 'none') {
                return this.showStyle;
            } else {
                return this.hideStyle;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    checkLeftBarMenuAcces() {
        try {
            if (localStorage.getItem('activateLeftBarMenu') != null && localStorage.getItem('activateLeftBarMenu') != undefined) {
                if (localStorage.getItem('isAtParDashboard') != null && localStorage.getItem('isAtParDashboard') != undefined) {
                    if (localStorage.getItem('isAtParDashboard') != 'YES') {
                        this.getLeftBarMenu();
                    }
                }
                else {
                    this.getLeftBarMenu();
                }
            }
            else if (true) {
                //this.getLeftBarMenu();
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    appModuleChange(activeModuleName) {
        this.moduleName = activeModuleName;
    }

    getLeftBarMenu() {
        try {
            this.lstMenus = new List<Menus>();
            this.appModules = new List<MT_ATPAR_APP>();
            if (localStorage.getItem('activateLeftBarMenu') != null && localStorage.getItem('activateLeftBarMenu') != undefined) {
                this.activeGroup = JSON.parse(localStorage.getItem('ActiveGroup').toString()) as MT_ATPAR_APP_GROUP;

                var menuItems = JSON.parse(localStorage.getItem('MenuList'));
                for (var i = 0; i < menuItems.length; i++) {
                    this.lstMenus.Add(menuItems[i] as Menus);
                }

                if (localStorage.getItem('Apps') != undefined && localStorage.getItem('Apps') != null && localStorage.getItem('Apps') != '') {
                    var appModules = JSON.parse(localStorage.getItem('Apps'));
                    for (var i = 0; i < appModules.length; i++) {
                        this.appModules.Add(appModules[i] as MT_ATPAR_APP);
                    }
                }

                if (this.activeGroup.GROUP_ID != EnumGroups.Reports) {
                    this.groupModules = this.appModules.Where(appModule => appModule.GROUP_ID == this.activeGroup.GROUP_ID);
                }
                else
                {
                    this.groupModules = new List<MT_ATPAR_APP>();
                    if (localStorage.getItem('reportsApp') != null && localStorage.getItem('reportsApp') != undefined && localStorage.getItem('reportsApp') != '') {
                        this.groupModules.Add(JSON.parse(localStorage.getItem('reportsApp')) as MT_ATPAR_APP);
                    }
                }

                if (localStorage.getItem('activeGroupModuleName') != null && localStorage.getItem('activeGroupModuleName') != undefined) {
                    var activeModuleName = localStorage.getItem('activeGroupModuleName').toString();
                    this.moduleName = activeModuleName;

                    this.isModuleActive = true;
                    if (this.lstMenus != null && this.lstMenus != undefined) {
                        this.moduleMenus = new List<Menus>();
                        this.lstSubGrpMenus = [];
                        this.newreportsMenus = new List<Menus>();
                        var modulemenus = this.lstMenus.Where(menu => menu.APP_NAME == activeModuleName) as List<Menus>;

                        let reportsCount: number = 0;
                        let userAdminCount: number = 0;
                        let appSecurityCount: number = 0;
                        let appSetupCount: number = 0;
                        let inventoryCount: number = 0;
                        let subGrpname: string = '';
                        let userAdminName: string = '';
                        let appSetupName: string = '';
                        let appSecurityName: string = '';
                        let inventoryName: string = '';
                        let reportsName: string = '';
                        let appId: number;

                        modulemenus.ForEach(menu => {
                            subGrpname = menu.SUB_MENU_GROUP_NAME.trim().replace(/ /g, '');
                            appId = menu.APP_ID;

                            if (subGrpname == this.subGrpSetUp) {
                                this.moduleMenus.Add(menu as Menus);
                            }
                            else if (subGrpname == this.subGrpReports) {
                                //if (!this.isReportModuleEnabled(EnumGroups.Reports)) {
                                reportsName = menu.SUB_MENU_GROUP_NAME;
                                reportsCount = 1;
                                //}
                            }
                            else if (subGrpname == this.subGrpUserAdministration) {
                                this.lstSubGrpMenus.push(menu);
                                userAdminName = menu.SUB_MENU_GROUP_NAME;
                                userAdminCount = 1;
                            }
                            else if (subGrpname == this.subGrpAppsetup) {
                                this.lstSubGrpMenus.push(menu);
                                appSetupName = menu.SUB_MENU_GROUP_NAME;
                                appSetupCount = 1;
                            }
                            else if (subGrpname == this.subGrpAppSecurity) {
                                this.lstSubGrpMenus.push(menu);
                                appSecurityName = menu.SUB_MENU_GROUP_NAME;
                                appSecurityCount = 1;
                            }
                            else if (subGrpname == this.subGrpInventory) {
                                this.lstSubGrpMenus.push(menu);
                                inventoryName = menu.SUB_MENU_GROUP_NAME;
                                inventoryCount = 1;
                            }

                        });

                        if (userAdminCount == 1) {
                            this.menu = new Menus();
                            this.menu.SUB_MENU_GROUP_NAME = userAdminName;
                            this.menu.MENU_NAME = this.subGrpUserAdministration;
                            this.menu.APP_ID = appId;
                            this.menu.APP_NAME = this.moduleName;
                            this.menu.APP_GROUP_IMAGE_PATH = 'assets/images/icons/common/UserAdministration.png';
                            this.moduleMenus.Add(this.menu);
                        }

                        if (appSetupCount == 1) {
                            this.menu = new Menus();
                            this.menu.SUB_MENU_GROUP_NAME = appSetupName;
                            this.menu.MENU_NAME = this.subGrpAppsetup;
                            this.menu.APP_ID = appId;
                            this.menu.APP_NAME = this.moduleName;
                            this.menu.APP_GROUP_IMAGE_PATH = 'assets/images/icons/common/AppSetup.png';
                            this.moduleMenus.Add(this.menu);
                        }

                        if (appSecurityCount == 1) {
                            this.menu = new Menus();
                            this.menu.SUB_MENU_GROUP_NAME = appSecurityName;
                            this.menu.MENU_NAME = this.subGrpAppSecurity;
                            this.menu.APP_ID = appId;
                            this.menu.APP_NAME = this.moduleName;
                            this.menu.APP_GROUP_IMAGE_PATH = 'assets/images/icons/common/AppSecurity.png';
                            this.moduleMenus.Add(this.menu);
                        }

                        if (inventoryCount == 1) {
                            this.menu = new Menus();
                            this.menu.SUB_MENU_GROUP_NAME = inventoryName;
                            this.menu.MENU_NAME = this.subGrpInventory;
                            this.menu.APP_ID = appId;
                            this.menu.APP_NAME = this.moduleName;
                            this.menu.APP_GROUP_IMAGE_PATH = 'assets/images/icons/common/inventory.png';
                            this.moduleMenus.Add(this.menu);
                        }

                        if (reportsCount == 1) {
                            this.menu = new Menus();
                            this.menu.SUB_MENU_GROUP_NAME = reportsName;
                            this.menu.MENU_NAME = this.subGrpReports;
                            this.menu.APP_ID = appId;
                            this.menu.APP_NAME = this.moduleName;
                            this.menu.APP_GROUP_IMAGE_PATH = 'assets/images/icons/common/reportsgroup.png';
                            this.moduleMenus.Add(this.menu);

                        }

                        if (localStorage.getItem('modulesubmenu') != null && localStorage.getItem('modulesubmenu') != undefined && localStorage.getItem('modulesubmenu').toString() != '') {
                            let submenu = JSON.parse(localStorage.getItem('modulesubmenu')) as Menus;
                            this.isSubGroupMenu = true;
                            this.subMenuGroupName = submenu.SUB_MENU_GROUP_NAME;
                            this.activeSubMenuGroupName = submenu.MENU_NAME;
                        }

                        if (this.activeGroup.GROUP_ID == EnumGroups.Reports) {
                            if (localStorage.getItem('activeReportModule') != null && localStorage.getItem('activeReportModule') != undefined && localStorage.getItem('activeReportCategoryName') != '') {
                                this.repModuleName = localStorage.getItem('activeReportModule').toString();
                                this.activeReportModule = localStorage.getItem('activeReportModule').toString();
                                this.isReportEnable = true;
                            }

                            if (localStorage.getItem('activeSubReportModule') != null && localStorage.getItem('activeSubReportModule') != undefined && localStorage.getItem('activeReportSubCategoryName') != '') {
                                this.activeReportSubCategory = localStorage.getItem('activeSubReportModule').toString();
                                this.activeSubReportMenu = localStorage.getItem('activeSubReportModule').toString();
                                this.isSubRepMenusEnable = true;
                            }

                            if (localStorage.getItem('activeReportMenu') != null && localStorage.getItem('activeReportMenu') != undefined && localStorage.getItem('activeReportMenu') != '') {
                                this.activeReportMenu = localStorage.getItem('activeReportMenu').toString();
                                this.isReportMenuActive = true;
                            }

                            var modulemenus = this.lstMenus.Where(menu => menu.APP_NAME == this.repModuleName) as List<Menus>;

                            modulemenus.ForEach(menu => {
                                if (menu.SUB_MENU_GROUP_NAME == EnumGroups[EnumGroups.Reports]) {
                                    this.newreportsMenus.Add(menu);
                                }
                            });

                            var menuReportItems = JSON.parse(localStorage.getItem('ReportMenus'));
                            var MenuApps = JSON.parse(localStorage.getItem('Apps'));

                            this.lstUserReportMenus = new List<VM_USER_REPORT_MENUS>();
                            var repItem: VM_USER_REPORT_MENUS;
                            for (var i = 0; i < menuReportItems.length; i++) {

                                var reportExists = this.lstMenus.Where(a => a.REPORT_ID != null).Select(r => r.REPORT_ID.toUpperCase()).Contains(menuReportItems[i]["REPORT_ID"].toUpperCase())
                                repItem = new VM_USER_REPORT_MENUS();
                                if (!reportExists) {
                                    var selectedCategory = MenuApps.find(c => c.APP_NAME.toUpperCase() == menuReportItems[i]["CATEGORY"].toUpperCase());
                                    if (selectedCategory != undefined) {
                                        repItem.APP_ID = selectedCategory.APP_ID;
                                        repItem.APP_NAME = selectedCategory.APP_NAME;
                                    }
                                    else {
                                        repItem.APP_ID = EnumApps.Reports.toString();
                                        repItem.APP_NAME = EnumApps[EnumApps.Reports];
                                    }
                                    repItem.CATEGORY = menuReportItems[i]["CATEGORY"];
                                    repItem.MENU_CODE = "reports.aspx";
                                    repItem.MENU_NAME = menuReportItems[i]["REPORT_NAME"];
                                    repItem.REPORT_ID = menuReportItems[i]["REPORT_ID"].toUpperCase();
                                    repItem.SUB_CATEGORY = menuReportItems[i]["SUB_CATEGORY"];
                                    if (menuReportItems[i]["REPORT_TYPE"] == "D") {
                                        repItem.ROUTE = "reports/dashboardviewer";
                                    }
                                    else {
                                        repItem.ROUTE = "reports/viewreport";
                                    }
                                    repItem.REPORT_TYPE = menuReportItems[i]["REPORT_TYPE"];
                                    repItem.MENU_SEQ_NO = i + 1;
                                    this.lstUserReportMenus.Add(repItem);
                                }
                            }

                            if (this.lstUserReportMenus != null && this.lstUserReportMenus != undefined) {
                                this.reportSubGroupMenus = asEnumerable(this.lstUserReportMenus.ToArray())
                                    .Distinct(a => a.SUB_CATEGORY).Select(function (x) {
                                        return {
                                            'APP_ID': x['APP_ID'],
                                            'APP_NAME': x['APP_NAME'],
                                            'CATEGORY': x['CATEGORY'],
                                            'SUB_CATEGORY': x['SUB_CATEGORY']
                                        }
                                    }).Where(a => a.APP_NAME == this.repModuleName.toString()).OrderBy(a => a.APP_ID).ToArray();
                            }

                            this.userReportsMenus = new List<VM_USER_REPORT_MENUS>();

                            if (this.lstMenus != null && this.lstMenus != undefined) {
                                var modulerepmenus = this.lstUserReportMenus.Where(menu => (menu.APP_NAME == this.repModuleName) && (menu.CATEGORY == this.repModuleName) && (menu.SUB_CATEGORY == this.activeReportSubCategory)) as List<VM_USER_REPORT_MENUS>;
                                modulerepmenus.ForEach(menu => {
                                    this.userReportsMenus.Add(menu);
                                });
                            }

                        }

                    }
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    isReportModuleEnabled(GROUP_ID: number) {
        try {
            return this.appModules.Where(x => x.GROUP_ID == GROUP_ID).Count() >= 1 ? false : true;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
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
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerservice, ex.toString());
    }

    divClick() {
        this.httpService.checkSession();
        this.filteredData(null);
        this.Menu = null;
    }

    mobileDisplay() {
        AtParConstants.count = !AtParConstants.count;
        if (AtParConstants.count) {
            this.document.getElementById('main').style.margin = "0 0 0 35px";
            this.document.getElementById('leftsidebar').style.width = "35px";
            this.document.getElementById('menu-icon').style.left = "35px";
            for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                var div = document.getElementsByClassName('breadcrumb')[i]
                div.setAttribute("style", "left:" + "69px");
            }
            this.hideModuleName = this.moduleName;
            this.moduleName = 'none';

        } else {
            this.document.getElementById('main').style.margin = "";
            this.document.getElementById('leftsidebar').style.display = "block";
            this.document.getElementById('leftsidebar').style.width = "";
            this.document.getElementById('menu-icon').style.left = "175px";
            for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                var div = document.getElementsByClassName('breadcrumb')[i]
                div.setAttribute("style", "left:" + "209px");
            }
            this.moduleName = this.hideModuleName;
            this.hideModuleName = '';
        }
    }

    OnDestroy() {

        this.spinnerservice = null;
        this.activeMenu = null;
        this.showAdmin = null;
        this.showStyle = null;
        this.hideStyle = null;
        this.groupModules = null;
        this.lstMenus = null;
        this.moduleName = null;
        this.activeddName = null;
        this.isModuleActive = null;
        this.menu = null;
        this.lstGroupModuleMenus = null;
        this.lstModuleItems = null;
        this.appModules = null;
        this.activeGroup = null;
        this.moduleMenus = null;
        this.msgs = null;
        this.menudata = null;
        this.Menu = null;

    }

}
