import { FormGroup, Validators, FormControl } from '@angular/forms';
export class ModelControl {
    controlsList = [];
    toGroup() {
        let group: any = {};

        this.controlsList.forEach((question) => {
            if (question.required) {
                group[question.key] = new FormControl('', Validators.required);
            }
            else {
                group[question.key] = new FormControl('');
            }
        });
        return new FormGroup(group);
    }
}