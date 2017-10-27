/// <reference path="../atpar/atpar-page-not-found.component.ts" />
import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DefaultUrlSerializer, UrlTree } from '@angular/router';

import { TrackITDashboardComponent } from './trackit.dashboard.component';

import { BodyRoutes } from './Body/trackit.body.routes';

import { SameUrlComponent } from '../AtPar/atpar-page-not-found.component';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {
        return super.parse(url.toLowerCase());
    }
}

export const routes: Routes = [
    {
        path: '', component: TrackITDashboardComponent,
        children: [
            ...BodyRoutes,
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


export class TrackITDashboardRoutingModule { }
