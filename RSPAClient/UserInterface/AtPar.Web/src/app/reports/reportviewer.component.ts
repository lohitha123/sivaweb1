import { Component, AfterViewInit} from '@angular/core';
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

export class ReportViewerComponent implements AfterViewInit {
    reportID: string;
    chVal: string;
    constructor(private izItergrate: IzendaIntegrate, private route: ActivatedRoute, public router: Router) {
        this.chVal = "Report Viewer";
    }

    ngOnInit(): void {

    //    this.route.queryParams.subscribe(params => {
        //    this.reportID = params["reportID"];
          //  this.appId = params["appId"];
        //});
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
       //this.izItergrate.RenderReportViewer("93f57672-c24a-44a0-b572-8b3f61f5bc56");
        this.izItergrate.RenderReportCustomizedViewer("93f57672-c24a-44a0-b572-8b3f61f5bc56", filtersObj);
    }
}