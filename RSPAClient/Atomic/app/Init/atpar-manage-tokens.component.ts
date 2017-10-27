import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';


@Component({
    templateUrl: './app/Init/atpar-manage-tokens.component.html',
    providers: [datatableservice],
})

export class ManageTokensComponent {
    pop: boolean = false;
    sales: Employee[];
    ven: any;

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
    }
    go() {
        this.pop = !this.pop
        this.dataservice.getmanageTokens().then(countries => { this.sales = countries; });
    }
}