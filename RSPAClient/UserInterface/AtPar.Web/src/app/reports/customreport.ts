
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// let IzendaSynergy = require("../izenda/izenda_ui");
import { EnumApps } from '../Shared/AtParEnums';
import { IzendaIntegrate } from '../_helpers/izendaintegrate';
//import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavigationExtras } from '@angular/router';
let IzendaSynergy = require("../../assets/Izenda/izenda_ui");
import { Menus } from '../AtPar/Menus/routepath';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import {Title} from '@angular/platform-browser';

declare var module: {
    id: string;
}
@Component({

    templateUrl: 'rootcontainer.html',
     providers: [Title]
})

export class CustomReportComponent implements AfterViewInit, OnDestroy {
    dom: any = {};
    reportID: string;
    appId: string;
    status: string;
    userId: string;
    orgGrpId: string;
    date1: string;
    date2: string;
    chVal: string;
    fromdate: any;
    todate: any;
    bussinesUnit: string;
    cartId: string;
    appid: string;
    firstName: string = '';
    lastName: string = '';
    MiddleInitial: string = '';
    fullUserId: string = '';
    constructor(private izItergrate: IzendaIntegrate, private route: ActivatedRoute, public router: Router, private spinnerService: SpinnerService, private title: Title,) {
        this.chVal = "Custom Report Viewer";
    }


    ngOnInit(): void {

      
        
        this.route.params.subscribe((params: Params) => {
            this.reportID = params['id'];
        });


    }
    ngAfterViewInit() {

        let filtersObj: any;
        let btwdates: string = "";
        let app: any;
        this.route.params.subscribe((params: Params) => {
            this.reportID = params['id'];
        })
        this.route.queryParams.subscribe(params => {
            app = params["p1value"];
        });

        
        if (app != EnumApps.CartCount ) {
            this.route.queryParams.subscribe(params => { 
                this.userId = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                this.orgGrpId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                this.date1 = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                this.firstName = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                this.lastName = decodeURI(params["p6value"]).replace(/%20/g, ' ');
                this.MiddleInitial= decodeURI(params["p7value"]).replace(/%20/g, ' ');
            });

            this.fullUserId = this.firstName + ' ' + this.MiddleInitial + ' ' + this.lastName + ' (' + this.userId + '  )';
            this.fromdate = new Date(this.date1).toLocaleDateString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            if (app == EnumApps.PickPlan || app == EnumApps.CycleCount || app==EnumApps.PutAway)
            {
                filtersObj = {
                    "filters": [],
                    "overridingFilterValue":
                    {  // filter object to pass to api
                        p1value: app,
                        p2value: 'I',
                        p3value: '1;#11;#10',
                        p4value: this.orgGrpId,
                        p5value: this.fullUserId,
                        p6value: '',
                        p7value: this.fromdate


                    }
                };
            }
            else if (app == EnumApps.AssetManagement)
            {
                filtersObj = {
                    "filters": [],
                    "overridingFilterValue":
                    {  // filter object to pass to api
                        p1value: 'I',
                        p2value: '1;#8;#13;#10',
                        p3value: app,
                        p4value: this.orgGrpId,
                        p5value: this.fullUserId,
                        p6value: '',
                        p7value: this.fromdate
                    }
                };
            }
            else if(app == EnumApps.Receiving)
            {
                filtersObj = {
                    "filters": [],
                    "overridingFilterValue":
                    {  // filter object to pass to api
                        p1value: app,
                        p2value: '1;#11;#10',
                        p3value: 'P',
                        p4value: this.orgGrpId,
                        p5value: this.fullUserId,
                        p6value: '',
                        p7value: this.fromdate
                    }
                };
            }
            else if (app == EnumApps.Deliver) {
                filtersObj = {
                    "filters": [],
                    "overridingFilterValue":
                    {  // filter object to pass to api
                        p1value: '20;#30;#40;#50',
                        p2value: this.orgGrpId,
                        p3value: this.fullUserId,
                        p4value: '',
                        p5value: this.fromdate
                    }
                };
            }

            else if (app == EnumApps.StockIssue){
                filtersObj = {
                    "filters": [],
                    "overridingFilterValue":
                    {  // filter object to pass to api
                        p1value: app,
                        p2value: 'I',
                        p3value: this.orgGrpId,
                        p4value: this.fullUserId,
                        p5value: '',
                        p6value: this.fromdate

                    }
                };

            }
           

        }
        else if (app == EnumApps.CartCount)
        {
            if (this.reportID.toLowerCase() == '76d18002-133b-4498-a0f4-1fa6325cf768'.toLowerCase() || this.reportID.toLowerCase() == '8165ee4b-b4ea-4e38-9ea4-81f7901ba45c'.toLowerCase()) {
                this.route.queryParams.subscribe(params => {
                    this.userId = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                    this.orgGrpId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                    this.date1 = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                    this.firstName = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                    this.lastName = decodeURI(params["p6value"]).replace(/%20/g, ' ');
                    this.MiddleInitial = decodeURI(params["p7value"]).replace(/%20/g, ' ');

                });

                this.fullUserId = this.firstName + ' ' + this.MiddleInitial + ' ' + this.lastName + ' (' + this.userId + '  )';
                this.fromdate = new Date(this.date1).toLocaleDateString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');;
                if (this.reportID.toLowerCase() == '76d18002-133b-4498-a0f4-1fa6325cf768'.toLowerCase()) {// User Productivity Report
                    filtersObj = {
                        "filters": [],
                        "overridingFilterValue":
                        {  // filter object to pass to api
                            p1value: '2',
                            p2value: '11',
                            p3value: 'I',
                            p4value: this.orgGrpId,        // override filter value at position 1 which is applying on current report, change >30 to >50
                            p5value: this.fullUserId,
                            p6value: this.fromdate

                        }
                    };
                }
                else if (this.reportID.toLowerCase() == '8165ee4b-b4ea-4e38-9ea4-81f7901ba45c'.toLowerCase())//Daily User Activity Report
                {
                    filtersObj = {
                        "filters": [],
                        "overridingFilterValue":
                        {  // filter object to pass to api
                            p1value: '2',
                            p2value: 'I',
                            p3value:'1;#10;#11;#4;#7;#13',
                            p4value: this.orgGrpId,
                            p5value: this.fullUserId,       // override filter value at position 1 which is applying on current report, change >30 to >50
                            p6value: '',
                            p7value: this.fromdate

                        }
                    };
                }
            }
            else if (this.reportID.toLowerCase() == '2dd12a40-bd86-4a93-bcd6-b12bea128aad'.toLowerCase()) {
                this.route.queryParams.subscribe(params => {
                    this.bussinesUnit = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                    this.orgGrpId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                    this.date1 = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                    this.date2 = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                    this.cartId = decodeURI(params["p6value"]).replace(/%20/g, ' ');
                });
                this.fromdate = new Date(this.date1).toLocaleDateString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');;
                this.todate = new Date(this.date2).toLocaleDateString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');;

                if (this.reportID.toLowerCase() == '2dd12a40-bd86-4a93-bcd6-b12bea128aad'.toLowerCase())//Cart Details Report
                {
                    btwdates = this.fromdate + ';#' + this.todate
                   // btwdates = 
                    filtersObj = {
                        "filters": [],
                        "overridingFilterValue":
                        {  // filter object to pass to api 
                            p1value: '2',
                            p2value: '11',
                            p3value: this.orgGrpId,
                            p4value: this.bussinesUnit,       // override filter value at position 1 which is applying on current report, change >30 to >50
                            p5value: this.cartId,
                            p6value: btwdates
                        }
                    };
                }

            }

            else if (this.reportID.toLowerCase() == 'ff2dd25b-6a6c-4ac1-a6ce-01d89c80322a'.toLowerCase()){
                this.route.queryParams.subscribe(params => {
                    this.cartId = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                    this.orgGrpId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                    this.date1 = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                    this.bussinesUnit = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                });
                
                if (this.reportID.toLowerCase() == 'ff2dd25b-6a6c-4ac1-a6ce-01d89c80322a'.toLowerCase())//Item Exception Report
                {
                    this.fromdate = new Date(this.date1).toLocaleDateString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');;   
                    filtersObj = {
                        "filters": [],
                        "overridingFilterValue":
                        {  // filter object to pass to api 
                            p1value: '2',
                            p2value: 'I',
                            p3value: this.orgGrpId,
                            p4value: this.bussinesUnit,       // override filter value at position 1 which is applying on current report, change >30 to >50
                            p5value: this.cartId,
                            p6value: '',
                            p7value: this.fromdate,
                            p8value:''
                        }
                    };
                }
            }
            
          
        }
        
       
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        if (this.reportID != null && this.reportID != "null" && this.reportID != "undefined") {
        
            if (this.reportID != "null") {
              this.izItergrate.RenderReportCustomizedViewer(this.reportID, filtersObj);
              //this.router.navigate(['atpar/reports/customroute2']);
            }
            else {
                // Dummy report Id to show report does not exsists
                this.dom = this.izItergrate.RenderNewReport("55757692-U24a-44D0-A572-8b3f61f5bc56");
            }

        }
        else {
            // Dummy report Id to show report does not exsists
            this.dom = this.izItergrate.RenderNewReport("55757692-U24a-44D0-A572-8b3f61f5bc56");
        }
        var menuItems: Menus[] = JSON.parse(localStorage.getItem('MenuList')) as Menus[];
        let submenu: any;
        submenu = menuItems.filter(x => x.REPORT_ID!=null&& x.REPORT_ID.toLowerCase() == this.reportID.toLowerCase());
        if (submenu != null && submenu.length > 0) {
           
            this.title.setTitle(submenu[0].MENU_NAME);            
            localStorage.setItem('bcMenu', submenu[0]);
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(submenu[0]));
        }
       

        // this.izItergrate.RenderReportCustomizedViewer("93f57672-c24a-44a0-b572-8b3f61f5bc56", filtersObj);
    }

    ngOnDestroy() {
        //this.izitergrate.destroydom(this.dom);

    }

}