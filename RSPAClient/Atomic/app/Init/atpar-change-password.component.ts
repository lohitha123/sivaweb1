import { Component } from '@angular/core';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";

@Component({
    templateUrl: './app/Init/atpar-change-password.component.html'
})

export class ChangePasswordComponent {
    public newItem = new PAR_MNGT_VENDOR();
}