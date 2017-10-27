import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/TrackIT/tkit-manage-equipment-items.component.html',
    providers: [datatableservice],
})

export class ManageEquipmentItemsComponent {
    pop: boolean = false;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    sedit: boolean = false;
    serial: boolean = false;
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
    }
    go() {
        this.pop = !this.pop;
        // this.dataservice.getpouCriticalItems().then(countries => { this.sales = countries; });
    }
    add() {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.dataservice.gettkitMangEquip2().then(countries => { this.sales = countries; });
        console.log(this.form);
        this.sedit = false;
    }
    fedit() {
        this.sedit = true;
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.dataservice.gettkitMangEquip2().then(countries => { this.sales = countries; });
        console.log(this.form);
    }
    addserial() {
        this.serial = !this.serial;
        this.form = false;
        this.page = false;
        this.pop = false;
        this.editform = false;
        this.table = false;
        this.sedit = false;
    }
    editserial() {
        this.sedit = true;
        this.serial = !this.serial;
        this.form = false;
        this.page = false;
        this.pop = false;
        this.editform = false;
        this.table = false;
    }
    goback() {
        this.serial = false;
        this.form = true;
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
        this.pop = false;
        this.editform = false;
        this.table = false;
        // this.dataservice.getpouManagecase1().then(countries => { this.sales = countries; });
    }
    serach() {
        this.pop = !this.pop;
        this.dataservice.gettkitMangEquip1().then(countries => { this.sales = countries; });
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