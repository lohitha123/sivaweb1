import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { HomeComponent } from './home.component';
import { SameUrlComponent } from '../AtPar/atpar-page-not-found.component';

import { BodyRoutes } from './Body/body.routes';

import { AtParRoutes } from '../Init/atpar-init-routing.module';
import { POURoutes } from '../PointOfUse/pointofuse-routing.module';

import { DefaultUrlSerializer, UrlTree } from '@angular/router';

import { MT_ATPAR_CONFIGURATION_SECTION_DTLS } from '../Entities/MT_ATPAR_CONFIGURATION_SECTION_DTLS';


export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {
        return super.parse(url.toLowerCase());
    }
}

export const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            ...BodyRoutes,
            ...AtParRoutes,
            ...POURoutes,
            { path: 'bintobin', loadChildren: '../BinToBin/bintobin.module#BinToBinModule' },
            { path: 'cartcount', loadChildren: '../CartCount/cartcount.module#CartCountModule' },
            { path: 'cyclecount', loadChildren: '../CycleCount/cyclecount.module#CycleCountModule' },
            { path: 'deliver', loadChildren: '../Deliver/deliver.module#DeliverModule' },
            { path: 'pick', loadChildren: '../Pick/pick.module#PickModule' },
            { path: 'putaway', loadChildren: '../PutAway/putaway.module#PutawayModule' },
            { path: 'receiving', loadChildren: '../Receiving/recv.module#ReceivingModule' },
            { path: 'stockissue', loadChildren: '../StockIssue/stockissue.module#StockIssueModule' },
            { path: 'trackit', loadChildren: '../TrackIT/trackit.module#TrackITModule' },
            { path: 'assetmanagement', loadChildren: '../AssetManagement/asmt.module#AssetManagementModule' },
            { path: 'atparx', loadChildren: '../AtParX/atparx.module#AtParXModule' },
            { path: 'reports', loadChildren: '../reports/reports.module#ReportsModule' },
            { path: 'sameurl', component: SameUrlComponent }
        ]
    }

]


@NgModule({

    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        {
            provide: UrlSerializer,
            useClass: LowerCaseUrlSerializer
        }
    ],

})


export class HomeRoutingModule { }
