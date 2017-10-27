import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({

    templateUrl: './app/PointOfUse/pou-process-parameters.component.html',
    providers: [datatableservice],
})

export class ProcessParamsComponent {
    pop: boolean = false;
    tab: boolean = true;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    sales: Employee[];
    ven: any;
    alerts: Employee[];
    alert: any;
    bills: Employee[];
    bill: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
        this.alert = new Employee();
        this.bill = new Employee();
        this.dataservice.getpouProcess().then(countries => { this.sales = countries; });
        this.dataservice.getpouProcessAlert().then(countries => { this.alerts = countries; });
        this.dataservice.getpouProcessBill().then(countries => { this.bills = countries; });
        //this.dataservice.getpouProcessAssginLocation().then(countries => { this.bills = countries; });
    }
    go() {
        this.table = !this.table;
        //this.page = false;
        this.dataservice.getpouProcessAssginLocation().then(countries => { this.sales = countries; });
    }
    add() {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.tab = false;
    }
    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    }
    close() {
        this.form = false;
        this.table = false;
        this.page = true;
        this.tab = true;
        this.dataservice.getpouProcess().then(countries => { this.sales = countries; });
    }
}