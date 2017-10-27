import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/TrackIT/tkit-dashboard.component.html',
    providers: [datatableservice],
})

export class DashComponent {
    sales: Employee[];
    ven: any;
    table: boolean = true;
    tbl: boolean = false;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
        this.dataservice.gettkitdash().then(countries => { this.sales = countries; });
    }
    goback() {
        this.table = true;
        this.tbl = false;
        this.dataservice.gettkitdash().then(countries => { this.sales = countries; });
    }
    add() {
        this.table = false;
        this.tbl = true;
        this.dataservice.gettkitdashAdd().then(countries => { this.sales = countries; });
    }
} 