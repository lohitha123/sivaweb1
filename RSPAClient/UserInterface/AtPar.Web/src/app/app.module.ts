
import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import {
    BrowserModule,
    Title
} from '@angular/platform-browser';

import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

import {
    RouterModule,
    Router,
    NavigationStart,
    RoutesRecognized,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';

import {
    HttpModule,
    JsonpModule
} from '@angular/http';

import {
    PlatformLocation,
    LocationStrategy,
    PathLocationStrategy,
    APP_BASE_HREF
} from '@angular/common';

import {
    ActivatedRoute,
    Params
} from '@angular/router';

import { HttpService } from './Shared/HttpService';
import { TkitHttpService } from './Shared/tkitHttpService';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './AtPar/atpar-page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './Shared/shared.module';
import { SpinnerModule } from './components/spinner/spinner.module';
import { IzendaIntegrate } from './_helpers/izendaintegrate';

import {
    TokenEntry_Enum,
    YesNo_Enum
} from './Shared/AtParEnums';

import { Menus } from './AtPar/Menus/routepath';
import { AtParConstants } from './Shared/AtParConstants';

import {
    ExportReportComponent,
    ExportReportViewerComponent,
    ExportDashboardViewerComponent
} from './export/index';

import { SpinnerService } from './components/spinner/event.spinner.service';

@NgModule({

    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
        RouterModule,
        SharedModule.forRoot(),
        SpinnerModule,
        AppRoutingModule,
    ],

    declarations: [
        AppComponent,
        PageNotFoundComponent,
        ExportReportComponent,
        ExportReportViewerComponent,
        ExportDashboardViewerComponent
    ],

    bootstrap: [AppComponent],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],

    providers: [
        Title,
        HttpService,
        IzendaIntegrate,
        AtParConstants,
        { provide: APP_BASE_HREF, useValue: '/AtPar/AtParWeb/' },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        SpinnerService,
        TkitHttpService
    ]

})

export class AppModule {

    routerCounter: number;
    _deviceTokenEntry: string[] = [];
    breadCrumbMenu: Menus;

    constructor(
        private title: Title,
        private router: Router,
        private spinnerService: SpinnerService,
        private activatedRoute: ActivatedRoute,
        private platformLocation: PlatformLocation,
        private atParConstant: AtParConstants,
        private httpService: HttpService,
        private tkitHttpService: HttpService
    ) {
        this.breadCrumbMenu = new Menus();
        this.routerCounter = 0;
        this.subscribePlatformLocationEvents();
        this.subscribeRouterEvents();
    }

    getTabSession() {
        try {
            if (sessionStorage.getItem('isRefreshTab') != null && sessionStorage.getItem('isRefreshTab') != null != undefined && sessionStorage.getItem('isRefreshTab') != '') {
                if (sessionStorage.getItem('isRefreshTab') == YesNo_Enum.Y.toString()) {
                    let sessionItems = [];
                    if (sessionStorage.getItem('localStorageItems') != null && sessionStorage.getItem('localStorageItems') != undefined && sessionStorage.getItem('localStorageItems') != '') {
                        sessionItems = JSON.parse(sessionStorage.getItem('localStorageItems'));
                        var keys = Object.keys(sessionItems);
                        var i = keys.length;
                        while (i--) {
                            localStorage.setItem(sessionItems[keys[i]].key, sessionItems[keys[i]].value);
                        }
                    }
                    if (sessionStorage.getItem('sessionStorageItems') != null && sessionStorage.getItem('sessionStorageItems') != undefined && sessionStorage.getItem('sessionStorageItems') != '') {
                        sessionItems = JSON.parse(sessionStorage.getItem('sessionStorageItems'));
                        keys = Object.keys(sessionItems);
                        i = keys.length;
                        while (i--) {
                            sessionStorage.setItem(sessionItems[keys[i]].key, sessionItems[keys[i]].value);
                        }
                    }

                }
            }
            else {
                if (this.router.url.indexOf('/trackit') != 0) {
                    if (localStorage.getItem('appTabCount') != null && localStorage.getItem('appTabCount') != undefined && localStorage.getItem('appTabCount') != '') {
                        if (parseInt(localStorage.getItem('appTabCount')) == 0) {
                            this.httpService.clearAppSession();
                        }
                        else {
                        }
                    }
                    else {
                        this.httpService.clearAppSession();
                    }
                }
                else {
                    if (localStorage.getItem('tkitAppTabCount') != null && localStorage.getItem('tkitAppTabCount') != undefined && localStorage.getItem('tkitAppTabCount') != '') {
                        if (parseInt(localStorage.getItem('tkitAppTabCount')) == 0) {
                            this.tkitHttpService.clearAppSession();
                        }
                        else {
                        }
                    }
                    else {
                        this.tkitHttpService.clearAppSession();
                    }
                }

            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'getTabSession');
        }
    }

    subscribePlatformLocationEvents() {
        try {
            this.platformLocation.onPopState((event: any) => {
                history.forward();
            });
        } catch (ex) {
            this.clientErrorMsg(ex, 'subscribePlatformLocationEvents');
        }
    }

    async subscribeRouterEvents() {
        try {
            await this.getTabSession();
            await this.router.events.subscribe(async (event: any) => {
                if (event instanceof NavigationStart) {
                    if (event.url.indexOf('/trackit') != 0) {
                        this.onSubscribeAtParNavigationStart(event);
                    }
                    else {
                        this.onSubscribeTrackITNavigationStart(event);
                    }
                }
                else if (event instanceof RoutesRecognized) {
                }
                else if (event instanceof NavigationEnd) {
                    if (event.url.indexOf('/trackit') != 0) {
                        this.onSubscribeAtParNavigationEnd(event);
                    }
                    else {
                        this.onSubscribeTrackITNavigationEnd(event);
                    }
                    this.resetVariables();
                }
                else if (event instanceof NavigationCancel) {
                    this.resetVariables();
                }
                else if (event instanceof NavigationError) {
                    this.resetVariables();
                }
            });
        } catch (ex) {
            this.clientErrorMsg(ex, 'subscribeRouterEvents');
        }
    }

    onSubscribeAtParNavigationStart(event: NavigationStart) {
        try {
            if (localStorage.getItem('DeviceTokenEntry') != null && localStorage.getItem('DeviceTokenEntry') != undefined) {
                this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            }
            if (this.routerCounter == 0) {
                this.routerCounter = 1;
                if (localStorage.getItem('DeviceTokenEntry') == null || localStorage.getItem('DeviceTokenEntry') == undefined) {
                    if (event.url != '/pagenotfound' && event.url != '/forgot-password' && event.url != '/login' && !event.url.startsWith('/login?systemid=') && event.url != '/' && event.url != '/trackitlogin' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                        this.router.navigate(['login']);
                    }
                }
                else {
                    if (this._deviceTokenEntry[TokenEntry_Enum.UserID] == null || this._deviceTokenEntry[TokenEntry_Enum.UserID] == undefined || this._deviceTokenEntry[TokenEntry_Enum.UserID] == '') {
                        if (event.url != '/pagenotfound' && event.url != '/forgot-password' && event.url != '/login' && !event.url.startsWith('/login?systemid=') && event.url != '/' && event.url != '/trackitlogin' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                            this.router.navigate(['login']);
                        }
                    }
                    else {
                        if (event.url != '/trackitlogin' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                            if (event.id != 1) {
                                if (event.url == '/pagenotfound' || event.url == '/forgot-password' || event.url == '/login' || event.url.startsWith('/login?systemid=') || event.url == '/') {
                                    this.router.navigate(['atpar']);
                                }
                                else if (event.url != '/atpar') {
                                    localStorage.setItem('isAtParDashboard', 'NO');
                                }
                            }
                            else {
                                if (event.url == '/pagenotfound' || event.url == '/forgot-password' || event.url == '/login' || event.url.startsWith('/login?systemid=') || event.url == '/') {
                                    this.httpService.clearAppSession();
                                }
                                else {
                                    if (event.url != '/atpar') {
                                        localStorage.setItem('isAtParDashboard', 'NO');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'onSubscribeAtParNavigationStart');
        }
    }

    onSubscribeTrackITNavigationStart(event: NavigationStart) {
        try {
            if (localStorage.getItem('tkitDeviceTokenEntry') != null && localStorage.getItem('tkitDeviceTokenEntry') != undefined) {
                this._deviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
            }
            if (this.routerCounter == 0) {
                this.routerCounter = 1;
                if (localStorage.getItem('tkitDeviceTokenEntry') == null || localStorage.getItem('tkitDeviceTokenEntry') == undefined) {
                    if (event.url != '/pagenotfound' && event.url != '/forgot-password' && event.url != '/login' && !event.url.startsWith('/login?systemid=') && event.url != '/' && event.url != '/trackitlogin' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                        this.router.navigate(['trackitlogin']);
                    }
                }
                else {
                    if (this._deviceTokenEntry[TokenEntry_Enum.UserID] == null || this._deviceTokenEntry[TokenEntry_Enum.UserID] == undefined || this._deviceTokenEntry[TokenEntry_Enum.UserID] == '') {
                        if (event.url != '/pagenotfound' && event.url != '/forgot-password' && event.url != '/login' && !event.url.startsWith('/login?systemid=') && event.url != '/' && event.url != '/trackitlogin' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                            this.router.navigate(['trackitlogin']);
                        }
                    }
                    else {
                        if (event.url != '/pagenotfound' && event.url != '/forgot-password' && event.url != '/login' && !event.url.startsWith('/login?systemid=') && event.url != '/' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                            if (event.id != 1) {
                                if (!event.url.startsWith('/trackitdashboard') || event.url == '/trackitlogin') {
                                    this.router.navigate(['trackitdashboard']);
                                }
                            }
                            else {
                                if (event.url == '/trackitlogin') {
                                    this.tkitHttpService.clearAppSession();
                                }
                            }
                        }
                    }
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'onSubscribeTrackITNavigationStart');
        }
    }

    onSubscribeAtParNavigationEnd(event: NavigationEnd) {
        try {
            let subMenu: Menus = new Menus();
            //var appName: string = localStorage.getItem('activeGroupModuleName');
            var menuItems: Menus[] = JSON.parse(localStorage.getItem('MenuList')) as Menus[];
            if (event.url != '/atpar') {
                if (menuItems != null && menuItems != undefined) {
                    for (var i = 0; i < menuItems.length; i++) {
                        if (event.url.indexOf(menuItems[i].ROUTE) >= 0) {
                            subMenu = menuItems[i];
                            if (subMenu.ROUTE == 'reports/viewreport') {
                                //let urlsplit = event.url.split('?');
                                //if (urlsplit[0] == '/atpar/reports/viewreport') {
                                //    event.url = subMenu.ROUTE;
                                //}
                                let reportId = JSON.parse(localStorage.getItem('reportID'));
                                let freports = menuItems.filter(x => x.REPORT_ID == reportId);
                                if (freports != null && freports.length > 0) {
                                    subMenu = freports[0];
                                } else {
                                    subMenu = JSON.parse(localStorage.getItem('submenu'));
                                }
                            }
                            localStorage.setItem('submenu', JSON.stringify(subMenu));
                            localStorage.setItem("bcMenu", JSON.stringify(subMenu));
                            break;
                        }
                    }

                    // localStorage.setItem("leftMenuUrl", subGroupMenu.ROUTE);
                    if (subMenu != null && subMenu != undefined && subMenu.MENU_NAME != null) {
                        this.title.setTitle(subMenu.MENU_NAME);
                    }

                    this.activatedRoute.queryParams.subscribe((params: Params) => {
                        if (Object.keys(params).length == 0) {
                            if (!(event.url.indexOf('/myprofile') >= 0 || event.url.indexOf('/changepassword') >= 0 || event.url.indexOf('/downloads') >= 0)) {
                                if (subMenu != null && subMenu != undefined) {
                                    this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(subMenu));
                                }
                            }
                            else {
                                if (event.url.indexOf('/myprofile') >= 0) {
                                    this.breadCrumbMenu.MENU_NAME = "";
                                    this.breadCrumbMenu.ROUTE = '';
                                    this.breadCrumbMenu.SUB_MENU_NAME = '';
                                    this.breadCrumbMenu.APP_NAME = 'My Profile';
                                    this.breadCrumbMenu.IS_DIV = true;
                                    this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                                }
                                else if (event.url.indexOf('/changepassword') >= 0) {
                                    this.breadCrumbMenu.MENU_NAME = "";
                                    this.breadCrumbMenu.ROUTE = '';
                                    this.breadCrumbMenu.SUB_MENU_NAME = '';
                                    this.breadCrumbMenu.APP_NAME = 'Change Password';
                                    this.breadCrumbMenu.IS_DIV = true;
                                    this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                                }
                                else if (event.url.indexOf('/downloads') >= 0) {
                                    this.breadCrumbMenu.MENU_NAME = "";
                                    this.breadCrumbMenu.ROUTE = '';
                                    this.breadCrumbMenu.SUB_MENU_NAME = '';
                                    this.breadCrumbMenu.APP_NAME = 'Downloads';
                                    this.breadCrumbMenu.IS_DIV = true;
                                    this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                                }
                            }
                        }
                        else if (localStorage.getItem('localBreadCrumb') != undefined && localStorage.getItem('localBreadCrumb') != null) {
                            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(JSON.parse(localStorage.getItem('localBreadCrumb')) as Menus));
                            setTimeout(() => {
                                localStorage.removeItem('localBreadCrumb');
                            }, 5)

                        }
                    });

                }
            }
            else {
                this.title.setTitle('Dashboard');
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'onSubscribeAtParNavigationEnd');
        }
    }

    onSubscribeTrackITNavigationEnd(event: NavigationEnd) {
    }

    resetVariables() {
        try {
            this.routerCounter = 0;
            this._deviceTokenEntry = [];
            window.history.pushState([], null, null);
        } catch (ex) {
            this.clientErrorMsg(ex, 'resetVariables');
        }
    }

    clientErrorMsg(ex, funName) {
        let msgs: any = [];
        this.atParConstant.catchClientError(msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    }

}
