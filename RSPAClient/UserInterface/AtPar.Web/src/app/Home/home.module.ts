import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BodyModule } from './Body/body.module';
import { HomeComponent } from './home.component';
import { TopBarComponent } from './Top/topbar.component';
import { SharedModule } from '../Shared/shared.module';
import { HomeRoutingModule } from './home.routes';
import { LeftBarComponent } from './Left/leftbar.component';
import { SameUrlComponent } from '../AtPar/atpar-page-not-found.component';
import { AtParBreadCrumbComponent } from '../AtPar/atpar-bread-Crumb.component';
import { CartCountBreadCrumbComponent } from '../AtPar/Cartcount-bread-Crumb.component';
import { CycleCountBreadCrumbComponent } from '../AtPar/cyclecount-bread-Crumb.component';
import { ReceivingBreadCrumbComponent } from '../AtPar/receiving-bread-Crumb.component';
import { PickBreadCrumbComponent } from '../AtPar/pick-bread-Crumb.component';
import { DeliverBreadCrumbComponent } from '../AtPar/deliver-bread-Crumb.component';
import { PutawayBreadCrumbComponent } from '../AtPar/putaway-bread-Crumb.component';
import { TrackITBreadCrumbComponent } from '../AtPar/trackIT-bread-Crumb.component';
import { StockIssueBreadCrumbComponent } from '../AtPar/stockissue-bread-Crumb.component';
import { AssetManagementBreadCrumbComponent } from '../AtPar/assetmanagement-bread-Crumb.component';
import { BinToBinBreadCrumbComponent } from '../AtPar/bintobin-bread-Crumb.component';
import { PointOfUseBreadCrumbComponent } from '../AtPar/pointofuse-bread-Crumb.component';
import { AtPaRXBreadCrumbComponent } from '../AtPar/atparx-bread-Crumb.component';

@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        BodyModule,
        HomeRoutingModule,
        SharedModule,
    ],

    declarations: [
        HomeComponent,
        TopBarComponent,
        LeftBarComponent,
        SameUrlComponent,
        AtParBreadCrumbComponent,
        CartCountBreadCrumbComponent,
        CycleCountBreadCrumbComponent,
        ReceivingBreadCrumbComponent,
        PickBreadCrumbComponent,
        DeliverBreadCrumbComponent,
        PutawayBreadCrumbComponent,
        TrackITBreadCrumbComponent,
        StockIssueBreadCrumbComponent,
        AssetManagementBreadCrumbComponent,
        BinToBinBreadCrumbComponent,
        PointOfUseBreadCrumbComponent,
        AtPaRXBreadCrumbComponent

    ],

    exports: [
        HomeComponent,
        TopBarComponent,
    ],

})

export class HomeModule { }
