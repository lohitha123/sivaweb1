import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';


@Component({
    templateUrl: './app/Receiving/recv-release-orders.component.html',
    providers: [datatableservice],
})

export class ReleaseOrdersComponent {
    val1: string;
    pop: boolean = false;
    sales: Employee[];
    ven: any;

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
    }
    go() {
        this.pop = !this.pop
        this.dataservice.getreleaseOrder().then(countries => { this.sales = countries; });
    }
} 
