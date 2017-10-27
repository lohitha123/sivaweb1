import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Init/atpar-manage-devices.component.html',
    providers: [datatableservice]
})

export class ManageDevicesComponent {
    table: boolean = true;
    form: boolean = false;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
        this.dataservice.getmanageDevices().then(countries => { this.sales = countries; });
    } 
    edit() {
        this.table = false;
        this.form = true;
    }   
    close() {
        this.table = true;
        this.form = false;
    }  
    bindModelDataChange(event: any) {
    }
}