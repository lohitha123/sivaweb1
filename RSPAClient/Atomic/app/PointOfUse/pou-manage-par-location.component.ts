import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";


@Component({
    templateUrl: './app/PointOfUse/pou-manage-par-location.component.html',
    providers: [datatableservice],
})

export class ManageParLocationComponent {
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
        
    }
    go() {
        this.pop = !this.pop;
        this.dataservice.getpouManageparLoc().then(countries => { this.sales = countries; });
    }
    add() {
        this.page = false;
        this.pop = false;
        this.table = true;
        this.dataservice.getpouManageparLoc2().then(countries => { this.sales = countries; });
    }
    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    }
    close() {
        this.page = true;
        this.pop = true;
        this.table = false;
        this.dataservice.getpouManageparLoc().then(countries => { this.sales = countries; });
    }
}