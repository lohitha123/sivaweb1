import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { AtParWebApiResponse } from './AtParWebApiResponse'; 
import { HttpService } from './HttpService';
@Injectable()

export class HttpServiceUtility {

    url = "http://localhost:8001/";
   

    constructor(private httpservice: HttpService) { }
    private headers = new Headers({ 'Content-Type': 'application/json' });
   
    public get(): Promise<any> {

        return this.httpservice.getSync({
            "apiMethod": ""
        }).then(response => response.json()).catch(this.handleError);

    }

    delete(id: number) {

        return this.httpservice.delete({
            "apiMethod": "" + id
        });
    }
    create(url, data) {

        return this.httpservice.create({
            "apiMethod": url,
            "formData": JSON.stringify(data)
        }).map(res => res.json().data);

    }
    update(url, data) {
        return this.httpservice.update({
            "apiMethod": url,
            "formData": JSON.stringify(data)
        }).map(res => res.json().data);
    }
  
    private handleError(error: any): Promise<any> {
        console.error('Web Api not hosted properly or server not available', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}