import { Component, AfterViewInit } from '@angular/core';
// let IzendaSynergy = require("../izenda/izenda_ui");
import {IzendaIntegrate} from '../_helpers/izendaintegrate';
declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'rootcontainer.html'
})

export class DashboardViewer implements AfterViewInit {
    reportID: string;
    chVal: string;
    constructor(private izItergrate: IzendaIntegrate) {
     }

    ngAfterViewInit() {
      

        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        if (localStorage.getItem('reportID') != null && localStorage.getItem('reportID') != "null" && localStorage.getItem('reportID') != "undefined") {

            this.reportID = localStorage.getItem('reportID');
            if (this.reportID != "null") {
                this.izItergrate.RenderDashboardViewer(this.reportID);
            }
            else {
                // Dummy report Id to show report does not exsists
                this.izItergrate.RenderDashboardViewer("55757692-U24a-44D0-A572-8b3f61f5bc56");
            }

        }
        else {
            // Dummy report Id to show report does not exsists
            this.izItergrate.RenderDashboardViewer("55757692-U24a-44D0-A572-8b3f61f5bc56");
        }
    }
}