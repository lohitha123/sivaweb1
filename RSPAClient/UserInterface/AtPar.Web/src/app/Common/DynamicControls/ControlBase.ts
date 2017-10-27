export class ControlBase<T>{
    value: T;
    key: string;
    text: string;
    required: boolean;
    description: string;
    order: number;
    controlType: string;
    visiblity: boolean;
    keyPress: void;
    id: string;
}