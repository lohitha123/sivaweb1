import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'recv-release-orders.component.html',
})

export class ReleaseOrdersComponent {
    recvReleaseAppId: number = EnumApps.Receiving;
}







