import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';

import { LoginComponent } from './login/index';
import { TkitLoginComponent } from './Trackit-login/index';
import { HomeRoutes } from './Home/home.routes';
import { TkitHomeRoutes } from './Trackit-Home/Tkit-home.routes';

import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {
        return super.parse(url.toLowerCase());
    }
}


export const routes: Routes = [
    { path: 'login', loadChildren: 'app/Login/login.module#LoginModule' },
    { path: 'trackitlogin', loadChildren: 'app/Trackit-login/Tkit-login.module#TkitLoginModule' },
    { path: 'forgot-password', loadChildren: 'app/ForgotPassword/forgot.module#ForgotModule' },
    ...HomeRoutes,
    ...TkitHomeRoutes,
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'logn', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        {
            provide: UrlSerializer,
            useClass: LowerCaseUrlSerializer
        }
    ],
})

export class AppRoutingModule { }


