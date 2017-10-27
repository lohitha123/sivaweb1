import { Component, ContentChildren, QueryList, AfterContentInit ,animate, style, state, transition, trigger} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab } from './tab';

@Component({
    selector: 'atpar-tabs',
    template: `
    <ul class="nav nav-tabs bar_tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a >{{tab.title}}</a>
      </li>
    </ul>
    <div class="tab-content">
            <ng-content></ng-content>
    </div>
  `,
})
export class Tabs implements AfterContentInit {
    state = 'open';
    @ContentChildren(Tab) tabs: QueryList<Tab>;

    // contentChildren are set
    ngAfterContentInit() {
        // get all active tabs
        let activeTabs = this.tabs.filter((tab) => tab.active);

        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: Tab) {
        // deactivate all tabs
        this.tabs.toArray().forEach(tab => tab.active = false);
        // activate the tab the user has clicked on.
        tab.active = true;
    }

}
