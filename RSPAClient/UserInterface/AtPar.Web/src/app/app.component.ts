
import {
    Component,
    HostListener
} from '@angular/core';

import { Router } from '@angular/router';

import {
    TokenEntry_Enum,
    YesNo_Enum
} from './Shared/AtParEnums';

import { IzendaIntegrate } from './_helpers/izendaintegrate';
import { HttpService } from './Shared/HttpService';
import { TkitHttpService } from './Shared/tkitHttpService';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [
        HttpService,
        TkitHttpService
    ]
})

export class AppComponent {

    localStorageItems: any;
    sessionStorageItems: any;

    constructor(
        private router: Router,
        private httpService: HttpService,
        private tkitHttpService: TkitHttpService,
        private izItergrate: IzendaIntegrate
    ) {
        this.izItergrate.DoIzendaConfig();
    }

    @HostListener('window:load', ['$event'])
    onLoadHandler(event: any) {

        if (this.router.url.indexOf('/trackit') != 0) {
            this.onAtParLoad();
        }
        else {
            this.onTrackITLoad();
        }
        if (sessionStorage.getItem('isRefreshTab') != null && sessionStorage.getItem('isRefreshTab') != undefined && sessionStorage.getItem('isRefreshTab') != '') {
            if (sessionStorage.getItem('isRefreshTab') == YesNo_Enum.Y.toString()) {
                sessionStorage.removeItem('isRefreshTab');
                sessionStorage.removeItem('localStorageItems');
                sessionStorage.removeItem('sessionStorageItems');
            }
        }

    }

    onAtParLoad() {
        let appTabCount: number = 1;
        if (localStorage.getItem('appTabCount') != null && localStorage.getItem('appTabCount') != undefined && localStorage.getItem('appTabCount') != '') {
            appTabCount = parseInt(localStorage.getItem('appTabCount').toString()) + 1;
        }
        localStorage.setItem('appTabCount', appTabCount.toString());
    }

    onTrackITLoad() {
        let tkitAppTabCount: number = 1;
        if (localStorage.getItem('tkitAppTabCount') != null && localStorage.getItem('tkitAppTabCount') != undefined && localStorage.getItem('tkitAppTabCount') != '') {
            tkitAppTabCount = parseInt(localStorage.getItem('tkitAppTabCount').toString()) + 1;
        }
        localStorage.setItem('tkitAppTabCount', tkitAppTabCount.toString());
    }

    @HostListener('window:beforeunload', ['$event'])
    onBeforeUnLoadHandler(event: BeforeUnloadEvent) {
        if (this.router.url.indexOf('/trackit') != 0) {
            this.onAtParBeforeUnLoad();
        }
        else {
            this.onTrackITBeforeUnLoad();
        }

    }

    onAtParBeforeUnLoad() {
        let appTabCount: number = 1;
        if (localStorage.getItem('appTabCount') != null && localStorage.getItem('appTabCount') != undefined && localStorage.getItem('appTabCount') != '') {
            appTabCount = parseInt(localStorage.getItem('appTabCount').toString()) - 1;
            localStorage.setItem('appTabCount', appTabCount.toString());
            if (parseInt(localStorage.getItem('appTabCount').toString()) == 0) {

                let values = [];
                let keys = Object.keys(localStorage);
                let i = keys.length;
                while (i--) {
                    if (keys[i].indexOf('tkit') != 0) {
                        var obj = { 'key': keys[i], 'value': localStorage.getItem(keys[i]) };
                        values.push(obj);
                    }
                }
                this.localStorageItems = values;

                values = [];
                keys = Object.keys(sessionStorage);
                i = keys.length;
                while (i--) {
                    var obj = { 'key': keys[i], 'value': sessionStorage.getItem(keys[i]) };
                    values.push(obj);
                }
                this.sessionStorageItems = values;

                this.httpService.clearAppSession();
                localStorage.removeItem('appTabCount');

                sessionStorage.setItem('localStorageItems', JSON.stringify(this.localStorageItems));
                sessionStorage.setItem('sessionStorageItems', JSON.stringify(this.sessionStorageItems));
                sessionStorage.setItem('isRefreshTab', YesNo_Enum.Y.toString());

            }

        }
    }

    onTrackITBeforeUnLoad() {
        let tkitAppTabCount: number = 1;
        if (localStorage.getItem('tkitAppTabCount') != null && localStorage.getItem('tkitAppTabCount') != undefined && localStorage.getItem('tkitAppTabCount') != '') {
            tkitAppTabCount = parseInt(localStorage.getItem('tkitAppTabCount').toString()) - 1;
            localStorage.setItem('tkitAppTabCount', tkitAppTabCount.toString());
            if (parseInt(localStorage.getItem('tkitAppTabCount').toString()) == 0) {

                let values = [];
                let keys = Object.keys(localStorage);
                let i = keys.length;
                while (i--) {
                    if (keys[i].indexOf('tkit') == 0) {
                        var obj = { 'key': keys[i], 'value': localStorage.getItem(keys[i]) };
                        values.push(obj);
                    }
                }
                this.localStorageItems = values;

                values = [];
                keys = Object.keys(sessionStorage);
                i = keys.length;
                while (i--) {
                    var obj = { 'key': keys[i], 'value': sessionStorage.getItem(keys[i]) };
                    values.push(obj);
                }
                this.sessionStorageItems = values;

                this.tkitHttpService.clearAppSession();
                localStorage.removeItem('tkitAppTabCount');

                sessionStorage.setItem('localStorageItems', JSON.stringify(this.localStorageItems));
                sessionStorage.setItem('sessionStorageItems', JSON.stringify(this.sessionStorageItems));
                sessionStorage.setItem('isRefreshTab', YesNo_Enum.Y.toString());

            }
        }
    }

}
