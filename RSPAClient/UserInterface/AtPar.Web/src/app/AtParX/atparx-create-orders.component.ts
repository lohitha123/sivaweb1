import { Component, OnInit, OnDestroy } from '@angular/core';

import {
    EnumApps

} from '../Shared/AtParEnums';


declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'atparx-create-orders.component.html'
})

export class CreateOrdersComponent {

    appID: string;

    constructor(
    ) {
        this.appID = EnumApps.Pharmacy.toString();
    }

    OnDestroy() {
        this.appID = null;
    }

}