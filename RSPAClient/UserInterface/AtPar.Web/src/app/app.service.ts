import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AppService {

    constructor(private http: Http) { }

    getAppDetails(appId: string) {
        debugger;
        return this.http.post(location.href, appId)
            .map((response: Response) => {
                debugger;
                let details = response.json();
                debugger;
                return details;
            })
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        debugger;
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    setAppFavicon(id: string, basepath: string, icon: string) {
        debugger;
        var favIconEle = <HTMLElement>document.getElementById(id);
        favIconEle.setAttribute('href', basepath + '/' + icon);
        debugger;
        //$("#" + id).attr("href", basepath + "/" + icon);
    }
}