import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Init/atpar-manage-users.component.html',
    providers: [datatableservice],
})
export class ManageUsersComponent {
    pop: boolean = false;
    editpage: boolean = false;
    page: boolean = true;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
    } //getmanageUser
    go() {
        this.pop = !this.pop
        this.dataservice.getmanageUser().then(countries => { this.sales = countries; });
    }
    edit() {
        this.editpage = !this.editpage;
        this.page = false;
    }
    back() {
        this.page = true;
        this.editpage = false;
    }
}