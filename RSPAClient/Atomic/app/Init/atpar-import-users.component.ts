import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Init/atpar-import-users.component.html',
    providers: [datatableservice]
})

export class ImportUsersComponent {
    table: boolean = false;
    form: boolean = false;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
        this.dataservice.getimportUser().then(countries => { this.sales = countries; });
    }
    go() {
        this.table = !this.table;
    }
    import() {
        //this.table = false;
        //this.form = true;
    }
    close() {
        this.table = true;
        this.form = false;
    }  
}