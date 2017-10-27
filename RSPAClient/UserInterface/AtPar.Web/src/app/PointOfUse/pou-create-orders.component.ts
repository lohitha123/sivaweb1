
import { Component, OnInit, OnDestroy } from '@angular/core';

import {
    EnumApps

} from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'pou-create-orders.component.html'

})

export class CreateOrdersComponent {

    appID: string;

    constructor(
    ) {
        this.appID = EnumApps.PointOfUse.toString();
    }

    OnDestroy() {
        this.appID = null;
    }

}
