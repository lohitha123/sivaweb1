import { ControlBase } from './ControlBase';
export class SpanControl extends ControlBase<string>{
    type: string;
    controlType = 'span';
    constructor() {
        super();
    }
}