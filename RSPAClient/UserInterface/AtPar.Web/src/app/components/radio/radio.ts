﻿import { NgModule, Component, Input, Output, ElementRef, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const RADIO_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Radio),
    multi: true
};

@Component({
    selector: 'p-radioButton',
    template: `
        <div [ngStyle]="style" [ngClass]="'ui-radiobutton ui-widget'" [class]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [attr.value]="value" [attr.tabindex]="tabindex" 
                    [checked]="checked" (change)="onChange($event)" (focus)="onFocus($event)" (blur)="onBlur($event)">
            </div>
            <div (click)="handleClick()" 
                [ngClass]="{'ui-radiobutton-box ui-widget ui-state-default':true,
                'ui-state-active':rb.checked,'ui-state-disabled':disabled,'ui-state-focus':focused}">
                <span class="ui-radiobutton-icon ui-clickable" [ngClass]="{'fa fa-circle':rb.checked}"></span>
            </div>
        </div>
        <label class="ui-radiobutton-label" (click)="select()" 
            [ngClass]="{'ui-label-active':rb.checked,'ui-label-disabled':disabled,'ui-label-focus':focused}"
            *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
    styles: [`
       .ui-radiobutton {
    display:inline-block;
    cursor: pointer;
    vertical-align: middle;
    margin-right: .25em;
}

.ui-radiobutton-box {
    width: 1.125em;
    height: 1.125em;
    line-height: 1.125em;
    -moz-border-radius: 100%;
    -webkit-border-radius: 100%;
    border-radius: 100%;
    text-align: center;
    border: 1px solid #6c276a!important;
}

.ui-radiobutton-icon {
    display: block;
    font-size: .5em;
    line-height: inherit;
    margin-top: 0px;
    color:#6c276a!important;
}
 
.ui-radiobutton, .ui-radiobutton-label {
    vertical-align: middle;
     
}
.ui-radiobutton-label
{
  cursor:pointer!important;
  margin: 0px 4px -2px 5px!important;
}

      `],
    providers: [RADIO_ACCESSOR]
})
export class Radio implements ControlValueAccessor {

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;

    @Input() label: string;

    @Input() tabindex: number;

    @Input() inputId: string;

    @Input() style: any;

    @Input() styleClass: string;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @ViewChild('rb') inputViewChild: ElementRef;

    public onModelChange: Function = () => { };

    public onModelTouched: Function = () => { };

    public checked: boolean;

    public focused: boolean;

    constructor(private cd: ChangeDetectorRef) { }

    handleClick() {
        if (!this.disabled) {
            this.select();
        }
    }

    select() {
        if (!this.disabled) {
            this.onClick.emit(null);
            this.inputViewChild.nativeElement.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
        }
    }

    writeValue(value: any): void {
        this.checked = (value == this.value);

        if (this.inputViewChild.nativeElement) {
            this.inputViewChild.nativeElement.checked = this.checked;
        }

        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    onFocus(event) {
        this.focused = true;
    }

    onBlur(event) {
        this.focused = false;
        this.onModelTouched();
    }

    onChange(event) {
        this.select();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Radio],
    declarations: [Radio]
})
export class RadioModule { }