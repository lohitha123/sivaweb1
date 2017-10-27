import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Receiving/recv-carrier-information.component.html',
    providers: [datatableservice],
})

export class CarrierInformationComponent {
    form: boolean = false;
    table: boolean = true;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public deviceDetails = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
        this.dataservice.getcarrierInfo().then(countries => { this.sales = countries; });
    }
    add() {
        this.form = true; 
        this.table = false;        
    }
    close() {
        this.form = false;
        this.table = true;
    }
} 
