//let IzendaSynergy = require("../izenda/izenda_ui");

import "../../assets/Izenda/izenda_common";
import "../../assets/Izenda/izenda_locales";
import "../../assets/Izenda/izenda_vendors";

import { Injectable } from '@angular/core';
let IzendaSynergy = require("../../assets/Izenda/izenda_ui");
@Injectable()
export class IzendaIntegrate {
    DoIzendaConfig():void
    {

        var IpAdress = window.location.protocol + "//" + window.location.hostname + "/AtPar/ReportingApi/api/"

      //  var Path: string = "/AtPar/ReportingApi/api/";
      //  var t1 = window.location.protocol + "//" + window.location.hostname;
       // var t1 = "http://localhost:8080";
   // var t = t1;
    //public route: string = "Login";
   // var IpAdress: string = t + Path;

    //var IpAdress="http://192.168.177.116/AtPar/ReportingApi/api/"



  
     //   var IpAdress = "http://localhost/AtPar/ReportingApi/api/"
       IzendaSynergy.config({
          // "WebApiUrl": "http://localhost/Izenda_Angular_API/api/",
            //"WebApiUrl": "http://izenda-vm04.kms.com.vn:8200/api/",  
           "WebApiUrl": IpAdress,
         

           "BaseUrl": "/AtPar/AtParWeb/",
           "RootPath": "/AtPar/AtParWeb/assets/Izenda/",
            "CssFile": "izenda-ui.css",
            "Routes": {
                "settings": "settings",
                "New": "new",
                "dashboard": "dashboard",
                "report": "report",
                "reportviewer": "reportviewer",
                "ReportViewerPopup": "reportviewerpopup",
                "viewer": "viewer"
            },
            "Timeout": 3600,
            "NeedToEncodeUrl": false,
            "UIPreferences": {
                "ReportFilterSectionExpanded": !1
            }
            

        });
    }

   setContext():void {  
        var currentUserContext = {
            token: localStorage.getItem("izendatoken")
          };
        IzendaSynergy.setCurrentUserContext(currentUserContext);
    }

     /* Izenda Function */

    RenderIzenda()
    {
        this.setContext();
        IzendaSynergy.render(document.getElementById('izenda-root'));
    }
    RenderIzendaSettings() {
        this.setContext();
        IzendaSynergy.renderSettingPage(document.getElementById('izenda-root'));
       }

    RenderReportList()
    {
        this.setContext();
        IzendaSynergy.renderReportPage(document.getElementById('izenda-root'));
    }

    RenderReportDesigner(): any
    {
        this.setContext();
        let dom = document.getElementById('izenda-root');
        IzendaSynergy.renderReportDesignerPage(dom);
        return dom;
    }

    RenderReportViewer(ReportID)
    {
       
        this.setContext();
       //// alert(ReportID)
       // if (ReportID == null)
       // { ReportID ='ceb0d4b2-51c8-49f2-ba37-0ff103873151' }
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), ReportID);
    }

    RenderNewReport(ReportID) :any {
        this.setContext();
        let dom = document.getElementById('izenda-root');
        IzendaSynergy.renderReportViewerPage(dom, ReportID);
        return dom;

    }

    RenderReportCustomizedFilterViewer()
    {
        this.setContext();
        let filtersObj:any = {
                                "filters": [],
                                "overridingFilterValue": 
                                {  // filter object to pass to api
                                    p1value: 50,            // override filter value at position 1 which is applying on current report, change >30 to >50
                                    p2value: '30;#40'       // override filter value at position 2 which is applying on current report, change beetween (20:50) to (30:40)
                                }
                            };
      
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), '75d975db-c19e-4b81-a5b2-8c63663856c9', filtersObj);
    }

    RenderReportCustomizedViewer(reportID, filtersObj) {
        this.setContext();
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), reportID, filtersObj);
    }


    RenderReportCustomizedFilters(reportID, filtersObj): any {
        this.setContext();
        let dom = document.getElementById('izenda-root');
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), reportID, filtersObj);
        return dom;
    }

    RenderReportParts()
    {
        
        this.setContext();
        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part1'), {
                "id": "8F3B24F7-B55A-4095-81DE-68104175032A",
            });

        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part2'), {
                    "id": "FFE428F2-1F4B-4BEB-9678-8FB7147A36FE",
                });

        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part3'), {
                    "id": "C0D6695F-10F2-4CD3-851C-A47BAA2A2E4A",
                });

    }
    RenderDashboard()
    {
        this.setContext();
        IzendaSynergy.renderDashboardPage(document.getElementById('izenda-root'));
    }

    RenderDashboardDesigner()
    {
        this.setContext();
        IzendaSynergy.renderNewDashboardPage(document.getElementById('izenda-root'));
    }

    DestroyDom(dom: any)
    {
         this.setContext();
        IzendaSynergy.unmountComponent(dom);
    }

    RenderNewDashboard(ReportID) {
        this.setContext();
       // IzendaSynergy.renderDashboardPage(document.getElementById('izenda-root'), ReportID);
        IzendaSynergy.renderDashboardViewerPage(document.getElementById('izenda-root'), ReportID);
    }


    RenderDashboardViewer(ReportID) {
        this.setContext();
        IzendaSynergy.renderDashboardViewerPage(document.getElementById('izenda-root'), ReportID);
    }

}

