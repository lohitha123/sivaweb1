import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    moduleId: module.id,
    templateUrl: 'atpar-maintain-printers.component.html',
    providers: [datatableservice]
})

export class MaintainPrintersComponent {
    addprinter: boolean = false;
    page: boolean = true;
    table1: boolean = false;
    sales: Employee[];
    sale: Employee[];
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
        this.table1 = !this.table1;
        this.dataservice.getmaintainPrinter().then(countries => { this.sales = countries; });
    }
    add() {
        this.addprinter = true;
        this.page = false;
    }
    back() {
        this.addprinter = false;
        this.page = true;
    }
}