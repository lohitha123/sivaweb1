import { ControlBase } from './ControlBase';

export class DropDownControl extends ControlBase<string>{

    options = [];
    controlType = 'dropdown';

    constructor() {
        super();
    }
}