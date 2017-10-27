
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { BodyComponent } from './body.component';
import { AtparProfile } from '../../AtPar/atpar-profile.component';
import { AtparDownloads } from '../../AtPar/atpar-downloads.component';
import { AtParBreadCrumbComponent } from '../../AtPar/atpar-bread-Crumb.component';
import { CartCountBreadCrumbComponent } from '../../AtPar/Cartcount-bread-Crumb.component';
import { CycleCountBreadCrumbComponent } from '../../AtPar/cyclecount-bread-Crumb.component';
import { ReceivingBreadCrumbComponent } from '../../AtPar/receiving-bread-Crumb.component';
import { PickBreadCrumbComponent } from '../../AtPar/pick-bread-Crumb.component';
import { DeliverBreadCrumbComponent } from '../../AtPar/deliver-bread-Crumb.component';
import { PutawayBreadCrumbComponent } from '../../AtPar/putaway-bread-Crumb.component';
import { TrackITBreadCrumbComponent } from '../../AtPar/trackIT-bread-Crumb.component';
import { StockIssueBreadCrumbComponent } from '../../AtPar/stockissue-bread-Crumb.component';
import { AssetManagementBreadCrumbComponent } from '../../AtPar/assetmanagement-bread-Crumb.component';
import { BinToBinBreadCrumbComponent } from '../../AtPar/bintobin-bread-Crumb.component';
import { PointOfUseBreadCrumbComponent } from '../../AtPar/pointofuse-bread-Crumb.component';
import { AtPaRXBreadCrumbComponent } from '../../AtPar/atparx-bread-Crumb.component';

export const BodyRoutes: Route[] = [
    { path: '', component: BodyComponent },
    { path: 'myprofile', component: AtparProfile },
    { path: 'downloads', component: AtparDownloads },
    { path: 'atparbreadcrumb', component: AtParBreadCrumbComponent },
    { path: 'cartcountbreadcrumb', component: CartCountBreadCrumbComponent },
    { path: 'cyclecountbreadcrumb', component: CycleCountBreadCrumbComponent },
    { path: 'receivingbreadcrumb', component: ReceivingBreadCrumbComponent },
    { path: 'pickbreadcrumb', component: PickBreadCrumbComponent },
    { path: 'deliverbreadcrumb', component: DeliverBreadCrumbComponent },
    { path: 'putawaybreadcrumb', component: PutawayBreadCrumbComponent },
    { path: 'trackitbreadcrumb', component: TrackITBreadCrumbComponent },
    { path: 'stockissuebreadcrumb', component: StockIssueBreadCrumbComponent },
    { path: 'assetmanagementbreadcrumb', component: AssetManagementBreadCrumbComponent },
    { path: 'bintobinbreadcrumb', component: BinToBinBreadCrumbComponent },
    { path: 'pointofusebreadcrumb', component: PointOfUseBreadCrumbComponent },
    { path: 'atparxbreadcrumb', component: AtPaRXBreadCrumbComponent }
]
