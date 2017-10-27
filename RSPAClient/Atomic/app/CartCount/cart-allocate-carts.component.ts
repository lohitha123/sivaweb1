import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/CartCount/cart-allocate-carts.component.html',
    providers: [datatableservice]
})

export class AllocateCartsComponent {
    table: boolean = false;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
        this.dataservice.getallocateCart().then(countries => { this.sales = countries; });
    }
    go() {
        this.table = !this.table;
        this.dataservice.getallocateCart().then(countries => { this.sales = countries; });
    }
    close() {
        this.table = true;
    }
} 