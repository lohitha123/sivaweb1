"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var linqts_1 = require("linqts");
var AtParEnums_1 = require("../../Shared/AtParEnums");
var event_spinner_service_1 = require("../../components/spinner/event.spinner.service");
var leftbar_animation_service_1 = require("../leftbar-animation.service");
var routepath_1 = require("../../AtPar/Menus/routepath");
var MT_ATPAR_APP_1 = require("../../Entities/MT_ATPAR_APP");
var AtParConstants_1 = require("../../Shared/AtParConstants");
var linq_es5_1 = require("linq-es5");
var VM_USER_REPORT_MENUS_1 = require("../../Entities/VM_USER_REPORT_MENUS");
var LeftBarComponent = (function () {
    function LeftBarComponent(leftbaranimationService, router, location, route, title, document, spinnerService, atParConstant) {
        this.leftbaranimationService = leftbaranimationService;
        this.router = router;
        this.location = location;
        this.route = route;
        this.title = title;
        this.document = document;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.reportsicon = "";
        this.isModuleActive = false;
        this.lstSubGrpMenus = [];
        this.isSubGroupMenu = false;
        this.subMenuGroupName = '';
        this.activeSubMenuGroupName = '';
        this.repModuleName = '';
        this.isReportEnable = false;
        this.reportSubGroupMenus = [];
        this.isSubRepMenusEnable = false;
        this.activeReportSubCategory = '';
        this.activeReportMenu = '';
        this.isReportMenuActive = false;
        this.activeSubReportMenu = '';
        this.reportAppMenus = [];
        this.activeReportModule = 'none';
        this.appModuleChange = new core_1.EventEmitter();
        this.showStyle = true;
        this.caretup = false;
        this.clickCount = 0;
        this.subClickCount = 0;
        this.msgs = [];
        this.subGrpSetUp = '';
        this.subGrpReports = '';
        this.subGrpUserAdministration = '';
        this.subGrpAppsetup = '';
        this.subGrpAppSecurity = '';
        this.subGrpInventory = '';
        this.appGroupList = [];
        this.reportsAppID = AtParEnums_1.EnumApps.Reports;
        this.reportSubCatClickCount = 0;
        this.reportCatClickCount = 0;
        try {
            this.lstMenus = new linqts_1.List();
            this.subGrpSetUp = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.Setup];
            this.subGrpReports = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.Reports];
            this.subGrpUserAdministration = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.UserAdministration];
            this.subGrpAppsetup = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.AppSetup];
            this.subGrpAppSecurity = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.AppSecurity];
            this.subGrpInventory = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.Inventory];
            this.appGroups = new linqts_1.List();
            this.appGroupList = new Array();
            this.appModules = new linqts_1.List();
            this.activeGroupList = new Array();
            this.breadCrumb = new routepath_1.Menus();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    LeftBarComponent.prototype.ngOnInit = function () {
        this.reportsicon = "assets/images/icons/common/reports.png";
        this.getMenusList();
    };
    LeftBarComponent.prototype.getMenusList = function () {
        try {
            if (localStorage.getItem('AppGroups') != undefined && localStorage.getItem('AppGroups') != null && localStorage.getItem('AppGroups') != '') {
                this.appGroups = JSON.parse(localStorage.getItem('AppGroups'));
            }
            if (localStorage.getItem('Apps') != undefined && localStorage.getItem('Apps') != null && localStorage.getItem('Apps') != '') {
                var appModules = JSON.parse(localStorage.getItem('Apps'));
                for (var i = 0; i < appModules.length; i++) {
                    this.appModules.Add(appModules[i]);
                }
            }
            var menuItems = JSON.parse(localStorage.getItem('MenuList'));
            for (var i = 0; i < menuItems.length; i++) {
                this.lstMenus.Add(menuItems[i]);
            }
            if (this.lstMenus != null && this.lstMenus != undefined) {
                this.reportAppMenus = linq_es5_1.asEnumerable(this.lstMenus.ToArray())
                    .Distinct(function (a) { return a.APP_NAME; }).Select(function (x) {
                    return {
                        //'GROUP_ID': x['GROUP_ID'],
                        //'GROUP_NAME': x['GROUP_NAME'],
                        'APP_ID': x['APP_ID'],
                        'APP_NAME': x['APP_NAME'],
                        'APP_IMAGE_PATH': x['APP_IMAGE_PATH']
                    };
                }).OrderBy(function (a) { return a.APP_ID; }).ToArray();
            }
            var menuReportItems = JSON.parse(localStorage.getItem('ReportMenus'));
            var MenuApps = JSON.parse(localStorage.getItem('Apps'));
            this.lstUserReportMenus = new linqts_1.List();
            var repItem;
            for (var i = 0; i < menuReportItems.length; i++) {
                //var reportExists = this.lstMenus.Where(a=>a.REPORT_ID != null).Select(r => r.REPORT_ID.toUpperCase()).Contains(this.lstReportMenus.ElementAt(i).REPORT_ID.toUpperCase())
                var reportExists = this.lstMenus.Where(function (a) { return a.REPORT_ID != null; }).Select(function (r) { return r.REPORT_ID.toUpperCase(); }).Contains(menuReportItems[i]["REPORT_ID"].toUpperCase());
                repItem = new VM_USER_REPORT_MENUS_1.VM_USER_REPORT_MENUS();
                if (!reportExists) {
                    var selectedCategory = MenuApps.find(function (c) { return c.APP_NAME.toUpperCase() == menuReportItems[i]["CATEGORY"].toUpperCase(); });
                    if (selectedCategory != undefined) {
                        repItem.APP_ID = selectedCategory.APP_ID;
                        repItem.APP_NAME = selectedCategory.APP_NAME;
                    }
                    else {
                        repItem.APP_ID = AtParEnums_1.EnumApps.Reports.toString();
                        repItem.APP_NAME = AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.Reports];
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
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    LeftBarComponent.prototype.mousedown = function (reportID) {
        localStorage.setItem('reportID', JSON.stringify(reportID));
    };
    LeftBarComponent.prototype.onModuleClick = function (appModule) {
        var _this = this;
        this.myModule = appModule;
        localStorage.setItem("IsClicked", "true");
        AtParConstants_1.AtParConstants.count = false;
        try {
            if (this.document.getElementById('main') != null) {
                this.document.getElementById('main').style.margin = "";
            }
            this.document.getElementById('leftsidebar').style.display = "block";
            this.document.getElementById('leftsidebar').style.width = "";
            this.document.getElementById('menu-icon').style.left = "175px";
            this.caretup = !this.caretup;
            for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                var div = document.getElementsByClassName('breadcrumb')[i];
                div.setAttribute("style", "left:" + "209px");
            }
            for (var i = 0; i < document.getElementsByClassName('drop1').length; i++) {
                var div = document.getElementsByClassName('drop1')[i];
                div.setAttribute("style", "display:" + "");
            }
            for (var i = 0; i < document.getElementsByClassName(appModule.APP_NAME).length; i++) {
                var span = document.getElementsByClassName(appModule.APP_NAME)[i];
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
                    }
                    else {
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
                    var x = document.getElementsByClassName(activemodulename)[0];
                    x.setAttribute("style", "transform:" + "");
                }
                localStorage.setItem('activeGroupModuleName', appModule.APP_NAME);
                span.setAttribute("style", "transform:" + "rotate(180deg)");
            }
            this.moduleName = appModule.APP_NAME;
            this.appModuleChange.emit(this.moduleName);
            var appId_1;
            if (this.lstMenus != null && this.lstMenus != undefined) {
                this.moduleMenus = new linqts_1.List();
                var modulemenus = this.lstMenus.Where(function (menu) { return menu.APP_NAME == appModule.APP_NAME; });
                this.menudata = null;
                var reportsCount_1 = 0;
                var userAdminCount_1 = 0;
                var appSecurityCount_1 = 0;
                var appSetupCount_1 = 0;
                var inventoryCount_1 = 0;
                var subGrpname_1 = '';
                var userAdminName_1 = '';
                var appSetupName_1 = '';
                var appSecurityName_1 = '';
                var inventoryName_1 = '';
                var reportsName_1 = '';
                modulemenus.ForEach(function (menu) {
                    subGrpname_1 = menu.SUB_MENU_GROUP_NAME.trim().replace(/ /g, '');
                    appId_1 = menu.APP_ID;
                    if (subGrpname_1 == _this.subGrpSetUp) {
                        _this.moduleMenus.Add(menu);
                    }
                    else if (subGrpname_1 == _this.subGrpReports) {
                        if (!_this.isReportModuleEnabled(AtParEnums_1.EnumGroups.Reports)) {
                            reportsName_1 = menu.SUB_MENU_GROUP_NAME;
                            reportsCount_1 = 1;
                        }
                    }
                    else if (subGrpname_1 == _this.subGrpUserAdministration) {
                        _this.lstSubGrpMenus.push(menu);
                        userAdminName_1 = menu.SUB_MENU_GROUP_NAME;
                        userAdminCount_1 = 1;
                    }
                    else if (subGrpname_1 == _this.subGrpAppsetup) {
                        _this.lstSubGrpMenus.push(menu);
                        appSetupName_1 = menu.SUB_MENU_GROUP_NAME;
                        appSetupCount_1 = 1;
                    }
                    else if (subGrpname_1 == _this.subGrpAppSecurity) {
                        _this.lstSubGrpMenus.push(menu);
                        appSecurityName_1 = menu.SUB_MENU_GROUP_NAME;
                        appSecurityCount_1 = 1;
                    }
                    else if (subGrpname_1 == _this.subGrpInventory) {
                        _this.lstSubGrpMenus.push(menu);
                        inventoryName_1 = menu.SUB_MENU_GROUP_NAME;
                        inventoryCount_1 = 1;
                    }
                });
                if (userAdminCount_1 == 1) {
                    this.menu = new routepath_1.Menus();
                    this.menu.SUB_MENU_GROUP_NAME = userAdminName_1;
                    this.menu.MENU_NAME = this.subGrpUserAdministration;
                    this.menu.APP_ID = appId_1;
                    this.menu.APP_NAME = this.moduleName;
                    this.menu.APP_GROUP_IMAGE_PATH = 'assets/images/icons/common/UserAdministration.png';
                    this.moduleMenus.Add(this.menu);
                }
                if (appSetupCount_1 == 1) {
                    this.menu = new routepath_1.Menus();
                    this.menu.SUB_MENU_GROUP_NAME = appSetupName_1;
                    this.menu.MENU_NAME = this.subGrpAppsetup;
                    this.menu.APP_ID = appId_1;
                    this.menu.APP_NAME = this.moduleName;
                    this.menu.APP_GROUP_IMAGE_PATH = 'assets/images/icons/common/AppSetup.png';
                    this.moduleMenus.Add(this.menu);
                }
                if (appSecurityCount_1 == 1) {
                    this.menu = new routepath_1.Menus();
                    this.menu.SUB_MENU_GROUP_NAME = appSecurityName_1;
                    this.menu.MENU_NAME = this.subGrpAppSecurity;
                    this.menu.APP_ID = appId_1;
                    this.menu.APP_NAME = this.moduleName;
                    this.menu.APP_GROUP_IMAGE_PATH = 'assets/images/icons/common/AppSecurity.png';
                    this.moduleMenus.Add(this.menu);
                }
                if (inventoryCount_1 == 1) {
                    this.menu = new routepath_1.Menus();
                    this.menu.SUB_MENU_GROUP_NAME = inventoryName_1;
                    this.menu.MENU_NAME = this.subGrpInventory;
                    this.menu.APP_ID = appId_1;
                    this.menu.APP_NAME = this.moduleName;
                    this.menu.APP_GROUP_IMAGE_PATH = 'assets/images/icons/common/inventory.png';
                    this.moduleMenus.Add(this.menu);
                }
                if (reportsCount_1 == 1) {
                    this.menu = new routepath_1.Menus();
                    this.menu.SUB_MENU_GROUP_NAME = reportsName_1;
                    this.menu.MENU_NAME = this.subGrpReports;
                    this.menu.APP_ID = appId_1;
                    this.menu.APP_NAME = this.moduleName;
                    this.menu.APP_GROUP_IMAGE_PATH = 'assets/images/icons/common/reportsgroup.png';
                    this.moduleMenus.Add(this.menu);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    LeftBarComponent.prototype.isReportModuleEnabled = function (GROUP_ID) {
        try {
            return this.appModules.Where(function (x) { return x.GROUP_ID == GROUP_ID; }).Count() >= 1 ? false : true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    LeftBarComponent.prototype.onModuleMenuClick = function (event, submenu) {
        var _this = this;
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
            var appGroup;
            this.appGroupList = this.appGroups;
            this.activeGroupList = [];
            for (var i_1 = 0; i_1 <= this.appGroupList.length - 1; i_1++) {
                if (this.appGroupList[i_1].GROUP_ID == 8) {
                    this.activeGroupList.push(this.appGroupList[i_1]);
                }
            }
            appGroup = this.activeGroupList[0];
            if (submenu.MENU_NAME == AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.Reports]) {
                localStorage.setItem("IsClicked", "true");
                localStorage.removeItem('modulesubmenu');
                this.document.getElementById('leftsidebar').style.width = "";
                this.document.getElementById('main').style.margin = "";
                this.document.getElementById('menu-icon').style.left = "175px";
                for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                    var div = document.getElementsByClassName('breadcrumb')[i];
                    div.setAttribute("style", "padding-left:" + "0px");
                }
                for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                    var div = document.getElementsByClassName('breadcrumb')[i];
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
                this.groupModules = new linqts_1.List();
                localStorage.setItem('ActiveGroup', JSON.stringify(appGroup));
                localStorage.setItem('activateLeftBarMenu', 'YES');
                localStorage.setItem('isAtParDashboard', 'YES');
                localStorage.setItem("breadSubMenuName", '');
                localStorage.setItem("breadMenuName", '');
                this.groupModules = this.appModules.Where(function (appModule) { return appModule.GROUP_ID == appGroup.GROUP_ID; });
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
                this.moduleName = AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.Reports];
                var groupModule_1 = new MT_ATPAR_APP_1.MT_ATPAR_APP();
                this.groupModules.ForEach(function (moduleApp) {
                    groupModule_1 = moduleApp;
                    _this.moduleName = moduleApp.APP_NAME;
                });
                localStorage.setItem('activeGroupModuleName', groupModule_1.APP_NAME);
                this.moduleMenus = new linqts_1.List();
                var modulemenus = this.lstMenus.Where(function (menu) { return menu.APP_NAME == groupModule_1.APP_NAME; });
                var subGrpname = '';
                modulemenus.ForEach(function (menu) {
                    _this.moduleMenus.Add(menu);
                });
                this.newreportsMenus = new linqts_1.List();
                var modulemenus = this.lstMenus.Where(function (menu) { return menu.APP_NAME == _this.repModuleName; });
                modulemenus.ForEach(function (menu) {
                    if (menu.SUB_MENU_GROUP_NAME == _this.subGrpReports) {
                        _this.newreportsMenus.Add(menu);
                    }
                });
                this.reportSubGroupMenus = [];
                if (this.lstUserReportMenus != null && this.lstUserReportMenus != undefined) {
                    this.reportSubGroupMenus = linq_es5_1.asEnumerable(this.lstUserReportMenus.ToArray())
                        .Distinct(function (a) { return a.SUB_CATEGORY; }).Select(function (x) {
                        return {
                            'APP_ID': x['APP_ID'],
                            'APP_NAME': x['APP_NAME'],
                            'CATEGORY': x['CATEGORY'],
                            'SUB_CATEGORY': x['SUB_CATEGORY']
                        };
                    }).Where(function (a) { return a.APP_NAME == _this.repModuleName; }).OrderBy(function (a) { return a.APP_ID; }).ToArray();
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
                    var devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                    if (submenu.APP_ID == 0) {
                        devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.Init].toString();
                    }
                    else if (submenu.APP_ID == 20) {
                        devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = submenu.APP_NAME.toString();
                    }
                    else {
                        devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[submenu.APP_ID].toString();
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
                        setTimeout(function () {
                            _this.router.navigate(['atpar/' + submenu.ROUTE]);
                        }, 1);
                    }
                    else if (event.ctrlKey) {
                    }
                    else {
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
    };
    LeftBarComponent.prototype.onModuleSubGroupMenuClick = function (event, subGroupMenu) {
        var _this = this;
        try {
            localStorage.setItem("IsClicked", "true");
            localStorage.setItem("bcMenu", JSON.stringify(subGroupMenu));
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(subGroupMenu));
            localStorage.setItem("submenu", JSON.stringify(subGroupMenu));
            //Setting log Product Name
            var devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            if (subGroupMenu.APP_ID == 0) {
                devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.Init].toString();
            }
            else if (subGroupMenu.APP_ID == 20) {
                devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = subGroupMenu.APP_NAME.toString();
            }
            else {
                devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[subGroupMenu.APP_ID].toString();
            }
            localStorage.setItem("DeviceTokenEntry", JSON.stringify(devicetoken));
            localStorage.setItem('isAtParDashboard', 'NO');
            localStorage.setItem("leftMenuUrl", subGroupMenu.ROUTE);
            if (subGroupMenu.MENU_CODE != null && subGroupMenu.MENU_CODE != undefined) {
                localStorage.setItem("menuCode", subGroupMenu.MENU_CODE);
            }
            if (this.currentLocation == subGroupMenu.ROUTE) {
                this.router.navigate(['atpar/sameurl']);
                setTimeout(function () {
                    _this.router.navigate(['atpar/' + subGroupMenu.ROUTE]);
                }, 1);
            }
            else if (event.ctrlKey) {
            }
            else {
                this.title.setTitle(AtParConstants_1.AtParConstants.PRODUCT_NAME + ' - ' + subGroupMenu.MENU_NAME);
                this.router.navigate(['atpar/' + subGroupMenu.ROUTE]);
            }
            this.currentLocation = subGroupMenu.ROUTE;
        }
        catch (ex) {
        }
    };
    LeftBarComponent.prototype.onReportMenuClick = function (submenu) {
        var _this = this;
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
            var devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            if (submenu.APP_ID == 0) {
                devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.Init].toString();
            }
            else if (submenu.APP_ID == 20) {
                devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = submenu.APP_NAME.toString();
            }
            else {
                devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[submenu.APP_ID].toString();
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
                setTimeout(function () {
                    _this.router.navigate(['atpar/' + submenu.ROUTE]);
                }, 1);
            }
            else {
                this.router.navigate(['atpar/' + submenu.ROUTE]);
            }
            this.currentLocation = submenu.ROUTE;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    LeftBarComponent.prototype.onReportModuleClick = function (appModule) {
        var _this = this;
        localStorage.setItem("IsClicked", "true");
        this.isSubRepMenusEnable = false;
        this.activeReportSubCategory = 'none';
        this.newreportsMenus = new linqts_1.List();
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
        this.repModuleName = appModule.APP_NAME;
        if (this.lstMenus != null && this.lstMenus != undefined) {
            this.moduleMenus = new linqts_1.List();
            var modulemenus = this.lstMenus.Where(function (menu) { return menu.APP_NAME == appModule.APP_NAME; });
            var modulemenus1 = this.lstMenus.Where(function (menu) { return menu.APP_NAME == 'Reports'; });
            this.menudata = null;
            var reportsCount = 0;
            modulemenus.ForEach(function (menu) {
                if (menu.SUB_MENU_GROUP_NAME == 'Setup') {
                    // this.moduleMenus.Add(menu as Menus);
                }
                else {
                    reportsCount = 1;
                    _this.newreportsMenus.Add(menu);
                }
            });
            if (this.lstUserReportMenus != null && this.lstUserReportMenus != undefined) {
                this.reportSubGroupMenus = linq_es5_1.asEnumerable(this.lstUserReportMenus.ToArray())
                    .Distinct(function (a) { return a.SUB_CATEGORY; }).Select(function (x) {
                    return {
                        'APP_ID': x['APP_ID'],
                        'APP_NAME': x['APP_NAME'],
                        'CATEGORY': x['CATEGORY'],
                        'SUB_CATEGORY': x['SUB_CATEGORY']
                    };
                }).Where(function (a) { return a.APP_ID == appModule.APP_ID; }).OrderBy(function (a) { return a.APP_ID; }).ToArray();
            }
            modulemenus1.ForEach(function (menu) {
                if (menu.SUB_MENU_GROUP_NAME == 'Setup') {
                    _this.moduleMenus.Add(menu);
                }
            });
        }
    };
    LeftBarComponent.prototype.onSubReportMenuClick = function (appModule) {
        var _this = this;
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
        this.userReportsMenus = new linqts_1.List();
        if (this.lstMenus != null && this.lstMenus != undefined) {
            var modulerepmenus = this.lstUserReportMenus.Where(function (menu) { return (menu.APP_NAME == appModule.APP_NAME) && (menu.CATEGORY == appModule.CATEGORY) && (menu.SUB_CATEGORY == appModule.SUB_CATEGORY); });
            modulerepmenus.ForEach(function (menu) {
                _this.userReportsMenus.Add(menu);
            });
        }
    };
    LeftBarComponent.prototype.clientErrorMsg = function (ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString());
    };
    LeftBarComponent.prototype.OnDestroy = function () {
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
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", linqts_1.List)
    ], LeftBarComponent.prototype, "groupModules", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LeftBarComponent.prototype, "moduleName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LeftBarComponent.prototype, "isModuleActive", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", linqts_1.List)
    ], LeftBarComponent.prototype, "moduleMenus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LeftBarComponent.prototype, "lstSubGrpMenus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LeftBarComponent.prototype, "isSubGroupMenu", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LeftBarComponent.prototype, "subMenuGroupName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LeftBarComponent.prototype, "activeSubMenuGroupName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LeftBarComponent.prototype, "repModuleName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LeftBarComponent.prototype, "isReportEnable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", linqts_1.List)
    ], LeftBarComponent.prototype, "newreportsMenus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LeftBarComponent.prototype, "reportSubGroupMenus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LeftBarComponent.prototype, "isSubRepMenusEnable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LeftBarComponent.prototype, "activeReportSubCategory", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LeftBarComponent.prototype, "activeReportMenu", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LeftBarComponent.prototype, "isReportMenuActive", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LeftBarComponent.prototype, "activeSubReportMenu", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LeftBarComponent.prototype, "reportAppMenus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LeftBarComponent.prototype, "activeReportModule", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", linqts_1.List)
    ], LeftBarComponent.prototype, "userReportsMenus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LeftBarComponent.prototype, "appModuleChange", void 0);
    LeftBarComponent = __decorate([
        core_1.Component({
            selector: 'leftbar-cmp',
            templateUrl: 'leftbar.component.html',
            providers: [AtParConstants_1.AtParConstants]
        }),
        __param(5, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            router_1.Router,
            common_1.Location,
            router_1.ActivatedRoute,
            platform_browser_1.Title, Object, event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants])
    ], LeftBarComponent);
    return LeftBarComponent;
}());
exports.LeftBarComponent = LeftBarComponent;
//# sourceMappingURL=leftbar.component.js.map