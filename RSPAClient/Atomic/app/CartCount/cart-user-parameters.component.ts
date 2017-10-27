import { Component } from '@angular/core';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/CartCount/cart-user-parameters.component.html'
})

export class UserParametersComponent {
    table: boolean = false;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    go() {
        this.table = !this.table;
    }
} 