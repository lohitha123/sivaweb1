import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TrackITImports } from './TrackITImports';

const routes: Routes = GetScreens();
export const AtPar_TrackIT_Routes = RouterModule.forRoot(routes);

function GetScreens() {
    var results: Array<Object> = Array<Object>();
    let routesList: Array<string> = ["TrackIT/AllocateLocationGroups","TrackIT/ChargeReport","TrackIT/CheckInItems",
        "TrackIT/DailyActivity","TrackIT/DailyUserActivity","TrackIT/DeliveryReport","TrackIT/DestructionReport",
        "TrackIT/EquipmentTrackingReport","TrackIT/InactivateItems","TrackIT/ItemMasterReport","TrackIT/ManageDepartments",
        "TrackIT/ManageEquipmentItems", "TrackIT/ManageEquipmentType", "TrackIT/ManageRequestor","TrackIT/NewItemAuditReport",
        "TrackIT/SetupReasonCodes", "TrackIT/TransactionReport", "TrackIT/CheckOutItems", "TrackIT/createrequest", "TrackIT/viewcart", "TrackIT/requestorstatus", "TrackIT/userprofile", "TrackIT/help", "TrackIT/Dashboard"
    ]

    let scrnName = 0;

    routesList.map(screenId => {
        let componentName = TrackITImports[scrnName];

        results.push({ path: screenId, component: componentName })
        scrnName++;
    })

    return results
}

