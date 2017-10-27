/// <reference path="trackit.profile.component.ts" />

import {  Route } from '@angular/router';
import { TrackITBodyComponent } from './trackit.body.component';
import { CreateRequestComponent } from './trackit.create.request.component';
import { RequestStatusComponent } from './trackit.request.status.component';
import { RequestorItemVisibilityReportComponent } from './trackit.requestor.item.visibility.report';
import { ViewCartComponent } from './trackit.view.cart';
import { TrackITProfileComponent } from './trackit.profile.component';


export const BodyRoutes: Route[] = [
    { path: '', component: TrackITBodyComponent },
    { path: 'myprofile', component: TrackITProfileComponent },
    { path: 'createrequest', component: CreateRequestComponent },
    { path: 'requeststatus', component: RequestStatusComponent },
    { path: 'requestoritemvisibilityreport', component: RequestorItemVisibilityReportComponent },
    { path: 'viewcart', component: ViewCartComponent }
]
