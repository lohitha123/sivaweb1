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
var platform_browser_1 = require("@angular/platform-browser");
var linqts_1 = require("linqts");
var linq_es5_1 = require("linq-es5");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var leftbar_animation_service_1 = require("./leftbar-animation.service");
var routepath_1 = require("../AtPar/Menus/routepath");
var AtParConstants_1 = require("../Shared/AtParConstants");
var HttpService_1 = require("../Shared/HttpService");
var VM_USER_REPORT_MENUS_1 = require("../Entities/VM_USER_REPORT_MENUS");
var HomeComponent = (function () {
    function HomeComponent(leftBarAnimateService, title, document, atParConstant, spinnerservice, httpService) {
        var _this = this;
        this.leftBarAnimateService = leftBarAnimateService;
        this.title = title;
        this.document = document;
        this.atParConstant = atParConstant;
        this.spinnerservice = spinnerservice;
        this.httpService = httpService;
        this.showAdmin = true;
        this.hideModuleName = '';
        this.msgs = [];
        this.lstSubGrpMenus = [];
        this.isSubGroupMenu = false;
        this.subMenuGroupName = '';
        this.activeSubMenuGroupName = '';
        this.repModuleName = '';
        this.isReportEnable = false;
        this.activeReportMenu = '';
        this.isReportMenuActive = false;
        this.activeReportModule = '';
        this.isSubRepMenusEnable = false;
        this.activeReportSubCategory = '';
        this.activeSubReportMenu = '';
        this.reportSubGroupMenus = [];
        this.subGrpSetUp = '';
        this.subGrpReports = '';
        this.subGrpUserAdministration = '';
        this.subGrpAppsetup = '';
        this.subGrpAppSecurity = '';
        this.subGrpInventory = '';
        try {
            this.subGrpSetUp = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.Setup];
            this.subGrpReports = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.Reports];
            this.subGrpUserAdministration = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.UserAdministration];
            this.subGrpAppsetup = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.AppSetup];
            this.subGrpAppSecurity = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.AppSecurity];
            this.subGrpInventory = AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.Inventory];
            if (localStorage.getItem("submenu") != null) {
                var submenu = JSON.parse(localStorage.getItem("submenu"));
                this.title.setTitle(submenu.MENU_NAME);
            }
            else {
                this.title.setTitle('Dashboard');
            }
            this.activeddName = '';
            this.showStyle = "block";
            this.hideStyle = "none";
            this.isModuleActive = false;
            this.groupModules = new linqts_1.List();
            this.moduleName = 'none';
            this.moduleMenus = new linqts_1.List();
            leftBarAnimateService.changeEmitted$.subscribe(function (groupModules) {
                _this.groupModules = new linqts_1.List();
                _this.groupModules = groupModules;
            });
            leftBarAnimateService.changeEmittedActiveAppName.subscribe(function (moduleName) {
                _this.moduleName = moduleName;
            });
            leftBarAnimateService.changeEmittedLeftBarFromTopBar.subscribe(function (active) {
                if (active == true) {
                    _this.getLeftBarMenu();
                }
            });
            leftBarAnimateService.changeReportsActiveMenu$.subscribe(function (activeReportMenu) {
                _this.activeReportMenu = activeReportMenu;
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    HomeComponent.prototype.ngOnInit = function () {
        try {
            this.getMenu();
            this.checkLeftBarMenuAcces();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    HomeComponent.prototype.getMenu = function () {
        try {
            this.activeMenu = this.leftBarAnimateService.getActiveLeftBar();
            if (this.activeMenu != 'none') {
                return this.showStyle;
            }
            else {
                return this.hideStyle;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    HomeComponent.prototype.checkLeftBarMenuAcces = function () {
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
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    HomeComponent.prototype.appModuleChange = function (activeModuleName) {
        this.moduleName = activeModuleName;
    };
    HomeComponent.prototype.getLeftBarMenu = function () {
        var _this = this;
        try {
            this.lstMenus = new linqts_1.List();
            this.appModules = new linqts_1.List();
            if (localStorage.getItem('activateLeftBarMenu') != null && localStorage.getItem('activateLeftBarMenu') != undefined) {
                this.activeGroup = JSON.parse(localStorage.getItem('ActiveGroup').toString());
                var menuItems = JSON.parse(localStorage.getItem('MenuList'));
                for (var i = 0; i < menuItems.length; i++) {
                    this.lstMenus.Add(menuItems[i]);
                }
                if (localStorage.getItem('Apps') != undefined && localStorage.getItem('Apps') != null && localStorage.getItem('Apps') != '') {
                    var appModules = JSON.parse(localStorage.getItem('Apps'));
                    for (var i = 0; i < appModules.length; i++) {
                        this.appModules.Add(appModules[i]);
                    }
                }
                this.groupModules = this.appModules.Where(function (appModule) { return appModule.GROUP_ID == _this.activeGroup.GROUP_ID; });
                if (localStorage.getItem('activeGroupModuleName') != null && localStorage.getItem('activeGroupModuleName') != undefined) {
                    var activeModuleName = localStorage.getItem('activeGroupModuleName').toString();
                    this.moduleName = activeModuleName;
                    this.isModuleActive = true;
                    if (this.lstMenus != null && this.lstMenus != undefined) {
                        this.moduleMenus = new linqts_1.List();
                        this.lstSubGrpMenus = [];
                        this.newreportsMenus = new linqts_1.List();
                        var modulemenus = this.lstMenus.Where(function (menu) { return menu.APP_NAME == activeModuleName; });
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
                        var appId_1;
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
                        if (localStorage.getItem('modulesubmenu') != null && localStorage.getItem('modulesubmenu') != undefined && localStorage.getItem('modulesubmenu').toString() != '') {
                            var submenu = JSON.parse(localStorage.getItem('modulesubmenu'));
                            this.isSubGroupMenu = true;
                            this.subMenuGroupName = submenu.SUB_MENU_GROUP_NAME;
                            this.activeSubMenuGroupName = submenu.MENU_NAME;
                        }
                        if (this.activeGroup.GROUP_ID == AtParEnums_1.EnumGroups.Reports) {
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
                            var modulemenus = this.lstMenus.Where(function (menu) { return menu.APP_NAME == _this.repModuleName; });
                            modulemenus.ForEach(function (menu) {
                                if (menu.SUB_MENU_GROUP_NAME == AtParEnums_1.EnumGroups[AtParEnums_1.EnumGroups.Reports]) {
                                    _this.newreportsMenus.Add(menu);
                                }
                            });
                            var menuReportItems = JSON.parse(localStorage.getItem('ReportMenus'));
                            var MenuApps = JSON.parse(localStorage.getItem('Apps'));
                            this.lstUserReportMenus = new linqts_1.List();
                            var repItem;
                            for (var i = 0; i < menuReportItems.length; i++) {
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
                            if (this.lstUserReportMenus != null && this.lstUserReportMenus != undefined) {
                                this.reportSubGroupMenus = linq_es5_1.asEnumerable(this.lstUserReportMenus.ToArray())
                                    .Distinct(function (a) { return a.SUB_CATEGORY; }).Select(function (x) {
                                    return {
                                        'APP_ID': x['APP_ID'],
                                        'APP_NAME': x['APP_NAME'],
                                        'CATEGORY': x['CATEGORY'],
                                        'SUB_CATEGORY': x['SUB_CATEGORY']
                                    };
                                }).Where(function (a) { return a.APP_NAME == _this.repModuleName.toString(); }).OrderBy(function (a) { return a.APP_ID; }).ToArray();
                            }
                            this.userReportsMenus = new linqts_1.List();
                            if (this.lstMenus != null && this.lstMenus != undefined) {
                                var modulerepmenus = this.lstUserReportMenus.Where(function (menu) { return (menu.APP_NAME == _this.repModuleName) && (menu.CATEGORY == _this.repModuleName) && (menu.SUB_CATEGORY == _this.activeReportSubCategory); });
                                modulerepmenus.ForEach(function (menu) {
                                    _this.userReportsMenus.Add(menu);
                                });
                            }
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    HomeComponent.prototype.isReportModuleEnabled = function (GROUP_ID) {
        try {
            return this.appModules.Where(function (x) { return x.GROUP_ID == GROUP_ID; }).Count() >= 1 ? false : true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    HomeComponent.prototype.onHomeClick = function () {
        this.activeddName = '';
        this.Menu = '';
    };
    HomeComponent.prototype.profileClickChanged = function (activeddName) {
        this.activeddName = activeddName;
    };
    HomeComponent.prototype.filteredData = function (searchString) {
        this.Menu = searchString;
    };
    HomeComponent.prototype.clientErrorMsg = function (ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerservice, ex.toString());
    };
    HomeComponent.prototype.divClick = function () {
        this.httpService.checkSession();
        this.filteredData(null);
        this.Menu = null;
    };
    HomeComponent.prototype.mobileDisplay = function () {
        AtParConstants_1.AtParConstants.count = !AtParConstants_1.AtParConstants.count;
        if (AtParConstants_1.AtParConstants.count) {
            this.document.getElementById('main').style.margin = "0 0 0 35px";
            this.document.getElementById('leftsidebar').style.width = "35px";
            this.document.getElementById('menu-icon').style.left = "35px";
            for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                var div = document.getElementsByClassName('breadcrumb')[i];
                div.setAttribute("style", "left:" + "69px");
            }
            this.hideModuleName = this.moduleName;
            this.moduleName = 'none';
        }
        else {
            this.document.getElementById('main').style.margin = "";
            this.document.getElementById('leftsidebar').style.display = "block";
            this.document.getElementById('leftsidebar').style.width = "";
            this.document.getElementById('menu-icon').style.left = "175px";
            for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                var div = document.getElementsByClassName('breadcrumb')[i];
                div.setAttribute("style", "left:" + "209px");
            }
            this.moduleName = this.hideModuleName;
            this.hideModuleName = '';
        }
    };
    HomeComponent.prototype.OnDestroy = function () {
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
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home-cmp',
            templateUrl: 'home.component.html',
            providers: [AtParConstants_1.AtParConstants]
        }),
        __param(2, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            platform_browser_1.Title, Object, AtParConstants_1.AtParConstants,
            event_spinner_service_1.SpinnerService,
            HttpService_1.HttpService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map