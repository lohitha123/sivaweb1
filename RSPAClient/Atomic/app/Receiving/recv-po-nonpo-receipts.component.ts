/// <reference path="../entities/vm_mt_atpar_user_params.ts" />
import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
//import { VM_MT_ATPAR_USER_ADD } from '../../app/Entities/vm_mt_atpar_user_add';


@Component({
    templateUrl: './app/Receiving/recv-po-nonpo-receipts.component.html',
    providers: [datatableservice]
})

export class PoNonPoReceiptsComponent {
    pop: boolean = false;
    page: boolean = true;
    purchase: boolean = false;
    printtbl: boolean = false;
    tbl: boolean = false;
    plus: boolean = true;
    bysch: boolean = false;
    rec: boolean = false;
    editform: boolean = false;
    lotserial: boolean = false;
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
    //addUserData = new VM_MT_ATPAR_USER_ADD();
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
        //this.addUserData.City = [];
    }
    go() {
        this.pop = !this.pop;
        this.dataservice.getinitUserstatusreport().then(countries => { this.sales = countries; });
    }
    get() {
        this.tbl = !this.tbl;
        this.rec = false;
        this.page = true;
        this.purchase = false;
        this.dataservice.getinitUserstatusreport().then(countries => { this.sales = countries; });
    }
    show() {
        this.plus = !this.plus;
    }
    byschedule() {
        this.bysch = !this.bysch;
        this.tbl = false;
        this.page = false;
        this.dataservice.getrecPononpoRecbySchdule().then(countries => { this.sales = countries; });
    }
    goPage() {
        this.tbl = true;
        this.page = true;
        this.bysch = false;
        this.purchase = false;
    }
    po() {
        this.rec = !this.rec; 
        this.tbl = false;
        this.page = false;
        this.dataservice.getrecPononpoRectps().then(countries => { this.sales = countries; });
    }
    poBack() {
        this.tbl = false;
        this.page = true;
        this.rec = false;
    }
    lot() {
        this.bysch = false;
        this.lotserial = !this.lotserial;
        this.dataservice.getrecPononpoLotSerial().then(countries => { this.sales = countries; });
    }
    lotback() {
        this.bysch = true;
        this.lotserial = false;
        this.editform = false;
        this.dataservice.getrecPononpoRecbySchdule().then(countries => { this.sales = countries; });
    }
    print() {
        this.printtbl = true;
        this.bysch = false;
        this.dataservice.getrecPononpoPrinter().then(countries => { this.sales = countries; });
    }
    printback() {
        this.printtbl = false;
        this.bysch = true;
        this.dataservice.getrecPononpoRecbySchdule().then(countries => { this.sales = countries; });
    }
    get2() {
        this.purchase = !this.purchase;
        this.tbl = false;
        this.page = false;
        this.rec = false;
        this.dataservice.getrecPononpoMulti().then(countries => { this.sales = countries; });

    }
    getBack() {
        this.purchase = false;
        this.tbl = false;
        this.page = true;
        this.rec = false;        
    }
    add() {
        this.editform = !this.editform;        
    }
    save() {
        this.editform = false;
    }
    close() {
        //this.form = false;
        this.page = true;
        this.pop = true;
        //this.editform = false;
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