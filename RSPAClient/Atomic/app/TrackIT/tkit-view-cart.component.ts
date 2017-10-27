import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/TrackIT/tkit-view-cart.component.html',
    providers: [datatableservice],
})

export class ViewCartComponent {
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
        //this.dataservice.gettkitMangDep().then(countries => { this.sales = countries; });
    }
    go() {
        this.pop = !this.pop;
        this.page = false;
        this.dataservice.gettkitPatient().then(countries => { this.sales = countries; });
    }
    close() {
        this.page = true;
        this.pop = false;
        // this.dataservice.getpouManagecase1().then(countries => { this.sales = countries; });
    }
    onfocusToCalendar(e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        } else {
            this.minDateValue2 = this.date1;
        }
    }
    onfocusFromCalendar(e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    }
} 