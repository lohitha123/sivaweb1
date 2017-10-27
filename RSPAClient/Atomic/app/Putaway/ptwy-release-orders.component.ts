import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Putaway/ptwy-release-orders.component.html',
    providers: [datatableservice],
})

export class PtyReleaseOrdersComponent {
    val1: string;
    pop: boolean = false;
    sales: Employee[];
    ven: any;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
    }
    go() {
        this.pop = !this.pop
        this.dataservice.getPutwayRO().then(countries => { this.sales = countries; });
    }
} 
