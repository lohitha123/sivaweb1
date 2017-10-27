import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftBarAnimationService } from '../leftbar-animation.service';

@Component({
    moduleId: module.id,
    providers: [LeftBarAnimationService],
    selector: 'leftbar-wh',
    templateUrl: 'leftbarw.component.html'
})

export class LeftbarwComponent {
    isActivecc: boolean = false;
    isActiver: boolean = false;
    isActivecy: boolean = false;
    activeMenu: String;
    showStyle: boolean = true;

    constructor(private leftBarAnimationService: LeftBarAnimationService) { }

    getDisplay() {
        this.activeMenu = this.leftBarAnimationService.get();
        console.log(this.activeMenu);
        return this.leftBarAnimationService.get();
    }
    cartDown() {
        this.isActivecc = !this.isActivecc;
        this.isActiver = false;
        this.isActiver = false;
        console.log('hit');
    }
    reportdown() {
        this.isActiver = !this.isActiver;
        this.isActivecy = false;
        this.isActivecc = false;

    }
    cycledown() {
        this.isActivecy = !this.isActivecy;
        this.isActiver = false;
        this.isActivecc = false;
    }
}
