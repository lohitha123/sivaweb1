import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Pick/pick-allocate-inventory-business-units.component.html',
    providers: [datatableservice],
})

export class PickAllocateInventoryBusinessUnitsComponent {
    pop: boolean = false;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    sales: Employee[];
    sale: Employee[];
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
    }
    go() {
        this.pop = !this.pop;
        this.dataservice.getpickallocateBunits().then(countries => { this.sales = countries; });
    }
    add() {
        this.page = false;
        this.pop = false;
        this.table = true;
    }
    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    }
    close() {
        this.page = true;
        this.pop = true;
        this.table = false;
        this.dataservice.getpouManageparLoc().then(countries => { this.sales = countries; });
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