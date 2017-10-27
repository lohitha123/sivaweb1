import { Component, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { IzendaIntegrate } from '../_helpers/izendaintegrate';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'rootcontainer.html'
})

export class ReportComponent implements AfterViewInit
{
    chVal: string;  
    constructor(private izItergrate: IzendaIntegrate) {
        this.chVal = "ReportList";
    }

    ngAfterViewInit() {
        this.izItergrate.RenderReportList();
    }
}