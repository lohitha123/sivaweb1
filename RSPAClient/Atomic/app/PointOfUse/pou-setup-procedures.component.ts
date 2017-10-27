import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({

    templateUrl: './app/PointOfUse/pou-setup-procedures.component.html',
    providers: [datatableservice],
})

export class SetupProceduresComponent {
    pop: boolean = true;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
        this.dataservice.getsetupProcedures().then(countries => { this.sales = countries; });
    }
    go() {

    }
    add() {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
    }
    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    }
    close() {
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
    }
}