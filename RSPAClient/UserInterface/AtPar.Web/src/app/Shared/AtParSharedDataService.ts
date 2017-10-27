import { Injectable } from '@angular/core';

@Injectable()
export class AtParSharedDataService {

    public storage: any;

    public constructor() {
        if (localStorage.getItem('dataStorage') != null && localStorage.getItem('dataStorage') != undefined && localStorage.getItem('dataStorage') != '') {
            this.storage = JSON.parse(localStorage.getItem('dataStorage'));
        }
    }

    public setStorage(storage: any) {
        this.storage = storage;
        localStorage.setItem('dataStorage', JSON.stringify(this.storage));
    }


}