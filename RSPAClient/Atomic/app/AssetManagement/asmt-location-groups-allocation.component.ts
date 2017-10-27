﻿import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/AssetManagement/asmt-location-groups-allocation.component.html',
    providers: [datatableservice],
})

export class LocationGroupsAllocationComponent {
    sales: Employee[];
    ven: any;
    table: boolean = false;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
    }
    go() {
        this.table = !this.table;
        this.dataservice.getAMallocateGrp().then(countries => { this.sales = countries; });
    }
} 