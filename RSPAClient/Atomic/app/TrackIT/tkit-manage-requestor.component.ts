import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/TrackIT/tkit-manage-requestor.component.html',
    providers: [datatableservice],
})

export class ManageRequestorComponent {
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
        this.dataservice.gettkitMangreq().then(countries => { this.sales = countries; });
    }
    go() {
        this.pop = !this.pop;        
    }
    add() {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
    }
    tbl() {
        this.form = false;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.table = true;
        // this.dataservice.getpouManagecase2().then(countries => { this.sales = countries; });
    }
    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    }
    save() {
        this.editform = false;
    }
    close() {
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        // this.dataservice.getpouManagecase1().then(countries => { this.sales = countries; });
    }
} 