
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageZoomModule } from 'ng2-image-hover-zoom';
import { TrackITBodyComponent } from './trackit.body.component';
import { CreateRequestComponent } from './trackit.create.request.component';
import { RequestStatusComponent } from './trackit.request.status.component';
import { RequestorItemVisibilityReportComponent } from './trackit.requestor.item.visibility.report';
import { ViewCartComponent } from './trackit.view.cart';
import { TrackITProfileComponent } from './trackit.profile.component';
import { SharedModule } from '../../Shared/shared.module';

declare var module: {
    id: string;
}


@NgModule({

    imports: [
        CommonModule,
        ImageZoomModule,
        RouterModule,
        FormsModule,
        SharedModule
    ],

    declarations: [
        TrackITBodyComponent,
        CreateRequestComponent,
        RequestStatusComponent,
        RequestorItemVisibilityReportComponent,
        ViewCartComponent,
        TrackITProfileComponent
    ],

    exports: [
        TrackITBodyComponent,
    ]
})

export class TrackITBodyModule { }
