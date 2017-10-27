import { Component } from '@angular/core';
import { LeftBarAnimationService } from '../leftbar-animation.service';

@Component({
    moduleId: module.id,
    providers: [LeftBarAnimationService],
    selector: 'leftbar-rd',
    templateUrl: 'leftbarr.component.html'
})

export class LeftbarrComponent {
    isActive = false;
    activeMenu: String;
    showStyle: boolean = true;

    constructor(private leftBarAnimationService: LeftBarAnimationService) { }

    getDisplay() {
        this.activeMenu = this.leftBarAnimationService.get();
        return this.leftBarAnimationService.get();
    }
}
