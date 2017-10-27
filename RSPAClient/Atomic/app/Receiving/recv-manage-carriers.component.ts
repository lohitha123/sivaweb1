import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Receiving/recv-manage-carriers.component.html',
    providers: [datatableservice],
})

export class ManageCarriersComponent {
    form: boolean = false;
    table: boolean = true;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
        this.dataservice.getManageCarriers().then(countries => { this.sales = countries; });
    }
    add() {
        this.table = !this.table; 
        this.form = true;       
    }
    close() {
        this.table = true;
        this.form = false;
    }
}