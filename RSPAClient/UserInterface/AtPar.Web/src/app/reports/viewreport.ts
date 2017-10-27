import { Component, AfterViewInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// let IzendaSynergy = require("../izenda/izenda_ui");
import { IzendaIntegrate } from '../_helpers/izendaintegrate';
//import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import {
    DOCUMENT,
    Title
} from '@angular/platform-browser';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'rootcontainer.html'
})

export class ViewReportComponent implements AfterViewInit, OnDestroy {
    dom: any = {};
    reportID: string;
    userId: string; 
    chVal: string;
    constructor(private izItergrate: IzendaIntegrate, private route: ActivatedRoute, public router: Router, private title: Title) {
        this.chVal = "Report Viewer";
    }

  
    ngOnInit(): void {

        //this.route.queryParams.subscribe(params => {
        //    this.reportID = params["reportID"];
        //   // this.appId = params["appId"];
        //});
      let menuName = localStorage.getItem("menuName");
      this.title.setTitle(menuName);
    }
    ngAfterViewInit() {
        let filtersObj: any = {
            "filters": [],
            "overridingFilterValue":
            {  // filter object to pass to api
                p1value: '2;#6',            // override filter value at position 1 which is applying on current report, change >30 to >50
                p2value: 'Cart Count'

            }
        };
        
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        if (localStorage.getItem('reportID') != null && localStorage.getItem('reportID') != "null" && localStorage.getItem('reportID') != "undefined") {

            this.reportID = localStorage.getItem('reportID');
            if (this.reportID != "null") {
                if (this.reportID == "0a5e8209-e629-4aee-89d9-d77ec60bd353") {
                    this.userId = localStorage.getItem('userId');
                    filtersObj = {
                        "filters": [],
                        "overridingFilterValue":
                        {  // filter object to pass to api
                            p1value: this.userId ,
                            p2value: '',
                            p3value: '',
                            p4value: '',
                            p5value: ''
                        }
                    };
                    this.dom =  this.izItergrate.RenderReportCustomizedFilters(this.reportID, filtersObj);
                }

                else {
                    this.dom = this.izItergrate.RenderNewReport(this.reportID);
                }
            }
            else {
                // Dummy report Id to show report does not exsists
                this.dom =   this.izItergrate.RenderNewReport("55757692-U24a-44D0-A572-8b3f61f5bc56");
            }

        }
        else {
            // Dummy report Id to show report does not exsists
            this.dom =  this.izItergrate.RenderNewReport("55757692-U24a-44D0-A572-8b3f61f5bc56");
        }
        setTimeout(() => {
            let menuName = localStorage.getItem("menuName");
            this.title.setTitle(menuName);
        }, 1);
        
       // this.izItergrate.RenderReportCustomizedViewer("93f57672-c24a-44a0-b572-8b3f61f5bc56", filtersObj);
    }

    ngOnDestroy() {
        this.izItergrate.DestroyDom(this.dom);
        
    }

}