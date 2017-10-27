import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'atpar-bread-crumb',
    template: '<div id="main" style="padding:200px"><h1>Point of Use-Dashboard</h1></div>'
})

export class PointOfUseBreadCrumbComponent {
    constructor(private title: Title) {
        this.title.setTitle('Point of Use-Dashboard');
    }

}