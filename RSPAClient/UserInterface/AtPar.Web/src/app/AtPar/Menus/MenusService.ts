import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Menus } from '../Menus/routepath';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../../Shared/HttpService';
//import { RoutersData } from '../Entities/RouterPath';





@Injectable()
export class MenuServices {
    constructor(private httpservice: HttpService) { }


    getGroupMenuList(
        profileID: string,
        userID: string
    ) {
        return this.httpservice.getSync({
            "apiMethod": "/api/User/GetGroupMenusList",
            params: {
                "ProfileID": profileID,
                "UserID": userID
            }
        });
    }


    public handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}
