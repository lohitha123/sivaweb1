import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';

@Component({
    templateUrl: './app/Init/atpar-manage-org-groups.component.html',
    providers: [datatableservice],
})

export class ManageOrgGroupsComponent {
    ACB: boolean = false;
    AP: boolean = false;
    MOG: boolean = true;
    pop: boolean = false; 
    sales: Employee[];
    ven: any;


    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
    }
    ngOnInit() {
        this.dataservice.getmanageorg().then(countries => { this.sales = countries; });    
    }
    clicked(event) {
        event.preventDefault();
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;
        if (value == "ACB") {
            this.ACB = true;
            this.AP = false;
            this.MOG = false;
            this.dataservice.getBunits().then(countries => { this.sales = countries; });
            console.log("hit");
        } else if (value == "AP") {
            this.AP = true;
            this.ACB = false;
            this.MOG = false;
        } else if (value == "add") {
            this.pop = true;
        } else if (value == "close") {
            this.pop = false;
        }
        else {
            this.ACB = false;
            this.AP = false;
            this.MOG = true;
            this.dataservice.getmanageorg().then(countries => { this.sales = countries; });
        }
    }

}