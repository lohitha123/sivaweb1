import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryTrackingComponent } from './deliver-track-report.component'

export const routes: Routes = [
    { path: '', component: DeliveryTrackingComponent, data: { title: 'deliverytracking' } }
    //{ path: '/:psystemid', component: DeliveryTrackingComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DeliveryTrackingRoutingModule { }