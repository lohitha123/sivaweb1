import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { CustomValidators } from './index';

const MAX_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidator),
  multi: true
};

@Directive({
    selector: '[max][formControlName],[max][formControl],[max][ngModel]',
    host: {
        '(keypress)': '_onKeypress($event)',
    },
  providers: [MAX_VALIDATOR]
})
export class MaxValidator implements Validator, OnInit, OnChanges {
  @Input() max: number;

  private validator: ValidatorFn;

  ngOnInit() {
    this.validator = CustomValidators.max(this.max);
  }


  _onKeypress(e) {
      const max = +this.max;
      if (e.target.value.length === max) e.preventDefault();
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let key in changes) {
      if (key === 'max') {
        this.validator = CustomValidators.max(changes[key].currentValue);
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    return this.validator(c);
  }
}
