import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Init/atpar-setup-location-groups.component.html',
    providers: [datatableservice],
})

export class SetupLocationGroupsComponent {
    pop: boolean = true;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    formdata: boolean = false;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
        this.dataservice.getSetupLocationGroups().then(countries => { this.sales = countries; });
    }
    gotable() {
        this.table = !this.table;
        this.dataservice.getSetupLocationGroupsAssignBunits().then(countries => { this.sales = countries; });
    }
    go() {
        
    }
    add() {
        this.form = true;
        this.page = false;
        this.pop = false;
    }
    close() {
        this.form = false;
        this.page = true;
        this.pop = true;
        this.formdata = false;
        this.table = false;
        this.dataservice.getSetupLocationGroups().then(countries => { this.sales = countries; });
    }
    adddata() {
        this.formdata = !this.formdata;
        this.form = false;
        this.page = false;
        this.pop = false;
    }
    close2() {
        this.form = false;
        this.page = true;
        this.pop = true;
        this.formdata = false;
        this.table = false;
        this.dataservice.getSetupLocationGroups().then(countries => { this.sales = countries; });
    }
}