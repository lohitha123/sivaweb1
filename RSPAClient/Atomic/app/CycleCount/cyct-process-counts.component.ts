import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/CycleCount/cyct-process-counts.component.html',
    providers: [datatableservice],
})

export class ProcessCountsComponent {
    pop: boolean = false;    
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();

    }
    go() {
        this.pop = !this.pop;
        this.dataservice.getcycleProcesscount().then(countries => { this.sales = countries; });
    }    
}