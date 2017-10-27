
import { Component, HostListener, ElementRef, EventEmitter } from '@angular/core';

import { TextboxControl } from '../Common/DynamicControls/TextboxControl';
import { DropDownControl } from '../Common/DynamicControls/DropDownControl';
import { CheckboxControl } from '../Common/DynamicControls/CheckboxControl';
import { SpanControl } from '../Common/DynamicControls/SpanControl';
import { ModelControl } from '../Common/DynamicControls/ModelControl';
//import { MT_ATPAR_CONFIGURATION_SECTION_DTLS } from '../Entities/MT_ATPAR_CONFIGURATION_SECTION_DTLS';
//import { ConfigurationManagerService } from './atpar-configuration-manager.service';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { CustomValidators } from './../common/textbox/custom-validators';
import { CustomTextBoxModule } from './../common/textbox/CustomTextBoxModule';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { ConfirmationService } from '../components/common/api';
import { Router } from '@angular/router';
import { Message } from '../components/common/api';
import { AutoCompleteServiceForClient } from './atpar-user-status-report.component.service';

@Component({
    moduleId: module.id,

    templateUrl: 'atpar-configuration-manager.component.html',

    providers: [ConfirmationService, AutoCompleteServiceForClient]
})

export class ConfigurationManagerComponent {

    //value: string; cities: SelectItem[];
    date3: Date;
    selectedCity: string;
    msgs: Message[] = [];
    public newItem = new PAR_MNGT_VENDOR();
    //cars: SelectItem[];

    selectedCar: string = 'BMW';     

    

    homeurl() {

        this.leftBarAnimationsewrvice.isHomeClicked = false;
        this.leftBarAnimationsewrvice.isHide();
        this.router.navigate(['home']);
    }



    constructor(

        private el: ElementRef,
        private leftBarAnimationsewrvice: LeftBarAnimationService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private countryService: AutoCompleteServiceForClient
    ) {
        //this.cities = [];
        //this.cities.push({ label: 'Select City', value: null });
        //this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        //this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        //this.cities.push({ label: 'London is dreams city for poples lives thereadasdsad dasdasdas dasdadad asdas', value: { id: 3, name: 'London', code: 'LDN' } });
        //this.cities.push({ label: 'Istanbul is a city of islam', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        //this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
        //this.cars = [];
        //this.cars.push({ label: 'Audi', value: 'Audi' });
        //this.cars.push({ label: 'BMW', value: 'BMW' });
        //this.cars.push({ label: 'Fiat', value: 'Fiat' });
        //this.cars.push({ label: 'Ford', value: 'Ford' });
        //this.cars.push({ label: 'Honda', value: 'Honda' });
        //this.cars.push({ label: 'Jaguar', value: 'Jaguar' });
        //this.cars.push({ label: 'Mercedes', value: 'Mercedes' });
        //this.cars.push({ label: 'Renault', value: 'Renault' });
        //this.cars.push({ label: 'VW', value: 'VW' });
        //this.cars.push({ label: 'Volvo', value: 'Volvo' });
    }
    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    hideDialog() {
        this.display = false;
    }
    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                //Actual logic to perform a confirmation
            }
        });
    }
    //ngOnInit(): void {


    //}
    showInfo() {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    }
    showWarn() {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    }

    showError() {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    }
    showSuccess() {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Data Entered Successfully' });
    }

    date1: Date;

    date2: Date;

    minDateValue1: Date = new Date();

    minDateValue2: Date;


    ngOnInit() {
        localStorage.removeItem("FromDate");
        localStorage.removeItem("ToDate");

        this.minDateValue2 = this.minDateValue1;
    }

    selectDate1(date) {
        this.date1 = date;
        this.minDateValue2 = this.date1;
        localStorage.setItem("FromDate", date);
        var tempDate = localStorage.getItem("ToDate");
        if (tempDate != undefined && tempDate != null) {
            if (new Date(tempDate) < this.date1) {
                this.date2 = this.date1;
            }
        }

    }

    selectDate2(date) {
        this.date2 = date;
        localStorage.setItem("ToDate", date);
    }


    onfocusToCalendar(e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        } else {
            this.minDateValue2 = this.date1;
        }
    }
    onfocusFromCalendar(e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;

    }


    //autocomplete functinality

    country: any;

    countries: any[];

    filteredCountriesSingle: any[];

    filteredCountriesMultiple: any[];

    brands: string[] = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];

    filteredBrands: any[];

    brand: string;

    //constructor(private countryService: AutoCompleteServiceForClient) { }

    filterCountrySingle(event) {
        let query = event.query;
        this.countryService.getCountries().then(countries => {
            this.filteredCountriesSingle = this.filterCountry(query, countries);
        });


    }

    filterCountryMultiple(event) {
    }

    filterCountry(query, countries: any[]): any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];

        if (query == "%") {
            for (let i = 0; i < countries.length; i++) {
                let country = countries[i];

                filtered.push(country);

            }

        }
        else {

            for (let i = 0; i < countries.length; i++) {
                let country = countries[i];
                if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(country);
                }
            }

        }
        return filtered;
    }

    filterBrands(event) {
        this.filteredBrands = [];
        for (let i = 0; i < this.brands.length; i++) {
            let brand = this.brands[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    }

    handleDropdownClick() {
        this.filteredBrands = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredBrands = this.brands;
        }, 100)
    }


}
