import { Component, Inject } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import {SelectItem} from '../components/common/api';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    templateUrl: './app/Init/atpar-add-user.component.html',
    providers: [datatableservice]
})

export class AddUserComponent {
    table: boolean = false;
    form: boolean = false;
    sales: Employee[];
    ven: any;
    cities: SelectItem[];
    selectedCity: string;
    cars: SelectItem[];
    selectedCar: string;
    import: boolean = false;
    constructor(public dataservice: datatableservice, @Inject(DOCUMENT) private document) {
        this.ven = new Employee();
        this.dataservice.getimportUser().then(countries => { this.sales = countries; });
        this.cities = [];
        this.cities.push({ label: 'New York', value: 'New York' });
        this.cities.push({ label: 'New Town', value: 'New Town' });
        this.cities.push({ label: 'New X', value: 'New X' });
        this.cities.push({ label: 'Rome', value: 'Rome'  });
        this.cities.push({ label: 'London', value: 'London' } );
        this.cities.push({ label: 'Istanbul', value:  'Istanbul' });
        this.cities.push({ label: 'Paris', value: 'Paris'});

        this.cars = [];
        this.cars.push({ label: 'Audi', value: 'Audi' });
        this.cars.push({ label: 'BMW', value: 'BMW' });        
        
    }
    add() {
        this.import = !this.import;        
    }
    go() {
        this.table = !this.table;
    }   
    close() {
        this.table = false;
        this.import = false;
    }
    create() {
        var elmnt = this.document.getElementById('main-section');
        elmnt.scrollTop = 0;
        console.log('hit');
    }
}