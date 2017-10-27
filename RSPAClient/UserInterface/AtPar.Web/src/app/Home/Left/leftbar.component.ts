
import {
    Component,
    Input,
    OnInit,
    OnDestroy,
    Output,
    EventEmitter,
    Inject,
    Directive
} from '@angular/core';

import {
    CommonModule,
    Location
} from '@angular/common';

import {
    Router,
    ActivatedRoute
} from '@angular/router';

import {
    DOCUMENT,
    Title
} from '@angular/platform-browser';

import { List } from 'linqts';

import {
    TokenEntry_Enum,
    EnumApps,
    SubMenuGroup,
    EnumGroups
} from '../../Shared/AtParEnums';

import { SpinnerService } from '../../components/spinner/event.spinner.service';
import { LeftBarAnimationService } from '../leftbar-animation.service';
import { Menus } from '../../AtPar/Menus/routepath';
import { MT_ATPAR_APP } from '../../Entities/MT_ATPAR_APP';
import { Message } from '../../components/common/api';
import { AtParConstants } from '../../Shared/AtParConstants';
import { asEnumerable } from 'linq-es5';
import { VM_USER_REPORT_MENUS } from '../../Entities/VM_USER_REPORT_MENUS';
import { MT_ATPAR_APP_GROUP } from '../../Entities/MT_ATPAR_APP_GROUP';


declare var module: {
    id: string;
}
@Component({


    selector: 'leftbar-cmp',
    templateUrl: 'leftbar.component.html',
    providers: [AtParConstants]

})

export class LeftBarComponent implements OnInit {
    reportsicon: string = "";

    @Input() groupModules: List<MT_ATPAR_APP>;
    @Input() moduleName: string;
    @Input() isModuleActive: boolean = false;
    @Input() moduleMenus: List<Menus>;
    @Input() lstSubGrpMenus: Menus[] = [];
    @Input() isSubGroupMenu: boolean = false;
    @Input() subMenuGroupName: string = '';
    @Input() activeSubMenuGroupName: string = '';
    @Input() repModuleName: string = '';
    @Input() isReportEnable: boolean = false;
    @Input() newreportsMenus: List<Menus>;
    @Input() reportSubGroupMenus: any = [];
    @Input() isSubRepMenusEnable: boolean = false;
    @Input() activeReportSubCategory: string = '';
    @Input() activeReportMenu: string = '';
    @Input() isReportMenuActive: boolean = false;
    @Input() activeSubReportMenu: string = '';
    @Input() reportAppMenus: any = [];
    @Input() activeReportModule: string = 'none';
    @Input() userReportsMenus: List<VM_USER_REPORT_MENUS>;

    @Output() appModuleChange: EventEmitter<string> = new EventEmitter<string>();

    showStyle: boolean = true;
    caretup: boolean = false;
    menudata: any;
    lstModuleItems: any;
    clickCount: number = 0;
    subClickCount: number = 0;
    currentLocation: string;
    menu: Menus;
    lstGroupModuleMenus: List<Menus>;
    lstMenus: List<Menus>;
    msgs: Message[] = [];
    lstUserReportMenus: List<VM_USER_REPORT_MENUS>;

    reportscnt: number;
    subGrpSetUp: string = '';
    subGrpReports: string = '';
    subGrpUserAdministration: string = '';
    subGrpAppsetup: string = '';
    subGrpAppSecurity: string = '';
    subGrpInventory: string = '';

    appGroupList: any = [];
    appGroups: List<MT_ATPAR_APP_GROUP>;
    appModules: List<MT_ATPAR_APP>;
    activeGroup: string;
    activeGroupList: Array<MT_ATPAR_APP_GROUP>;
    breadCrumb: Menus;
    myModule: MT_ATPAR_APP;
    reportsAppID = EnumApps.Reports;
    reportSubCatClickCount: number = 0;
    reportsApp: MT_ATPAR_APP;

    constructor(
        private leftbaranimationService: LeftBarAnimationService,
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private title: Title,
        @Inject(DOCUMENT) private document,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
    ) {
        try {
            this.lstMenus = new List<Menus>();

            this.subGrpSetUp = SubMenuGroup[SubMenuGroup.Setup];
            this.subGrpReports = SubMenuGroup[SubMenuGroup.Reports];
            this.subGrpUserAdministration = SubMenuGroup[SubMenuGroup.UserAdministration];
            this.subGrpAppsetup = SubMenuGroup[SubMenuGroup.AppSetup];
            this.subGrpAppSecurity = SubMenuGroup[SubMenuGroup.AppSecurity];
            this.subGrpInventory = SubMenuGroup[SubMenuGroup.Inventory];
            this.appGroups = new List<MT_ATPAR_APP_GROUP>();
            this.appGroupList = new Array<MT_ATPAR_APP_GROUP>();
            this.appModules = new List<MT_ATPAR_APP>();
            this.activeGroupList = new Array<MT_ATPAR_APP_GROUP>();
            this.breadCrumb = new Menus();
            this.reportsApp = new MT_ATPAR_APP();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ngOnInit() {
        this.reportsicon = "assets/images/icons/common/reports.png";
        this.getMenusList();
    }

    getMenusList() {
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

            if (localStorage.getItem('reportsApp') != undefined && localStorage.getItem('reportsApp') != null && localStorage.getItem('reportsApp') != '') {
                this.reportsApp = JSON.parse(localStorage.getItem('reportsApp'));
            }

            var menuItems = JSON.parse(localStorage.getItem('MenuList'));
            for (var i = 0; i < menuItems.length; i++) {
                this.lstMenus.Add(menuItems[i] as Menus);
            }

            if (this.lstMenus != null && this.lstMenus != undefined) {
                this.reportAppMenus = asEnumerable(this.lstMenus.ToArray())
                    .Distinct(a => a.APP_NAME).Select(function (x) {
                        return {
                            //'GROUP_ID': x['GROUP_ID'],
                            //'GROUP_NAME': x['GROUP_NAME'],
                            'APP_ID': x['APP_ID'],
                            'APP_NAME': x['APP_NAME'],
                            'APP_IMAGE_PATH': x['APP_IMAGE_PATH']

                        }
                    }).OrderBy(a => a.APP_ID).ToArray();
            }

            var menuReportItems = JSON.parse(localStorage.getItem('ReportMenus'));
            var MenuApps = JSON.parse(localStorage.getItem('Apps'));

            this.lstUserReportMenus = new List<VM_USER_REPORT_MENUS>();
            var repItem: VM_USER_REPORT_MENUS;
            for (var i = 0; i < menuReportItems.length; i++) {

                //var reportExists = this.lstMenus.Where(a=>a.REPORT_ID != null).Select(r => r.REPORT_ID.toUpperCase()).Contains(this.lstReportMenus.ElementAt(i).REPORT_ID.toUpperCase())
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


        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    mousedown(reportID) {
        localStorage.setItem('reportID', JSON.stringify(reportID))
    }
    onModuleClick(appModule: MT_ATPAR_APP) {
        this.myModule = appModule;
        localStorage.setItem("IsClicked", "true");
        AtParConstants.count = false;

        try {
            if (this.document.getElementById('main') != null) {
                this.document.getElementById('main').style.margin = "";
            }
            this.document.getElementById('leftsidebar').style.display = "block";
            this.document.getElementById('leftsidebar').style.width = "";
            this.document.getElementById('menu-icon').style.left = "175px";
            this.caretup = !this.caretup;

            for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                var div = document.getElementsByClassName('breadcrumb')[i]
                div.setAttribute("style", "left:" + "209px");
            }

            for (var i = 0; i < document.getElementsByClassName('drop1').length; i++) {
                var div = document.getElementsByClassName('drop1')[i]
                div.setAttribute("style", "display:" + "");
            }

            for (var i = 0; i < document.getElementsByClassName(appModule.APP_NAME).length; i++) {
                var span = document.getElementsByClassName(appModule.APP_NAME)[i]
                span.setAttribute("style", "transform:" + "");
            }

            this.isReportEnable = false;
            this.lstSubGrpMenus = [];
            this.subMenuGroupName = '';
            this.activeSubMenuGroupName = '';
            this.isSubGroupMenu = false;

            this.isReportEnable = false;
            this.repModuleName = '';

            if (this.moduleName == appModule.APP_NAME) {
                this.isModuleActive = false;
                this.clickCount = this.clickCount + 1;
                localStorage.removeItem('activeGroupModuleName');
                if (this.clickCount > 1) {
                    this.isModuleActive = true;
                    this.clickCount = 0;
                    localStorage.setItem('activeGroupModuleName', appModule.APP_NAME);
                    if (this.clickCount % 2 == 0) {
                        span.setAttribute("style", "transform:" + "rotate(180deg)");
                    } else {
                        span.setAttribute("style", "transform:" + "");
                    }
                }
            }
            else {
                this.clickCount = 0;
                this.isModuleActive = true;
                var activemodulename = localStorage.getItem('activeGroupModuleName');
                if (activemodulename != appModule.APP_NAME && (activemodulename != null && activemodulename != undefined)) {
                    console.log('correct');
                    var x = document.getElementsByClassName(activemodulename)[0]
                    x.setAttribute("style", "transform:" + "");

                }
                localStorage.setItem('activeGroupModuleName', appModule.APP_NAME);
                span.setAttribute("style", "transform:" + "rotate(180deg)");
            }

            this.moduleName = appModule.APP_NAME;
            this.appModuleChange.emit(this.moduleName);
            let appId: number;

            if (this.lstMenus != null && this.lstMenus != undefined) {
                this.moduleMenus = new List<Menus>();
                var modulemenus = this.lstMenus.Where(menu => menu.APP_NAME == appModule.APP_NAME) as List<Menus>;

                this.menudata = null;
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
                        // }
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

    onModuleMenuClick(event, submenu: Menus) {
        try {

            if (submenu.ROUTE != null && submenu.ROUTE != undefined && submenu.ROUTE != '') {
                this.isSubGroupMenu = false;
                this.subMenuGroupName = '';
                this.isSubRepMenusEnable = false;
                this.activeReportSubCategory = 'none';
                this.activeReportMenu = 'none';
                this.isReportMenuActive = false;
                this.activeSubReportMenu = 'none';
                this.repModuleName = '';
                this.isReportEnable = false;
            }

            var appGroup: MT_ATPAR_APP_GROUP;
            this.appGroupList = this.appGroups;
            this.activeGroupList = [];
            for (let i = 0; i <= this.appGroupList.length - 1; i++) {
                if (this.appGroupList[i].GROUP_ID == 8) {
                    this.activeGroupList.push(this.appGroupList[i]);
                }
            }
            appGroup = this.activeGroupList[0];

            if (submenu.MENU_NAME == SubMenuGroup[SubMenuGroup.Reports]) {

                localStorage.setItem("IsClicked", "true");
                localStorage.removeItem('modulesubmenu');

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

                this.breadCrumb.GROUP_NAME = appGroup.GROUP_NAME;
                this.breadCrumb.MENU_NAME = "";
                this.breadCrumb.APP_NAME = appGroup.GROUP_NAME;
                //this.breadCrumb.SUB_MENU_NAME = '';
                this.activeGroup = appGroup.GROUP_NAME;

                localStorage.removeItem('activeGroupModuleName');
                localStorage.removeItem('submenu');
                localStorage.removeItem("bcMenu");

                this.groupModules = new List<MT_ATPAR_APP>();

                localStorage.setItem('ActiveGroup', JSON.stringify(appGroup));
                localStorage.setItem('activateLeftBarMenu', 'YES');
                localStorage.setItem('isAtParDashboard', 'YES');
                localStorage.setItem("breadSubMenuName", '');
                localStorage.setItem("breadMenuName", '');

                this.groupModules.Add(this.reportsApp);
                this.showStyle = true;

                this.leftbaranimationService.emitChange(this.groupModules);
                //this.leftbaranimationService.emitChangeActiveMenu(this.activeGroup);
                //if (this.activeGroup != '') {
                //    this.leftbaranimationService.setActiveLeftBar(this.activeGroup);
                //}

                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumb));

                this.repModuleName = this.moduleName;
                this.isReportEnable = true;
                this.isModuleActive = true;
                this.moduleName = EnumApps[EnumApps.Reports];
                let groupModule: MT_ATPAR_APP = new MT_ATPAR_APP();
                this.groupModules.ForEach(moduleApp => {
                    groupModule = moduleApp as MT_ATPAR_APP;
                    this.moduleName = moduleApp.APP_NAME;
                })
                localStorage.setItem('activeGroupModuleName', groupModule.APP_NAME);

                this.moduleMenus = new List<Menus>();
                var modulemenus = this.lstMenus.Where(menu => menu.APP_NAME == groupModule.APP_NAME) as List<Menus>;

                var subGrpname = '';
                modulemenus.ForEach(menu => {
                    this.moduleMenus.Add(menu as Menus);
                });

                this.newreportsMenus = new List<Menus>();

                var modulemenus = this.lstMenus.Where(menu => menu.APP_NAME == this.repModuleName) as List<Menus>;

                modulemenus.ForEach(menu => {
                    if (menu.SUB_MENU_GROUP_NAME == this.subGrpReports) {
                        this.newreportsMenus.Add(menu);
                    }
                });

                this.reportSubGroupMenus = [];

                if (this.lstUserReportMenus != null && this.lstUserReportMenus != undefined) {
                    this.reportSubGroupMenus = asEnumerable(this.lstUserReportMenus.ToArray())
                        .Distinct(a => a.SUB_CATEGORY).Select(function (x) {
                            return {
                                'APP_ID': x['APP_ID'],
                                'APP_NAME': x['APP_NAME'],
                                'CATEGORY': x['CATEGORY'],
                                'SUB_CATEGORY': x['SUB_CATEGORY']
                            }
                        }).Where(a => a.APP_NAME == this.repModuleName).OrderBy(a => a.APP_ID).ToArray();
                }

                this.router.navigate(['atpar']);
            }

            else {
                localStorage.setItem("IsClicked", "true");
                this.spinnerService.start();
                localStorage.removeItem('modulesubmenu');

                if (submenu.SUB_MENU_GROUP_NAME == this.subGrpSetUp) {
                    localStorage.setItem("bcMenu", JSON.stringify(submenu));
                    this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(submenu));
                    localStorage.setItem("submenu", JSON.stringify(submenu));

                    //Setting log Product Name
                    let devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                    if (submenu.APP_ID == 0) {
                        devicetoken[TokenEntry_Enum.AppName] = EnumApps[EnumApps.Init].toString();
                    }
                    else if (submenu.APP_ID == 20) {
                        devicetoken[TokenEntry_Enum.AppName] = submenu.APP_NAME.toString();
                    }
                    else {
                        devicetoken[TokenEntry_Enum.AppName] = EnumApps[submenu.APP_ID].toString();
                    }
                    localStorage.setItem("DeviceTokenEntry", JSON.stringify(devicetoken));

                    localStorage.setItem('isAtParDashboard', 'NO');

                    this.isReportEnable = false;
                    this.isSubGroupMenu = false;

                    localStorage.setItem("leftMenuUrl", submenu.ROUTE);
                    if (submenu.MENU_CODE != null && submenu.MENU_CODE != undefined) {
                        localStorage.setItem("menuCode", submenu.MENU_CODE);
                    }

                    if (this.currentLocation == submenu.ROUTE) {
                        this.router.navigate(['atpar/sameurl']);
                        setTimeout(() => {
                            this.router.navigate(['atpar/' + submenu.ROUTE]);
                        }, 1)
                    }
                    else if (event.ctrlKey) {

                    } else {
                        //this.title.setTitle(AtParConstants.PRODUCT_NAME + ' - ' + submenu.MENU_NAME);
                        this.title.setTitle(submenu.MENU_NAME);
                        this.router.navigate(['atpar/' + submenu.ROUTE]);
                    }
                    this.currentLocation = submenu.ROUTE;
                }
                else if (submenu.MENU_NAME != this.subGrpReports) {

                    if (this.subMenuGroupName == submenu.SUB_MENU_GROUP_NAME) {
                        this.isSubGroupMenu = false;
                        this.subClickCount = this.subClickCount + 1;
                        localStorage.removeItem('modulesubmenu');
                        if (this.subClickCount > 1) {
                            this.isSubGroupMenu = true;
                            this.subClickCount = 0;
                            localStorage.setItem('modulesubmenu', JSON.stringify(submenu));
                        }
                    }
                    else {
                        this.subClickCount = 0;
                        this.isSubGroupMenu = true;
                        localStorage.setItem('modulesubmenu', JSON.stringify(submenu));
                    }

                    localStorage.setItem('modulesubmenu', JSON.stringify(submenu));
                    this.subMenuGroupName = submenu.SUB_MENU_GROUP_NAME;
                    this.activeSubMenuGroupName = submenu.MENU_NAME;

                }
                else if (submenu.MENU_NAME == this.subGrpReports) {
                    this.isSubGroupMenu = false;
                    this.isReportEnable = !this.isReportEnable;
                }
                this.spinnerService.stop();

            }

        }
        catch (ex) {
            throw ex;
        }
    }

    onModuleSubGroupMenuClick(event, subGroupMenu: Menus) {
        try {
            localStorage.setItem("IsClicked", "true");
            localStorage.setItem("bcMenu", JSON.stringify(subGroupMenu));
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(subGroupMenu));
            localStorage.setItem("submenu", JSON.stringify(subGroupMenu));

            //Setting log Product Name
            let devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            if (subGroupMenu.APP_ID == 0) {
                devicetoken[TokenEntry_Enum.AppName] = EnumApps[EnumApps.Init].toString();
            }
            else if (subGroupMenu.APP_ID == 20) {
                devicetoken[TokenEntry_Enum.AppName] = subGroupMenu.APP_NAME.toString();
            }
            else {
                devicetoken[TokenEntry_Enum.AppName] = EnumApps[subGroupMenu.APP_ID].toString();
            }
            localStorage.setItem("DeviceTokenEntry", JSON.stringify(devicetoken));

            localStorage.setItem('isAtParDashboard', 'NO');


            localStorage.setItem("leftMenuUrl", subGroupMenu.ROUTE);
            if (subGroupMenu.MENU_CODE != null && subGroupMenu.MENU_CODE != undefined) {
                localStorage.setItem("menuCode", subGroupMenu.MENU_CODE);
            }

            if (this.currentLocation == subGroupMenu.ROUTE) {
                this.router.navigate(['atpar/sameurl']);
                setTimeout(() => {
                    this.router.navigate(['atpar/' + subGroupMenu.ROUTE]);
                }, 1)
            }
            else if (event.ctrlKey) {

            } else {
                this.title.setTitle(AtParConstants.PRODUCT_NAME + ' - ' + subGroupMenu.MENU_NAME);
                this.router.navigate(['atpar/' + subGroupMenu.ROUTE]);
            }
            this.currentLocation = subGroupMenu.ROUTE;
        } catch (ex) {

        }
    }

    onReportMenuClick(submenu: Menus) {
        try {
            this.isReportMenuActive = true;
            this.activeReportMenu = submenu.MENU_NAME;
            this.activeReportModule = submenu.APP_NAME;
            this.activeSubReportMenu = submenu.SUB_CATEGORY;
            localStorage.setItem('activeReportModule', submenu.APP_NAME);
            localStorage.setItem('activeSubReportModule', submenu.SUB_CATEGORY);
            localStorage.setItem('activeReportMenu', submenu.MENU_NAME);
            localStorage.setItem("IsClicked", "true");
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(submenu));
            this.title.setTitle(submenu.MENU_NAME);
            let devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            if (submenu.APP_ID == 0) {
                devicetoken[TokenEntry_Enum.AppName] = EnumApps[EnumApps.Init].toString();
            }
            else if (submenu.APP_ID == 20) {
                devicetoken[TokenEntry_Enum.AppName] = submenu.APP_NAME.toString();
            }
            else {
                devicetoken[TokenEntry_Enum.AppName] = EnumApps[submenu.APP_ID].toString();
            }

            localStorage.setItem("DeviceTokenEntry", JSON.stringify(devicetoken));
            localStorage.setItem("submenu", JSON.stringify(submenu));

            localStorage.setItem("bcMenu", JSON.stringify(submenu));
            localStorage.setItem("leftMenuUrl", submenu.ROUTE);

            if (submenu.MENU_CODE != null && submenu.MENU_CODE != undefined) {
                localStorage.setItem("menuCode", submenu.MENU_CODE);
                localStorage.setItem("reportID", submenu.REPORT_ID);
                localStorage.setItem("menuName", submenu.MENU_NAME);
            }

            if (this.currentLocation == submenu.ROUTE) {
                this.router.navigate(['atpar/sameurl']);
                setTimeout(() => {
                    this.router.navigate(['atpar/' + submenu.ROUTE]);
                }, 1)
            }
            else {
                this.router.navigate(['atpar/' + submenu.ROUTE]);
            }
            this.currentLocation = submenu.ROUTE;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    reportCatClickCount: number = 0;

    onReportModuleClick(appModule: any) {

        localStorage.setItem("IsClicked", "true");
        this.isSubRepMenusEnable = false;
        this.activeReportSubCategory = 'none';
        this.newreportsMenus = new List<Menus>();

        if (this.repModuleName == appModule.APP_NAME) {
            this.isReportEnable = false;
            this.reportCatClickCount = this.reportCatClickCount + 1;
            localStorage.removeItem('activeReportCategoryName');
            if (this.reportCatClickCount > 1) {
                this.isReportEnable = true;
                this.reportCatClickCount = 0;
                localStorage.setItem('activeReportCategoryName', appModule.APP_NAME);
            }
        }
        else {
            this.reportCatClickCount = 0;
            this.isReportEnable = true;
            localStorage.setItem('activeReportCategoryName', appModule.APP_NAME);
        }

        this.repModuleName = appModule.APP_NAME
        if (this.lstMenus != null && this.lstMenus != undefined) {
            this.moduleMenus = new List<Menus>();
            var modulemenus = this.lstMenus.Where(menu => menu.APP_NAME == appModule.APP_NAME) as List<Menus>;
            var modulemenus1 = this.lstMenus.Where(menu => menu.APP_NAME == 'Reports') as List<Menus>;

            this.menudata = null;
            var reportsCount = 0;
            modulemenus.ForEach(menu => {
                if (menu.SUB_MENU_GROUP_NAME == 'Setup') {
                    // this.moduleMenus.Add(menu as Menus);
                }
                else {
                    reportsCount = 1;
                    this.newreportsMenus.Add(menu);
                }
            });

            if (this.lstUserReportMenus != null && this.lstUserReportMenus != undefined) {
                this.reportSubGroupMenus = asEnumerable(this.lstUserReportMenus.ToArray())
                    .Distinct(a => a.SUB_CATEGORY).Select(function (x) {
                        return {
                            'APP_ID': x['APP_ID'],
                            'APP_NAME': x['APP_NAME'],
                            'CATEGORY': x['CATEGORY'],
                            'SUB_CATEGORY': x['SUB_CATEGORY']
                        }
                    }).Where(a => a.APP_ID == appModule.APP_ID && (a.SUB_CATEGORY == "Public" || a.SUB_CATEGORY == "My Reports")).OrderBy(a => a.APP_ID).ToArray();
            }

            modulemenus1.ForEach(menu => {
                if (menu.SUB_MENU_GROUP_NAME == 'Setup') {
                    this.moduleMenus.Add(menu as Menus);
                }
            });
        }
    }

    onSubReportMenuClick(appModule: VM_USER_REPORT_MENUS) {
        localStorage.setItem("IsClicked", "true");
        if (this.activeReportSubCategory == appModule.SUB_CATEGORY) {
            this.isSubRepMenusEnable = false;
            this.reportSubCatClickCount = this.reportSubCatClickCount + 1;
            localStorage.removeItem('activeReportSubCategoryName');
            if (this.reportSubCatClickCount > 1) {
                this.isSubRepMenusEnable = true;
                this.reportSubCatClickCount = 0;
                localStorage.setItem('activeReportSubCategoryName', appModule.SUB_CATEGORY);
            }
        }
        else {
            this.reportSubCatClickCount = 0;
            this.isSubRepMenusEnable = true;
            localStorage.setItem('activeReportSubCategoryName', appModule.SUB_CATEGORY);
        }

        this.activeReportSubCategory = appModule.SUB_CATEGORY;
        this.userReportsMenus = new List<VM_USER_REPORT_MENUS>();

        if (this.lstMenus != null && this.lstMenus != undefined) {
            var modulerepmenus = this.lstUserReportMenus.Where(menu => (menu.APP_NAME == appModule.APP_NAME) && (menu.CATEGORY == appModule.CATEGORY) && (menu.SUB_CATEGORY == appModule.SUB_CATEGORY)) as List<VM_USER_REPORT_MENUS>;
            modulerepmenus.ForEach(menu => {
                this.userReportsMenus.Add(menu);
            });
        }
    }

    clientErrorMsg(ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString());
    }

    OnDestroy() {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.groupModules = null;
        this.lstMenus = null;
        this.moduleName = null;
        this.isModuleActive = null;
        this.showStyle = null;
        this.menudata = null;
        this.moduleMenus = null;
        this.menu = null;
        this.lstGroupModuleMenus = null;
        this.lstModuleItems = null;
        this.clickCount = null;
        this.currentLocation = null;
        this.msgs = null;
        this.lstUserReportMenus = null;
        this.userReportsMenus = null;
        this.reportSubGroupMenus = null;
        this.reportAppMenus = null;
        this.newreportsMenus = null;
        this.appGroupList = null;
        this.activeGroupList = null;
        this.appModules = null;
    }

}
