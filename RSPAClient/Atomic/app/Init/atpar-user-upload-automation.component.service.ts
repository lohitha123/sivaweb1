import { Component, OnInit, EventEmitter, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Http } from "@angular/http";

@Injectable()
export class AutoCompleteService {

    constructor(private http: Http) { }

    getCountries(query: any) {
        //return this.http.get("http://localhost:63347/api/AutoComplete/GetCountry?query=" + query)
        //    .toPromise()
        //    .then(res => <any[]>res.json().data)
        //    .then(data => { return data; });

        return this.http.get("http://localhost:63347/api/AutoComplete/GetCountry?query=" + query)
            .map(res => <any[]>res.json())



    }
}