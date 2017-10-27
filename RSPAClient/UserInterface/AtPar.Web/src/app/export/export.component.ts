import { Component, AfterViewInit } from '@angular/core';

import { User } from '../_models/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
//let IzendaSynergy = require("../../Scripts/izenda/izenda_ui.js");
let IzendaSynergy = require("../../assets/Izenda/izenda_ui");
declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'export.component.html'
})

export class ExportReportComponent implements AfterViewInit {
    currentUserContext: any = {};
   reportPartId: string;
    constructor( private router: Router, private activatedRoute: ActivatedRoute) { 
    }

    ngAfterViewInit() {
        console.log(this.activatedRoute);
        this.activatedRoute.params.subscribe((params: Params) => {
            this.reportPartId = params['id'];
        });

        this.activatedRoute.queryParams.subscribe((params: Params) => {
            let token = params['token'];
            this.currentUserContext = { token: token};
        });

        console.log(this.reportPartId);
        console.log(this.currentUserContext);
        IzendaSynergy.setCurrentUserContext(this.currentUserContext); 
        IzendaSynergy.renderReportPart(document.getElementById('izenda-export-reportpart'), {
                "id": this.reportPartId,
                "useQueryParam":true,
            });
    }
}