import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'cart-user-parameters.component.html'
})

export class UserParametersComponent {
    crctAppId: number = EnumApps.CartCount;
} 