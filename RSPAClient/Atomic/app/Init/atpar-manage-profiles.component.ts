import { Component } from '@angular/core';
import { TextboxControl } from '../Common/DynamicControls/TextboxControl';
import { DropDownControl } from '../Common/DynamicControls/DropDownControl';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';

@Component({
    moduleId: module.id,
    templateUrl: 'atpar-manage-profiles.component.html',
    providers: [datatableservice],
})

export class ManageProfilesComponent {
    content: boolean = false;
    display: boolean = false;
    display2: boolean = false;
    display3: boolean = false;
    page: boolean = true;
    sales: Employee[];
    sale: Employee[];
    ven: any;

    constructor(public dataservice: datatableservice) {
        this.ven = new Employee();
    }

    go() {
        this.content = true;        
    }

    create() {
        this.content = true;
    }
    popup() {
        this.display = true;
        this.display2 = false;
        this.display3 = false;
        this.page = false;
        this.content = false;
    }
    popup2() {
        this.display2 = true;
        this.display = false;
        this.display3 = false;
        this.page = false;
        this.content = false;
        this.dataservice.getmenuAccess().then(countries => { this.sales = countries; });
    }
    popup3() {
        this.display3 = true;
        this.display2 = false;
        this.display = false;
        this.page = false;
        this.content = false;
        this.dataservice.getscreenDisplay().then(countries => { this.sales = countries; });
    }
    hideDialog() {
        this.page = true;
        this.display2 = false;
        this.display = false;
        this.display3 = false;
    }
}