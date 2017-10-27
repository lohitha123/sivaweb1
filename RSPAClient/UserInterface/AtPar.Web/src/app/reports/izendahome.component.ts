import { Component, AfterViewInit } from '@angular/core';
import { IzendaIntegrate } from '../_helpers/izendaintegrate';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'rootcontainer.html'
})

export class IzendaHome implements AfterViewInit {
    constructor(private izItergrate: IzendaIntegrate) {
    }

    ngAfterViewInit() {
        this.izItergrate.RenderIzenda();
    }
}