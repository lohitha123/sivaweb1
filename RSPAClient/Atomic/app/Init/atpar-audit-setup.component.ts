import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';

@Component({
    templateUrl: './app/Init/atpar-audit-setup.component.html',
    providers: [datatableservice],
})

export class AuditSetupComponent {
    val1: string;
    pop: boolean = false;
    sales: Employee[];
    ven: any;

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
    }
    go() {
        this.pop = !this.pop
        this.dataservice.getauditSetup().then(countries => { this.sales = countries; });
    }
    
}