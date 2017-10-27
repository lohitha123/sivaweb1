import { Component, AfterViewInit } from '@angular/core';
//let IzendaSynergy = require("../izenda/izenda_ui");
let IzendaSynergy = require("../../assets/Izenda/izenda_ui");
declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'rootcontainer.html'
})

export class DashboardDesignerComponent implements AfterViewInit {
    currentUserContext: any = {};
    chVal: string;    
    constructor() {
        this.chVal = "DashboardDesigner";
    }
    ngAfterViewInit() {
         
        //this.currentUserContext = { token: "4sl1Fd78wsfHajxJN+9S+ewGi9L2ZnD+aLRkvMGJRURvPoeXiAppU6qv3IZ658zlz8KDR2aSCX7HppEvUbp5YA==" };
        //IzendaSynergy.setCurrentUserContext(this.currentUserContext);
        IzendaSynergy.renderNewDashboardPage(document.getElementById('izenda-root'));
    }
}