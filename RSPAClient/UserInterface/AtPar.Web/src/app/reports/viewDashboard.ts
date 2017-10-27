import { Component, AfterViewInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// let IzendaSynergy = require("../izenda/izenda_ui");
import { IzendaIntegrate } from '../_helpers/izendaintegrate';
//import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavigationExtras } from '@angular/router';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'rootcontainer.html'
})

export class viewDashboardComponent implements AfterViewInit {
    dom: any = {};
    reportID: string;
    chVal: string;
    constructor(private izItergrate: IzendaIntegrate, private route: ActivatedRoute, public router: Router) {
        this.chVal = "Dashboard Viewer";
    }

  
    ngOnInit(): void {

        //this.route.queryParams.subscribe(params => {
        //    this.reportID = params["reportID"];
        //   // this.appId = params["appId"];
        //});
    }
    ngAfterViewInit() {
        //let filtersObj: any = {
        //    "filters": [],
        //    "overridingFilterValue":
        //    {  // filter object to pass to api
        //        p1value: '2;#6',            // override filter value at position 1 which is applying on current report, change >30 to >50
        //        p2value: 'Cart Count'

        //    }
        //};
       if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        if (localStorage.getItem('reportID') != null && localStorage.getItem('reportID') != "null" && localStorage.getItem('reportID') != "undefined") {

            this.reportID = localStorage.getItem('reportID');
            if (this.reportID != "null") {
              this.izItergrate.RenderNewDashboard(this.reportID);
            }
            else {
                // Dummy report Id to show report does not exsists
                this.izItergrate.RenderNewDashboard("55757692-U24a-44D0-A572-8b3f61f5bc56");
            }

        }
        else {
            // Dummy report Id to show report does not exsists
            this.dom = this.izItergrate.RenderNewDashboard("55757692-U24a-44D0-A572-8b3f61f5bc56");
        }
        
      
    }

    //ngOnDestroy() {
    //   // this.izItergrate.DestroyDom(this.dom);
        
    //}

}