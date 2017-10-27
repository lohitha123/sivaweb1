import { Component, Input, animate, style, state, transition, trigger, keyframes} from '@angular/core';

@Component({
  selector: 'atpar-tab',
  template: `
    <div class="tab-content" [hidden] = "!active">
      <div class="tab-pane active in" [ngClass]="{'fade': active}">
            <ng-content></ng-content>
      </div>
    </div>
  `
})
export class Tab {
  @Input('tabTitle') title: string;
  @Input() active = false;
  //state: string = 'inactive';
  //[hidden] = "!active"
}