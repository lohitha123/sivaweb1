


import { NgModule, Directive } from '@angular/core';

import { RangeLengthValidator } from './range-length';
import { MinValidator } from './min';
import { MaxValidator } from './max';
import { RangeValidator } from './range';

import { NumberValidator } from './number';

import { EmailValidator } from './email';
import { DateValidator } from './date';
import { MinDateValidator } from './min-date';
import { MaxDateValidator } from './max-date';



import { PhoneValidator } from './phone';

import { EqualValidator } from './equal';
import { EqualToValidator } from './equal-to';



import { HighlightDirective } from './myValidate onlynumbers';

export const CUSTOM_FORM_DIRECTIVES: Directive[] = [
    RangeLengthValidator,
    MinValidator,
    MaxValidator,
    RangeValidator,
  
    NumberValidator,

    EmailValidator,
    DateValidator,
    MinDateValidator,
    MaxDateValidator,
   
    PhoneValidator,
   
    EqualValidator,
    HighlightDirective,

    EqualToValidator
];

@NgModule({
    declarations: [CUSTOM_FORM_DIRECTIVES],
    exports: [CUSTOM_FORM_DIRECTIVES]
})
export class CustomTextBoxModule {
}
