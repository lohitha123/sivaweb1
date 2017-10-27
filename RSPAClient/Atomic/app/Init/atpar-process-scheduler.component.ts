import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    moduleId: module.id,
    templateUrl: 'atpar-process-scheduler.component.html',
    providers: [datatableservice],
})

export class ProcessScheduler {
    pop: boolean = false;
    pop2: boolean = false;
    editpage: boolean = false;
    page: boolean = true;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    day1: boolean = false;
    inter1: boolean = false;
    tr: boolean = false;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
    } //getmanageUser
    go() {
        this.pop = true;
        this.pop2 = false;
        //this.dataservice.getmanageUser().then(countries => { this.sales = countries; });
    }
    edit() {
        this.editpage = !this.editpage;
        this.page = false;
    }
    back() {
        this.page = true;
        this.editpage = false;
    }
    Days(){
        this.day1 = true;
        this.inter1 = false;
    }
    Intervals() {
        this.day1 = false;
        this.inter1 = true;
    }
    tradd() {
        this.tr = true;
    }
    create() {
        this.pop = false;
        this.pop2 = true ;
    }
}