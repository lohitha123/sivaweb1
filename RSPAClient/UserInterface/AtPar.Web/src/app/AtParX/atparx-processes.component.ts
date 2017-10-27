import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'atparx-processes.component.html'
})

export class ProcessesComponent {
    atparXAppId: number = EnumApps.Pharmacy;
}