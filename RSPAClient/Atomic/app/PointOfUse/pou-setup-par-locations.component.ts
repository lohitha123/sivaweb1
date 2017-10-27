import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";


@Component({
    templateUrl: './app/PointOfUse/pou-setup-par-locations.component.html',
    providers: [datatableservice],
})

export class SetupParLocationsComponent {
    pop: boolean = false;
    pop2: boolean = false;
    page: boolean = true;
    page2: boolean = false;
    form: boolean = false;
    form2: boolean = false;
    editform: boolean = false;
    fdata: boolean = false;
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
        this.dataservice.getpouSetupParloc().then(countries => { this.sales = countries; });
    }
    add() {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
    }
    add2() {
        this.form2 = true;
    }
    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    }
    med() {
        this.page2 = !this.page2;
        this.pop2 = true;
        this.form = false;
        this.editform = false;
        this.page = false;
        this.pop = false;
    }
    search() {
        this.fdata = !this.fdata;
    }
    close() {
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
    }
    close2() {
        this.page2 = false;
        this.pop2 = false;
        this.fdata = false;
        this.form2 = false;
        this.page = true;
    }
}