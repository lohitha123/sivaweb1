import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({

    templateUrl: './app/PointOfUse/pou-maintain-non-cart-items.component.html',
    providers: [datatableservice],
})

export class MaintainNonCartItemsComponent {
    pop: boolean = false;
    table: boolean = false;
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
        this.dataservice.getpouMaintnNonCrt1().then(countries => { this.sales = countries; });
    }
    go() {
        this.pop = !this.pop;
        this.page = false;
        this.dataservice.getpouMaintnNonCrt2().then(countries => { this.sales = countries; });
    }
    add() {
        this.page = false;
        this.pop = false;
        this.form = true;
        //this.dataservice.getpouManageparLoc2().then(countries => { this.sales = countries; });
    }
    closef() {
        this.pop = true;
        this.form = false;
    }
    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    }
    closee() {
        this.editform = false;
        this.pop = true;
    }
    close() {
        this.page = true;
        this.pop = false;
        this.editform = false;
        this.form = false;
        this.dataservice.getpouMaintnNonCrt1().then(countries => { this.sales = countries; });
    }
}