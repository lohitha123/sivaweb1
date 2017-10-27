import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var module: {
    id: string;
}
@Component({
    selector: 'atpar-page-not-found',
    template: '<div>page not found</div>'
})

export class PageNotFoundComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        this.validateUser();
    }

    validateUser() {
        if (sessionStorage.getItem('DeviceTokenEntry') != null && sessionStorage.getItem('DeviceTokenEntry') != undefined) {
            this.router.navigate(['atpar']);
        }
        else {
            this.router.navigate(['login']);
        }

        if (localStorage.getItem('tkitDeviceTokenEntry') != null && localStorage.getItem('tkitDeviceTokenEntry') != undefined) {
            this.router.navigate(['trackitdashboard']);
        }
        else {
            this.router.navigate(['trackitlogin']);
        }
    }
}

@Component({
    selector: 'atpar-same-url',
    template: '<div style="margin-top:-5% !important">same router called</div>'
})

export class SameUrlComponent {

}