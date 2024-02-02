import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';




export function validValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        const passwordconfirm=ctrl.get('passwordconfirm')
        if (ctrl.value==='valid') {
            return null;
        } else {
            return {
                validValidator: ctrl.value
            };
        }
    };
}


export function confirmEqualValidator(main: string, confirm: string): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        if (!ctrl.get(main) || !ctrl.get(confirm)) {
            return {
                confirmEqual: 'Invalid control names'
            };
        }
        const mainValue = ctrl.get(main)!.value;
        const confirmValue = ctrl.get(confirm)!.value;
        
        return mainValue === confirmValue ? null : {
            confirmEqual: {
                main: mainValue,
                confirm: confirmValue
            }
        };
    };
}

export function matchPassword(c:AbstractControl): {[key:string]:boolean}|null{
   const password=c.get('password')
   const passwordconfirm=c.get('passwordconfirm')
   if(password?.pristine || passwordconfirm?.pristine){
    return null
   }
   if(password?.value===passwordconfirm?.value){
return null
   }
    return { 'match':true}
}

