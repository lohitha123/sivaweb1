import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IzendaIntegrate } from '../_helpers/izendaintegrate';
declare var module: {
    id: string;
}
@Component({
  
    //templateUrl: 'rootcontainer.html'
    templateUrl: 'rootcontainer.html'
})



export class SettingsComponent implements AfterViewInit, OnDestroy {
    chVal: string;
   // dom: any = {};
    constructor(private izItergrate: IzendaIntegrate) {
       this.chVal = "Settings";
        this.izItergrate.DoIzendaConfig();
      //  this.izItergrate.DoIzendaConfig();
    }
    ngOnInit() {
       // alert("Hi ReportSettingComponent");
    }

    ngAfterViewInit() {
       // this.dom = this.izItergrate.RenderIzendaSettings();
        this.izItergrate.RenderIzendaSettings();
    }

    ngOnDestroy() {
       // this.izItergrate.DestroyDom(this.dom);
    }
}