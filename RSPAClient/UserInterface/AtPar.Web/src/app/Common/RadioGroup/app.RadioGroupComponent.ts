import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'atpar-radio-group',
    template: `            
       <ul>
             <li *ngFor="let option of radioButtonData" style="list-style:none;">
                   <input type="radio"  (click)="getSelectedItem(option)" [name]="name" value={{option.id}}>{{option.name}}</li>                    
       </ul>
           
              `
})

export class RadioGroupComponent {

    @Input() radioButtonData: any[];
    @Input() name: string;

    @Output() bindModelDataChange: EventEmitter<any> = new EventEmitter();

    getSelectedItem(option) {

        this.bindModelDataChange.emit(option);

    }

    
}

//How to use RadioGroup:

      //this is an Reuasbale RadioGroup Component for all Components in AtPar Webproject.
//Usage:
   //see the above component,i can use the Input and Output decorators.
   // Here pass the array of empty data to any component and pass the list of data  to parent component(output).
   //Note:name ia mandatory for the radiogroup.without name all radiobuttons are checked.

//Example:
//import { Component} from '@angular/core';
//import { RadioGroupComponent } from './app.RadioGroupComponent';

//@Component({
   // selector: 'my-app',
   // template: `  
                  // <atpar-radio-group [radioButtonData]="radioButtonData" [name]="name"  (bindModelDataChange)="bindModelDataChange($event)">
 
                  // </atpar-radio-group>
                   //<span style="color:blue;"> {{name1}}</span>
         //  `,

//})
//export class AppComponent {

   // radioButtonData: any[] = [
       // { id: 1, name: 'T-shirts' },
        //{ id: 2, name: 'pants' },
       // { id: 3, name: 'shorts' },
        
       // ];

    //name: string = "RadioButton1";
    //name1: any;

    //bindModelDataChange(option: any) {
      //  this.name1 = option.name;

    //}

//}

   
 
