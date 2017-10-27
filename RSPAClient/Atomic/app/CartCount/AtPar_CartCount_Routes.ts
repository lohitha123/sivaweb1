import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CartCountImports } from './CartCountImports';

const routes: Routes = GetScreens();
export const AtPar_CartCount_Routes = RouterModule.forRoot(routes);

function GetScreens() {
    var results: Array<Object> = Array<Object>();
    let routesList: Array<string> = ["CartCount/ActivityReport","CartCount/AllocateCarts","CartCount/CartAveragesReport",
        "CartCount/CartDetailReport","CartCount/CartPutawayReport","CartCount/CreateOrders","CartCount/CreateRequisition",
        "CartCount/CriticalItems","CartCount/DailyActivity", "CartCount/DailyUserActivity","CartCount/ItemExceptionReport","CartCount/ItemUsageReport",
        "CartCount/ManageOrders","CartCount/ManageParLocation","CartCount/OptimizationReport","CartCount/OrderHistoryReport",
        "CartCount/ParAuditReport","CartCount/ProcessParameters","CartCount/ScheduleComplianceReport", "CartCount/SetupParLocations",
        "CartCount/UserParameters","CartCount/UserProductivityReport"
       
    ]

    let scrnName = 0;

    routesList.map(screenId => {
        let componentName = CartCountImports[scrnName];

        results.push({ path: screenId, component: componentName })
        scrnName++;
    }) 
    return results
} 

