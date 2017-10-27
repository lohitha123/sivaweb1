import {
    NgModule, Component, ElementRef, AfterContentInit, Input, Output, EventEmitter, ContentChildren, QueryList,
    trigger, state, transition, style, animate
} from '@angular/core';


@Component({
    selector: 'atpar-modal',
    template: `
  <div class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
       [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0 , 'left' : left , 'background' : background}">
    <div class="modal-dialog" [ngStyle]="{'width': width, 'margin': margin}">
      <div class="modal-content">
        <div class="modal-header" *ngIf="visibleheaderfooter">
          <ng-content select=".atpar-modal-header"></ng-content>
        </div>
        <div class="modal-body" [ngStyle]="{'max-height': height}">
          <ng-content select=".atpar-modal-body"></ng-content>
        </div>
        <div class="modal-footer" [ngStyle]="{'display': dis ? 'block' : 'none'}" *ngIf="visibleheaderfooter">
          <ng-content select=".atpar-modal-footer"></ng-content>
        </div>
      </div>
    </div>
  </div>
  `,
    styles: [`
    .modal {
      z-index:9999;
    }
  `]
})
export class ModalComponent {

    public visible = false;
    public dis = false;
    private visibleAnimate = false;
    innerHeight: any;
    innerWidth: any;
    public height: any;
    public width: any;
    public margin: any;
    public left: any;
    public visibleheaderfooter: boolean = true;
    public background: string = '';

    constructor() {
        this.innerHeight = (window.screen.height);
        this.innerWidth = (window.screen.width);
    }

    public show(value): void {
        var v = value;
        if (v == 'tkitviewcart') {
            this.width = "700px";
            this.dis = true;
            this.visible = true;
            this.margin = "120px 0";
            this.left = '150';
            this.visibleheaderfooter = false;
            this.background = 'none';
            setTimeout(() => this.visibleAnimate = true, 100);
            return;
        }
        else if (v == 'help') {
            this.width = "auto";
            this.height = this.innerHeight - 280 + "px";
            this.margin = "100px";
            this.visible = true;
            this.dis = false;
            this.left = '0';
            this.visibleheaderfooter = true;
            this.background = 'rgba(0,0,0,0.6)';
            setTimeout(() => this.visibleAnimate = true, 100);
        } else if (v == 'tkitHelp') {
            this.dis = true;
            this.visible = true;
            this.margin = "106px auto";
            this.left = '0';
            this.visibleheaderfooter = true;
            this.background = 'rgba(0,0,0,0.6)';
            setTimeout(() => this.visibleAnimate = true, 100);
        }
        else {
            this.dis = true;
            this.visible = true;
            this.margin = "100px auto";
            this.left = '0';
            this.visibleheaderfooter = true;
            this.background = 'rgba(0,0,0,0.6)';
            setTimeout(() => this.visibleAnimate = true, 100);
        }
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }

    public hideImage(): void {
        this.visibleAnimate = false;
        this.visible = false;
    }

}
