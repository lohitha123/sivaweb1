
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TrackITBodyModule } from './Body/trackit.body.module';
import { TrackITDashboardComponent } from './trackit.dashboard.component';
import { TrackITDashboardRoutingModule } from './trackit.dashboard.routing.module';
import { TrackITTopBarComponent } from './Top/trackit.topbar.component';
import { SharedModule } from '../Shared/shared.module';
import { SameUrlComponent } from '../AtPar/atpar-page-not-found.component';


@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        TrackITBodyModule,
        TrackITDashboardRoutingModule,
    ],

    declarations: [
        TrackITDashboardComponent,
        TrackITTopBarComponent,
        SameUrlComponent
    ],

    exports: [
        TrackITDashboardComponent,
        TrackITTopBarComponent,
    ],

})

export class TrackitDashboardModule {
    
}
