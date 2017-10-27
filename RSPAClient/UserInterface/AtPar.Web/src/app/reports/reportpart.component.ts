import { Component, AfterViewInit } from '@angular/core';
import { IzendaIntegrate } from '../_helpers/izendaintegrate';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'rootreportpart.html'
})

export class ReportPartComponent implements AfterViewInit {

    constructor(private izItergrate: IzendaIntegrate) {
    }

    ngAfterViewInit() {
        this.izItergrate.RenderReportParts();
    }
}