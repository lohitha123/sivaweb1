import {NgModule,Component,ElementRef,AfterContentInit,Input,Output,EventEmitter,ContentChildren,QueryList,
trigger,state,transition,style,animate} from '@angular/core';
// import {CommonModule} from '@angular/common';
// import {Header} from '../common/shared';
// import {BlockableUI} from '../common/api';


@Component({
  selector: 'app-modal',
  template: `
  <div (click)="onContainerClicked($event)" *ngIf="!mini" class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
       [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
    <div class="modal-dialog" [ngStyle]="{'width': width, 'margin': margin}">
      <div class="modal-content">
        <div class="modal-header">
          <ng-content select=".app-modal-header"></ng-content>
        </div>
        <div class="modal-body" [ngStyle]="{'max-height': height}">
          <ng-content select=".app-modal-body"></ng-content>
        </div>
        <div class="modal-footer" [ngStyle]="{'display': dis ? 'block' : 'none'}">
          <ng-content select=".app-modal-footer"></ng-content>
        </div>
      </div>
    </div>
  </div>
  <div class="min" *ngIf="mini">
        <div class="app-modal-header">
        <div class="pull-left text-primary">@Par Help</div>      
        <a (click)="hide()" class="class pull-right" href="javascript:void(0)"><span class="glyphicon glyphicon-remove"></span></a>
        <a (click)="max()" class="class pull-right" href="javascript:void(0)"><i class="fa fa-clone" aria-hidden="true"></i></a>
    </div>
  </div>
  `,
  styles: [`
    .modal {
      z-index:9999;
    }
    .minimize > .modal-dialog >.modal-content>.modal-body {
        display: none;
    }
  `]
})
export class ModalComponent {

    public visible = false;
    public dis = false;
    private visibleAnimate = false;
    private mini = false;
  innerHeight: any;
  innerWidth: any;
  public height: any;
  public width: any;
  public margin: any;
      //background: rgba(0,0,0,0.6);
  constructor() {
      this.innerHeight = (window.screen.height);
      this.innerWidth = (window.screen.width);
  }

  public show(value): void {
      this.mini = false;
      var v = value;
      if (v == 'help') {
          console.log(this.innerHeight);
          console.log(this.innerWidth);
          this.width = 'auto';
          this.height = this.innerHeight - 280 + "px";
          this.margin="100px 0 auto 155px" 
          this.visible = true;
          this.dis = false;
          console.log(this.height);
          setTimeout(() => this.visibleAnimate = true, 100);
      } else {
          this.dis = true;
          this.visible = true;
          this.margin = "100px auto";
          setTimeout(() => this.visibleAnimate = true, 100);
      }
  }

  public hide(): void {
      this.visibleAnimate = false;
      this.mini = false;
    setTimeout(() => this.visible = false, 300);
  }

  public minimize(): void {
      this.mini = true;
  }

  public max(event: MouseEvent): void {
      //var x = <HTMLElement>event.target;
      //console.log(x);
      this.mini = false;
  }
  public onContainerClicked(event: MouseEvent): void {
      //var x = <HTMLElement>event.target;
      //console.log(x);
      //alert('hit');
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
