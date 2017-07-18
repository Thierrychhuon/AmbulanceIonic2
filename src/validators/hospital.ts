import { FormControl } from '@angular/forms';

export class HospitalValidator {

    static isValid(control: FormControl): any {

        if(control.value =="other"){
            return {
                "other selected": true
            };
        }

        return null;
    }

}
