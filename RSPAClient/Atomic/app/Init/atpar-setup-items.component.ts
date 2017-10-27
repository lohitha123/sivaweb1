
import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';

@Component({
    selector: 'my-app',
    templateUrl: './app/Init/atpar-setup-items.component.html',
    providers: [datatableservice],
})

export class SetupItemsComponent {
    table1: boolean = false;
    additem: boolean = false;
    container: boolean = true;
    pharma: boolean = false;
    addplus: boolean = false;
    lookupitem: boolean = false;
    addsubitem: boolean = false;

    sales: Employee[];
    sale: Employee[];
    ven: any;

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();        
    }    
    go() {
        this.table1 = !this.table1; 
        this.dataservice.getsetupItem().then(countries => { this.sales = countries; });
    }
    add() {
        this.additem = !this.additem;
        this.container = false;
    }
    close() {
        this.additem = false;
        this.table1 = false;
        this.container = true;
        this.pharma = false;
        this.addplus = false;
        this.lookupitem = false;
    }
    pharmacy() {
        this.pharma = !this.pharma;
    }
    plus() {
        this.addplus = !this.addplus;
        this.addsubitem = true;
        this.container = false; 
        this.dataservice.getsubstituteItem().then(countries => { this.sales = countries; });
    }
    lookup() {
        this.lookupitem = !this.lookupitem;
        this.addsubitem = false;
        this.dataservice.getlookupItem().then(countries => { this.sale = countries; });
    }
    lookupform() {
        this.lookupitem = false;
        this.addsubitem = true;
    }
    addsub() {
        
    }
}