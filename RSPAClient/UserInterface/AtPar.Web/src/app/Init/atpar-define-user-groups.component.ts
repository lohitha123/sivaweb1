import { Component } from '@angular/core';
declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'atpar-define-user-groups.component.html'
})

export class DefineUserGroupsComponent {
    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    hideDialog() {
        this.display = false;
    }
}