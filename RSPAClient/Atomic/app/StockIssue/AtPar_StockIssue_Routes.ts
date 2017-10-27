import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StockIssueImports } from './StockIssueImports';

const routes: Routes = GetScreens();
export const AtPar_StockIssue_Routes = RouterModule.forRoot(routes);

function GetScreens() {
    var results: Array<Object> = Array<Object>();
    let routesList: Array<string> = ["StockIssue/AllocateDestinationLocations","StockIssue/AllocateDistributionTypes",
        "StockIssue/AllocateInventoryBusinessUnits","StockIssue/DailyActivity","StockIssue/DailyUserActivity","StockIssue/IssueReport",
        "StockIssue/UserParameters"
    ]

    let scrnName = 0;

    routesList.map(screenId => {
        let componentName = StockIssueImports[scrnName];

        results.push({ path: screenId, component: componentName })
        scrnName++;
    })

    return results
}

