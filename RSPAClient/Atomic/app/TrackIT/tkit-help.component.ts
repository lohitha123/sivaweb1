﻿import { Component } from '@angular/core';
import {Message} from '../components/common/api';

@Component({
    templateUrl: './app/TrackIT/tkit-help.component.html'
})

export class HelpComponent {
    msgs: Message[];

    index: number = 0;

    onTabClose(event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Tab Closed', detail: 'Index: ' + event.index });
    }

    onTabOpen(event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
    }

    openNext() {
        this.index = (this.index === 3) ? 0 : this.index + 1;
    }

    openPrev() {
        this.index = (this.index === 0) ? 3 : this.index - 1;
    }
} 