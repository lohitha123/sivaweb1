
import { NgModule } from '@angular/core';

import {
    RouterModule,
    Routes,
    UrlSerializer,
    DefaultUrlSerializer,
    UrlTree
} from '@angular/router';


import { LoginComponent } from './login/index';
import { PageNotFoundComponent } from './AtPar/atpar-page-not-found.component';
import { TrackitLoginComponent } from './TrackitLogin/trackit.login.index';
import { DeliveryTrackingComponent } from './DeliveryTracking/deliver-track-report.index';

import {
    ExportReportComponent,
    ExportReportViewerComponent,
    ExportDashboardViewerComponent
} from './export/index';

import { CustomUrlSerializer } from "./_helpers/customurlserializer";


export const routes: Routes = [

    {
        path: 'pagenotfound',
        component: PageNotFoundComponent
    },
    {
        path: 'viewer/reportpart/:id',
        component: ExportReportComponent
    },   
    {
        path: 'report/view/:id',
        component: ExportReportViewerComponent
    },
    {
        path: 'dashboard/view/:id',
        component: ExportDashboardViewerComponent
    },
    {
        path: 'login',
        loadChildren: './Login/login.module#LoginModule'
    },
    {
        path: 'login/:systemid',
        loadChildren: './Login/login.module#LoginModule'
    },
    {
        path: 'login/:redirected',
        loadChildren: './Login/login.module#LoginModule'
    },
    {
        path: 'atpar',
        loadChildren: './Home/home.module#HomeModule'
    },
    {
        path: 'forgot-password',
        loadChildren: './ForgotPassword/forgot.module#ForgotModule'
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'trackitlogin',
        loadChildren: './trackitlogin/trackit.login.module#TrackitLoginModule'
    },
    {
        path: 'trackitdashboard',
        loadChildren: './TrackITDashboard/trackit.dashboard.module#TrackitDashboardModule'
    },
    {
        path: 'deliverytracking',
        loadChildren: './DeliveryTracking/deliver-track-report.module#DeliveryTrackingModule'
    },
    {
        path: '**',
        redirectTo: 'pagenotfound',
        pathMatch: 'full'
    }

];

@NgModule({

    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        {
            provide: UrlSerializer,
            useClass: CustomUrlSerializer
        }
    ]

})

export class AppRoutingModule {}


