import { Component } from '@angular/core';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Init/atpar-org-parameters.component.html'
})

export class OrgParametersComponent {
    pop: boolean = false;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    public newItem = new PAR_MNGT_VENDOR();

    go() {
        this.pop = !this.pop;
    }
}