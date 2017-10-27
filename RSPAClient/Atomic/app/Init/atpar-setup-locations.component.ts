import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Init/atpar-setup-locations.component.html',
    providers: [datatableservice],
})

export class SetupLocationsComponent {
    pop: boolean = false;
    page: boolean = true;
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
    }
    go() {
        this.pop = !this.pop;
        this.dataservice.getSetupLocation().then(countries => { this.sales = countries; });
    }
    add() {
        this.form = true;
        this.page = false;
        this.pop = false;
    }
    close() {
        this.form = false;
        this.page = true;
    }
}