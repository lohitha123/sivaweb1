import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { TokenEntry_Enum } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
  
       templateUrl: 'ViewPouReport.html'
})
export class ViewPouReport implements OnInit {
    private reportName: string;
    page: SafeResourceUrl;
    URL: string;
    chVal: string;

    constructor(private route: ActivatedRoute, private domSanitizer: DomSanitizer) {
        //this.URL ="http://localhost/AtPar/web/login.aspx"
    }

	
    ngOnInit() {

        console.log(localStorage.getItem('menuName').toString());
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }

        let devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        //'pou_Preference_Card_Optimization
        //
        
        //let reportParam: string = window.location.protocol + "//" + window.location.hostname + "/AtPar/Web/" + encodeURIComponent('pou_Preference_Card_Optimization.aspx')
        let reportParam: string = window.location.protocol + "//" + window.location.hostname + "/AtPar/Web/" + encodeURIComponent(localStorage.getItem('menuCode'))
            + '?UserId=' + encodeURIComponent(devicetoken[TokenEntry_Enum.UserID])
            + '&UserPwd=' + encodeURIComponent(localStorage.getItem("UserLoginPwd"))
            + '&SystemId=' + encodeURIComponent(devicetoken[TokenEntry_Enum.SystemId])
            + '&strMenuCode=' + encodeURIComponent(localStorage.getItem('menuCode'));

        console.log(reportParam);

        this.page = this.domSanitizer.bypassSecurityTrustResourceUrl(reportParam);
    }
}
