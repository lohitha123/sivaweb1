import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PutawayImports } from './PutawayImports';

const routes: Routes = GetScreens();
export const AtPar_Putaway_Routes = RouterModule.forRoot(routes);

function GetScreens() {
    var results: Array<Object> = Array<Object>();
    let routesList: Array<string> = ["Putaway/ActivityReport", "Putaway/AllocateBusinessUnits", "Putaway/DailyActivity", "Putaway/DailyUserActivity",
        "Putaway/DeviationReport", "Putaway/ReleaseOrders","Putaway/UserParameters" ]

    let scrnName = 0;

    routesList.map(screenId => {
        let componentName = PutawayImports[scrnName];

        results.push({ path: screenId, component: componentName })
        scrnName++;
    })

    return results
}

