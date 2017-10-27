import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'cart-setup-par-locations.component.html'
})

export class SetupParLocationsComponent {
    cartAppId: number = EnumApps.CartCount;
} 