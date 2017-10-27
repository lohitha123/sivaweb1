import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    moduleId: module.id,
    templateUrl: 'atpar-setup-storage-location-groups.component.html',
    providers: [datatableservice],
})

export class SetupStorageLocationGroups {
    pop: boolean = false;
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
    }
    go() {
        this.pop = !this.pop;
        this.dataservice.getSetupStorageLocationGroup().then(countries => { this.sales = countries; });
    }
    gotable() {
        this.table = !this.table;
        this.dataservice.getSetupStorageLocationGroupAssign().then(countries => { this.sales = countries; });
    }
    add() {
        this.form = true;
        this.page = false;
        this.pop = false;
    }
    close(){
        this.form = false;
        this.page = true;
        this.formdata = false;
    }
    adddata() {
        this.formdata = !this.formdata;
        this.form = false;
        this.page = false;
        this.pop = false;
    }
    back() {
        this.table = false;
        this.form = false;
        this.page = true;
    }
}