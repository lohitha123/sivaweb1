import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReceivingImports } from './ReceivingImports';

const routes: Routes = GetScreens();
export const AtPar_Receiving_Routes = RouterModule.forRoot(routes);

function GetScreens() {
    var results: Array<Object> = Array<Object>();
    let routesList: Array<string> = ["Receiving/ActivityReport", "Receiving/AllocateInventoryBusinessUnits", "Receiving/AllocateShipToIDs",
        "Receiving/ASNDiscrepancyReport", "Receiving/CarrierInformation", "Receiving/CarrierReport", "Receiving/DailyActivity", "Receiving/DailyUserActivity",
        "Receiving/DeviationReport", "Receiving/Lot/SerialTrackingReport", "Receiving/ManageCarriers", "Receiving/ParcelCountReport", "Receiving/PO/NONPOReceipts",
        "Receiving/ReleaseOrders", "Receiving/SetupShiptoIDs","Receiving/UserParameters"]

    let scrnName = 0;

    routesList.map(screenId => {
        let componentName = ReceivingImports[scrnName];

        results.push({ path: screenId, component: componentName })
        scrnName++;
    })

    return results
}

