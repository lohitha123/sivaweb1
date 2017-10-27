import { ControlBase } from './ControlBase';
export class TextboxControl extends ControlBase<string>{
    type: string;
    controlType = 'textbox';
    constructor() {
        super();
    }
}