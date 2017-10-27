import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";


@Component({
    templateUrl: './app/PointOfUse/pou-setup-case.component.html',
    providers: [datatableservice],
})

export class SetupCaseComponent {
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
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
        this.dataservice.getpousetupcases().then(countries => { this.sales = countries; });
    }
    go() {
        //this.pop = !this.pop;
        //this.dataservice.getpouManagecase1().then(countries => { this.sales = countries; });
    }
}