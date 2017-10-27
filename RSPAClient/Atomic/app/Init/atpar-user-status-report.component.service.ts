import { Component, OnInit, EventEmitter, Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Http } from "@angular/http";

@Injectable()
export class AutoCompleteServiceForClient {

    constructor(private http: Http) { }

    getCountries() {
        //return this.http.get("http://localhost:63347/api/AutoComplete/GetCountry?query=" + query)
        //    .toPromise()
        //    .then(res => <any[]>res.json().data)
        //    .then(data => { return data; });

        return this.http.get("../../app/components/autocomplete/countries.json")
            .toPromise()
            .then(res => <any[]>res.json().data)
            .then(data => { return data; });



    }
}