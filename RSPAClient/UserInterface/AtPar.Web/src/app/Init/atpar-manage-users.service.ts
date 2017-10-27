import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';



@Injectable()

export class ManageUsersServices {

    constructor(private httpService: HttpService) {
    }

    async isMenuAssigned(strChkMenuName) {
        return await this.httpService.getSync({
            "apiMethod": "/api/ManageUsers/IsMenuAssigned",
            params: {
                "chkMenuName": strChkMenuName
            }
        });
    }
    async getManageUsers() {
        return await this.httpService.getSync({
            "apiMethod": "/api/ManageUsers/GetManageUsers",
            params: { }

        });
    }

    async getUsers(searchString) {
        return await this.httpService.getSync({
            "apiMethod": "/api/ManageUsers/GetUsers",
            params: {
                "searchID": searchString,
            }
        });
    }



    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}