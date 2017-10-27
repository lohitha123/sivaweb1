import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CycleCountImports } from './CycleCountImports';

const routes: Routes = GetScreens();
export const AtPar_CycleCount_Routes = RouterModule.forRoot(routes);

function GetScreens() {
    var results: Array<Object> = Array<Object>();
    let routesList: Array<string> = ["CycleCount/ActivityReport", "CycleCount/AllocateEvents", "CycleCount/AllocateIBUsManualCounts", "CycleCount/DailyActivity",
        "CycleCount/DailyUserActivity", "CycleCount/EventSummaryReport", "CycleCount/ItemExceptionReport", "CycleCount/ProcessCounts", "CycleCount/ReviewCounts",
        "CycleCount/SplitEvents","CycleCount/UserParameters"]

    let scrnName = 0;

    routesList.map(screenId => {
        let componentName = CycleCountImports[scrnName];

        results.push({ path: screenId, component: componentName })
        scrnName++;
    })

    return results
}

