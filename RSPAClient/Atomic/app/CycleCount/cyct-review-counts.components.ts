﻿import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/CycleCount/cyct-review-counts.components.html',
    providers: [datatableservice],
})

export class ReviewCountsComponent {
    pop: boolean = false;
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
        this.dataservice.getcyclReviewCount().then(countries => { this.sales = countries; });
    }  
}