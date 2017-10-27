import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IzendaIntegrate } from '../_helpers/izendaintegrate';
//import { enableProdMode } from '@angular/core';
//enableProdMode();
declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'rootcontainer.html'
})

export class ReportDesignerComponent implements AfterViewInit, OnDestroy {
    dom: any = {};
    chVal: string;
    constructor(private izItergrate: IzendaIntegrate) {
        this.chVal = "ReportDesigner";
    }

    ngAfterViewInit() {
        this.dom = this.izItergrate.RenderReportDesigner();
    }

    ngOnDestroy() {
       this.izItergrate.DestroyDom(this.dom);
    }
}