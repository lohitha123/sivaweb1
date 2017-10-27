import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
    selector: '[myValidateonlynumbers]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) { }
  @Input('myValidateonlynumbers') highlightColor: string;
  @HostListener('keypress', ['$event']) onKeyDown(event) {
    let oldValue = event.target.value;
    let keyPressed = event.key;
    let keyCode = event.keyCode;

    if (keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
        return false;
    }
    return true;

         // this  is 2 nd type
    //if (isNaN(event.char))
    //{
    //    debugger;
    //    return false;
    //} else
    //{
    //    debugger;
    //    return true;
    //}

      // old
    //if (isNaN(oldValue.substr(oldValue.length - 1)) || keyCode === 32) {
    //  this.el.nativeElement.value = oldValue.substr(0, oldValue.length - 1);
    //} else {
    //  return false;
    //}
  }
}