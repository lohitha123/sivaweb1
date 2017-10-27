import { Component } from '@angular/core';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/StockIssue/stis-allocate-destination-types.component.html'
})

export class AllocateDestinationTypesComponent {
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();
}