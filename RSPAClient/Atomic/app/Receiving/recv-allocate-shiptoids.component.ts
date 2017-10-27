import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Receiving/recv-allocate-shiptoids.component.html',
    providers: [datatableservice],
})

export class AllocateShipToIdsComponent {
    //form: boolean = false;
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
        this.dataservice.getAllocateShiptoIds().then(countries => { this.sales = countries; });
    }
    go() {
        this.table = !this.table;
        this.dataservice.getAllocateShiptoIds().then(countries => { this.sales = countries; });
    }
    close() {
        this.table = true;
    }
} 
