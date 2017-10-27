import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";


@Component({
    templateUrl: './app/Deliver/deliver-assign-signatories.component.html',
    providers: [datatableservice],
})

export class AssignSignatoriesComponent {
    pop: boolean = false;
    table: boolean = false;
    form: boolean = false;
    form2: boolean = false;
    filter: boolean = true;
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
        this.form = false;
        this.dataservice.getdelAssignsigno().then(countries => { this.sales = countries; });
    }
    up() {
        this.form = true;
    }
    save() {
        this.form = false;
    }
    add() {
        this.form2 = false;
        this.form = false;
        this.table = true;
        this.pop = false;
        this.filter = false;
        this.dataservice.getdelAssignsigno2().then(countries => { this.sales = countries; });
    }
    edit() {
        this.form2 = true;
        this.form = false;
        this.table = false;
        this.pop = false;
    }
    back() {
        this.form2 = false;
        this.table = false;
        this.pop = false;
        this.filter = true;
    }
    close() {
        this.form2 = false;
        this.table = true;
    }
} 
