import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';

@Component({
    templateUrl: './app/Init/atpar-setup-inventory.component.html',
    providers: [datatableservice],
})

export class SetupInventoryComponent {
    table1: boolean = false;
    additem: boolean = false;
    container: boolean = true;
    mhsiitem: boolean = false;
    goitem: boolean = false;
    ven: any;
    sales: Employee[];

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
    }
    ngOnInit() {
        this.dataservice.getsetupInventory().then(countries => { this.sales = countries; });
    }

    go() {
        this.table1 = !this.table1;
    }
    add() {
        this.additem = !this.additem;
        this.container = false;
    }
    close() {
        this.additem = false;
        this.table1 = false;
        this.container = true;
    }
    mhsi() {
        this.mhsiitem = !this.mhsiitem;
    }
    gobtn() {
        this.goitem = !this.goitem;
    }
}