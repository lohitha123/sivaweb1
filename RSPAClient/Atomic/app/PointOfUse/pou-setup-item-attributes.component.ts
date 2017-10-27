import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";


@Component({
    templateUrl: './app/PointOfUse/pou-setup-item-attributes.component.html',
    providers: [datatableservice],
})

export class SetupItemAttributesComponent {
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
        this.dataservice.getsetupItemAttr().then(countries => { this.sales = countries; });
    }
    close() {
        this.form = false;
        this.page = true;
    }
}