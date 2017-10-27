import { Injectable } from '@angular/core';
import { Menus } from '../AtPar/Menus/routepath';
import { Subject } from 'rxjs/Subject';
import { List, Enumerable } from 'linqts';
//import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';

@Injectable()
export class LeftBarAnimationService {

    lstMainlist: List<Menus>;

    constructor() {
        if (localStorage.getItem('isAtParDashboard') != null && localStorage.getItem('isAtParDashboard') != undefined) {
            if (localStorage.getItem('isAtParDashboard') == 'YES') {
                this.activeLeftBar = 'none';
            }
            else {
                if (localStorage.getItem('activeLeftBarMenu') != null && localStorage.getItem('activeLeftBarMenu') != undefined) {
                    this.activeLeftBar = localStorage.getItem('activeLeftBarMenu').toString();
                }
            }
        }
        else {
            if (localStorage.getItem('activeLeftBarMenu') != null && localStorage.getItem('activeLeftBarMenu') != undefined) {
                this.activeLeftBar = localStorage.getItem('activeLeftBarMenu').toString();
            }
        }
    }

    public activeLeftBar: string = "none";

    public isHomeClicked: boolean;

    getActiveLeftBar() {
        return this.activeLeftBar;
    }

    setActiveLeftBar(name) {
        this.activeLeftBar = name;
        localStorage.setItem('activeLeftBarMenu', this.activeLeftBar);
    }

    getLeftBarMargin() {
        if (localStorage.getItem('ActiveGroup') != null && localStorage.getItem('ActiveGroup') != undefined) {
            return true;
        }
        else {
            return this.isHomeClicked;
        }
    }

    isHide() {
        this.activeLeftBar = "none";
        localStorage.setItem('activeLeftBarMenu', this.activeLeftBar);
    }

    private emitChangeSource = new Subject<any>();
    private emitActiveAppName = new Subject<any>();

    private emitLeftBarFromTopBar = new Subject<any>();
    private emitChangeBreadCrumb = new Subject<any>();
    private emitChangeReportActiveMenu = new Subject<any>();


    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    changeEmittedActiveAppName = this.emitActiveAppName.asObservable();

    changeEmittedLeftBarFromTopBar = this.emitLeftBarFromTopBar.asObservable();
    changeBCEmitted$ = this.emitChangeBreadCrumb.asObservable();
    changeReportsActiveMenu$ = this.emitChangeReportActiveMenu.asObservable();

    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
    emitChangeActiveMenu(activeMenu: string) {
        this.emitActiveAppName.next(activeMenu);
    }

    emitChangeLeftBarFromTopBar(active: boolean) {
        this.emitLeftBarFromTopBar.next(active);
    }

    emitChangeBreadCrumbEvt(change: any) {
        this.emitChangeBreadCrumb.next(change);
    }

    emitChangeReportaActiveMenu(change: any) {
        this.emitChangeReportActiveMenu.next(change);
    }



}