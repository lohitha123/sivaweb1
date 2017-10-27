//(childComponent)
import { Component, EventEmitter } from '@angular/core';
import { OnInit, Input, Output } from '@angular/core';
@Component({
    selector: 'atpar-Dropdown',
    template: `<select name="ddlist" [(ngModel)]="selectedItem" (ngModelChange)="onChangeItem($event)"> 
                   <option *ngFor="let data of values"  [ngValue]="data">{{data.name}}</option>
                  </select>`,
    styles: [` select {
                  font-size: 15px;
               }`
    ]
})
export class DropDownComponent {

    constructor() {
    }

    @Input() bindModelData: any;
    @Input() values: any[];
    selectedItem = this.values;
    @Output() bindModelDataChange: EventEmitter<any> = new EventEmitter();

    onChangeItem(data) {

        this.selectedItem = data;
        this.bindModelDataChange.emit(this.selectedItem);

    }
}

//How to use Dropdown:

      //this is an Reuasbale Dropdown Component for all Components in AtPar Webproject.
//Usage:
   //see the above component,i can use the Input and Output decorators.
   // Here pass the array of empty data to any component and pass the list of data  to parent component(output).
   ///Note:name ia mandatory for the dropdown.

//Example:(parentComponent)
    //import { Component } from '@angular/core';
    //import { DropDownComponent } from './app.DropdownComponent';

    //@Component({
    //    selector: 'my-app',
    //    template: `  
    //                   this is an parent component

    //                <atpar-Dropdown [values]="values" (bindModelDataChange)="bindModelDataChange($event)"></atpar-Dropdown>
    //                 <span>{{name1}}</span>
    //           `,


    //})
    //export class AppComponent {


    //    values: any[] = [
    //        { id: 1, name: 'MVC' },
    //        { id: 2, name: 'ANGULAR JS' },
    //        { id: 3, name: 'JAVA' },
    //        { id: 4, name: 'PHP' },
    //        { id: 5, name: 'XAMARIN' },
    //        { id: 6, name: 'ANDROID' },
    //        { id: 7, name: 'CSHARP' },
    //        { id: 8, name: 'VB.NET' },
    //    ];


    //    name1: any;




    //    bindModelDataChange(data: any) {

    //        this.name1 = "Index is " + data.id + "and" + "Name is" + data.name;

    //    }

    //}

