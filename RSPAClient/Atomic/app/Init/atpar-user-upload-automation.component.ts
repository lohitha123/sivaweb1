/// <reference path="atpar-user-upload-automation.component.service.ts" />
import { Component } from '@angular/core';
import { AutoCompleteService } from '../../app/Init/atpar-user-upload-automation.component.service';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    selector:'my-app',
    templateUrl: './app/Init/atpar-user-upload-automation.component.html',
    providers: [AutoCompleteService, datatableservice]
})

export class UserUploadAutomationComponent {
    country: any;

    countries: any[];

    filteredCountriesSingle: any[];

    filteredCountriesMultiple: any[];

    brands: string[] = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];

    filteredBrands: any[];

    brand: string;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    constructor(private countryService: AutoCompleteService, public dataservice: datatableservice) { }

    filterCountrySingle(event) {
        let query = event.query;
        if (query == "%"){
            this.countryService.getCountries(query).subscribe(countries => {
                this.filteredCountriesSingle = this.filterCountry(query, countries);
            });

        }
        else if (query.length >=3) {
            this.countryService.getCountries(query).subscribe(countries => {
                this.filteredCountriesSingle = this.filterCountry(query, countries);
            });
        }


    }

    filterCountryMultiple(event) {
        //let query = event.query;
        //this.countryService.getCountries().then(countries => {
        //    this.filteredCountriesMultiple = this.filterCountry(query, countries);
        //});
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