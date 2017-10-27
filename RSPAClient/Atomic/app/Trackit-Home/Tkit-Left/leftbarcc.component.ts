import { Component } from '@angular/core';
import { LeftBarAnimationService } from '../leftbar-animation.service';

@Component({
    moduleId: module.id,
    providers: [LeftBarAnimationService],
    selector: 'leftbar-cc',
    templateUrl: 'leftbarcc.component.html'
})

export class LeftbarccComponent {
    isActive = false;
    activeMenu: String;
    showStyle: boolean = true;

    constructor(private leftBarAnimationService: LeftBarAnimationService) { }

    getDisplay() {
        this.activeMenu = this.leftBarAnimationService.get();
        return this.leftBarAnimationService.get();
    }
}
