
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BodyComponent } from './body.component';
import { AtparProfile } from '../../AtPar/atpar-profile.component';
import { AtparDownloads } from '../../AtPar/atpar-downloads.component';

import { AtparInitModule } from '../../Init/atpar-init.module';
import { PointOfUseModule } from '../../PointOfUse/pointofuse.module';

import { SharedModule } from '../../Shared/shared.module';

@NgModule({

    imports: [
        CommonModule,
        RouterModule,
        AtparInitModule,
        PointOfUseModule,
        FormsModule,
        SharedModule
    ],

    declarations: [
        BodyComponent,
        AtparProfile,
        AtparDownloads
    ],

    exports: [
        BodyComponent,
    ]
})

export class BodyModule { }
