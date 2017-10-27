import { Component } from '@angular/core';
import { Router } from '@angular/router'

import { LeftBarAnimationService } from '../Home/leftbar-animation.service';

@Component({
    moduleId: module.id,
    selector: 'setup-cost',
    templateUrl: './atpar-setup-cost-centers.component.html'
})

export class SetupcostComponent {
    constructor(
        private router: Router,
        private leftBarAnimationsewrvice: LeftBarAnimationService
    ) { }

    homeurl() {
        this.leftBarAnimationsewrvice.isHomeClicked = false;
        this.leftBarAnimationsewrvice.isHide();
        this.router.navigate(['home']);
    }
}
