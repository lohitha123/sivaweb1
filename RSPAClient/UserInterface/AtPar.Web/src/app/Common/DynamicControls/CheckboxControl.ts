import { ControlBase } from './ControlBase';
export class CheckboxControl extends ControlBase<string>{
    type: string;
    controlType = 'checkbox';
    constructor() {
        super();
    }
}